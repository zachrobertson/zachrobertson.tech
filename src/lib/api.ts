import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BlogData } from "@/interfaces/blog";
import markdownToHtml from "./markdownToHtml";

const BLOGS_DIRECTORY = path.join(process.cwd(), "_blogs");
const EXCERPT_LENGTH = 500;

export function getBlogIds() {
    return fs.readdirSync(BLOGS_DIRECTORY).map(file => file.replace(/\.md$/, ''));
};

export async function getBlogById(id: string): Promise<BlogData> {
    const fileName = `${id}.md`
    const fullPath = path.join(BLOGS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const html = await markdownToHtml(content || "");
    let htmlExcerpt = "";
    if (html.length > EXCERPT_LENGTH) {
        let end = html.lastIndexOf(" ", EXCERPT_LENGTH);
        if (html.indexOf("</a>", end) > end) {
            end = html.indexOf("</a>", end) + 4;
        }
        htmlExcerpt = html.substring(0, end);
    } else {
        htmlExcerpt = html;
    }

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

export async function getAllBlogs() {
    const ids = getBlogIds();
    const posts = await Promise.all(ids.map(id => getBlogById(id)));
    posts.sort((post1, post2) => (new Date(post1.date) > new Date(post2.date) ? -1 : 1));
    return posts;
};