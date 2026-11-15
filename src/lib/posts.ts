import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
    id: string;
    title: string;
    date: string;
    author: string;
    description: string;
    tags: string[];
    readingMinutes: number;
};

export type Post = PostMeta & { content: string };

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "blog");
const WORDS_PER_MINUTE = 220;

export function getPostIds(): string[] {
    return fs
        .readdirSync(POSTS_DIRECTORY)
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(/\.md$/, ""));
}

export function getPost(id: string): Post {
    const fullPath = path.join(POSTS_DIRECTORY, `${id}.md`);
    const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
    const words = content.split(/\s+/).filter(Boolean).length;

    return {
        id,
        title: String(data.title),
        date: new Date(data.date).toISOString().slice(0, 10),
        author: String(data.author ?? "Zach Robertson"),
        description: String(data.description ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
        content,
    };
}

export function getAllPosts(): PostMeta[] {
    return getPostIds()
        .map((id) => {
            // Strip the body so list pages do not ship it to the client.
            const { content: _content, ...meta } = getPost(id);
            void _content;
            return meta;
        })
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatDate(iso: string, style: "short" | "long" = "short"): string {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
        month: style === "long" ? "long" : "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    });
}
