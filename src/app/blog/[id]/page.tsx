import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { markdownToHtml } from "@/lib/markdown";
import { formatDate, getPost, getPostIds } from "@/lib/posts";
import styles from "./post.module.css";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
    return getPostIds().map((id) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    if (!getPostIds().includes(id)) return {};
    const post = getPost(id);

    return {
        title: post.title,
        description: post.description,
        openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date, authors: [post.author] },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { id } = await params;
    if (!getPostIds().includes(id)) notFound();

    const post = getPost(id);
    const html = await markdownToHtml(post.content);

    return (
        <article>
            <header className={styles.header}>
                <Link href="/blogs" className={styles.back}>← all projects</Link>
                <h1 className={styles.title}>{post.title}</h1>
                <p className={styles.description}>{post.description}</p>
                <div className={styles.meta}>
                    <span>{post.author}</span>
                    <time dateTime={post.date}>{formatDate(post.date, "long")}</time>
                    <span>{post.readingMinutes} min read</span>
                </div>
            </header>
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        </article>
    );
}
