import fs from 'fs';
import { BlogData } from '@/interfaces/blog';
import markdownToHtml from "@/lib/markdownToHtml";
import BlogTemplate from "@/components/blogTemplate";
import { StravaWeeklyStats } from '@/interfaces/strava';
import { getBlogById, getBlogIds, STRAVA_DATA_FILE } from "@/lib/api";

type Params = {
    params: {
        id: string;
    };
};

export async function getStaticProps({ params }: Params): Promise<{props: BlogData}> {
    const blog = await getBlogById(params.id);
    const content = await markdownToHtml(blog.content || "");

    if (blog.headerImage == "stravaGraph") {
        const rawData: StravaWeeklyStats = JSON.parse(fs.readFileSync(STRAVA_DATA_FILE, 'utf-8'));
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
            props: {
                ...blog,
                content,
                stravaData: {
                    distanceData,
                    maxDistance,
                    elevationData,
                    maxElevation,
                }
            },
        };
    } else {
        return {
            props: {
                ...blog,
                content,
            }
        }
    }
};

export async function getStaticPaths() {
    const blogIds = getBlogIds();

    return {
        paths: blogIds.map(id => {
            return {
                params: {
                    id,
                },
            };
        }),
        fallback: false,
    };
};

export default function BlogPost(postData: BlogData) {
    return <BlogTemplate {...postData} />;
};