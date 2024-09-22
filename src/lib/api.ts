import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Parser } from "htmlparser2";
import { BlogData } from "@/interfaces/blog";
import markdownToHtml from "./markdownToHtml";
import { StravaWeeklyStats } from "@/interfaces/strava";

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

export async function getBlogById(id: string): Promise<BlogData> {
    const fileName = `${id}.md`
    const fullPath = path.join(BLOGS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const html = await markdownToHtml(content || "");
    const htmlExcerpt = _truncateHTML(html, EXCERPT_LENGTH);

    if (data.headerImage == "stravaGraph") {

        if (!fs.existsSync("stravaData.json")) {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            await fetch(`${baseUrl}/api/cron/daily`);
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