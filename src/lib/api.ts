import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Parser } from "htmlparser2";
import { BlogData } from "@/interfaces/blog";
import markdownToHtml from "./markdownToHtml";
import { fetchAthleteActivities } from "@/lib/stravaApiRequests";
import { StravaActivityRequestParams, StravaWeeklyStats } from "@/interfaces/strava";

const BLOGS_DIRECTORY = path.join(process.cwd(), "_blogs");
const EXCERPT_LENGTH = 500;

export function getBlogIds() {
    return fs.readdirSync(BLOGS_DIRECTORY).map(file => file.replace(/\.md$/, ''));
};

function _truncateHTML(html: string, length: number): string {
    let truncatedHtml: string = '';
    let currentLength: number = 0;
    const tagsStack: string[] = [];

    const parser = new Parser({
        onopentag(name, attrs) {
            // If we haven't reached the max length, add opening tag to output stack
            if (currentLength < length) {
                const attrsString = Object.keys(attrs).map(attr => `${attr}="${attrs[attr]}"`).join(' ');
                truncatedHtml += `<${name}${attrsString ? ' ' + attrsString : ''}>`
                tagsStack.push(name)
            }
        },
        ontext(text) {
            // Add text to output, but only up to the max length
            if (currentLength < length) {
                const remainingChars = length - currentLength;
                const truncatedText = text.substring(0, remainingChars);
                truncatedHtml += truncatedText;
                currentLength += truncatedText.length;
            }
        },
        onclosetag(name) {
            // Close the tag if it's in the stack and we haven't exceeded the limit
            if (currentLength < length) {
                truncatedHtml += `</${name}>`;
                tagsStack.pop();
            }
        }
    }, { decodeEntities: true });

    parser.write(html);
    parser.end();

    // Close any unclosed tags
    while (tagsStack.length) {
        const tag = tagsStack.pop();
        truncatedHtml += `</${tag}>`;
    }

    return truncatedHtml;
}

const TWENTY_FOUR_WEEKS_IN_SECONDS = 48 * 7 * 24 * 60 * 60;

function getWeek(date: Date): string {
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    const weekNumber = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
                            - 3 + (week1.getDay() + 6) % 7) / 7);
    const year = date.getFullYear();
    return `${year}-W${weekNumber}`;
}


function saveDataToFile(data: StravaWeeklyStats): void {
    const filePath = path.join(process.cwd(), 'stravaData.json');
    fs.writeFileSync(filePath, JSON.stringify(data));
}

export async function generateStravaDataFile() {
    const before = Math.floor(new Date().getTime() / 1000);
    const after = before - TWENTY_FOUR_WEEKS_IN_SECONDS;
    const params: StravaActivityRequestParams = {
        before,
        after,
        per_page: 200
    };
    const activities = await fetchAthleteActivities(params);

    const weeklyStats: StravaWeeklyStats = {};
    for (const activity of activities) {
        if (activity.type == "Ride") {
            const startDate = new Date(activity.start_date);
            const weekIdx = getWeek(startDate);
            const distance = activity.distance / 1609.34; // Distance in miles
            const elevation = activity.total_elevation_gain / 0.3048; // Elevation in feet
            if (!weeklyStats[weekIdx]) {
                weeklyStats[weekIdx] = { miles: 0, elevation: 0 };
            }
            weeklyStats[weekIdx].miles += distance;
            weeklyStats[weekIdx].elevation += elevation;
        }
    }

    saveDataToFile(weeklyStats);
}

export async function getBlogById(id: string): Promise<BlogData> {
    const fileName = `${id}.md`
    const fullPath = path.join(BLOGS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const html = await markdownToHtml(content || "");
    const htmlExcerpt = _truncateHTML(html, EXCERPT_LENGTH);

    if (data.headerImage == "stravaGraph") {

        if (!fs.existsSync("stravaData.json")) {
            await generateStravaDataFile();
        }
    
        const rawData: StravaWeeklyStats = JSON.parse(fs.readFileSync("stravaData.json", 'utf-8'));
    
        const weeks = Object.keys(rawData)
            .map(key => {
                const [year, week] = key.split('-W').map(Number);
                return { key, year, week };
            })
            .sort((a, b) => a.year === b.year ? a.week - b.week : a.year - b.year);
    
        const distanceData: { x: string, y: number }[] = weeks.map(({ key }) => ({ x: key, y: rawData[key].miles }));
        const maxDistance: number = Math.max(...distanceData.map(element => element.y));
        const elevationData: { x: string, y: number }[] = weeks.map(({ key }) => ({ x: key, y: rawData[key].elevation }));
        const maxElevation: number = Math.max(...elevationData.map(element => element.y));

        return {
            id: id,
            html: html,
            content: content,
            excerpt: htmlExcerpt,
            title: data.title,
            date: data.date,
            author: data.author,
            headerImage: data.headerImage,
            stravaData: {
                distanceData,
                maxDistance,
                elevationData,
                maxElevation,
            }
        }
    } else {
        return {
            id: id,
            html: html,
            content: content,
            excerpt: htmlExcerpt,
            title: data.title,
            date: data.date,
            author: data.author,
            headerImage: data.headerImage,
        }
    }
}

export async function getAllBlogs() {
    const ids = getBlogIds();
    const posts = await Promise.all(ids.map(id => getBlogById(id)));
    posts.sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));
    return posts;
};