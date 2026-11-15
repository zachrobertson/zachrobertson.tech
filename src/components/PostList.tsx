import Link from "next/link";

import { formatDate, type PostMeta } from "@/lib/posts";
import styles from "./PostList.module.css";

export default function PostList({ posts }: { posts: PostMeta[] }) {
    return (
        <ul className={styles.list}>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/blog/${post.id}`} className={styles.item}>
                        <div className={styles.meta}>
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span aria-hidden="true">·</span>
                            <span>{post.readingMinutes} min read</span>
                        </div>
                        <h3 className={styles.title}>{post.title}</h3>
                        <p className={styles.description}>{post.description}</p>
                        {post.tags.length > 0 && (
                            <ul className={styles.tags} aria-label="Tags">
                                {post.tags.map((tag) => (
                                    <li key={tag}>{tag}</li>
                                ))}
                            </ul>
                        )}
                    </Link>
                </li>
            ))}
        </ul>
    );
}
