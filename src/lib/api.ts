import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Parser } from "htmlparser2";

import { BlogData } from "@/interfaces/blog";
import markdownToHtml from "@/lib/markdownToHtml";

const EXCERPT_LENGTH = 500;
const BLOGS_DIRECTORY = path.join(process.cwd(), "_blogs");

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