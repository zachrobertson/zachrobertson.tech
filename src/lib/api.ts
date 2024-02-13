import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogData } from "@/interfaces/blog";
import markdownToHtml from "./markdownToHtml";

const BLOGS_DIRECTORY = path.join(process.cwd(), "_blogs");
const EXCERPT_LENGTH = 200;

export function getBlogIds() {
    return fs.readdirSync(BLOGS_DIRECTORY).map(file => file.replace(/\.md$/, ''));
};

export async function getBlogById(id: string): Promise<BlogData> {
    const fileName = `${id}.md`
    const fullPath = path.join(BLOGS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const html = await markdownToHtml(content || "");
    const excerpt = await markdownToHtml(content.slice(0, EXCERPT_LENGTH));

    return {
        id: id,
        html: html,
        content: content,
        excerpt: excerpt,
        title: data.title,
        date: data.date,
        author: data.author,
    }
}

export async function getAllBlogs() {
    const ids = getBlogIds();
    const posts = await Promise.all(ids.map(id => getBlogById(id)));
    posts.sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));
    return posts;
};