import Link from "next/link";

import { formatDate, type PostMeta } from "@/lib/posts";
import styles from "./PostList.module.css";

export default function PostList({ posts }: { posts: PostMeta[] }) {
    return (
        <ul className={styles.list}>
            {posts.map((post) => (
                <li key={post.id}>
                    <Link href={`/blog/${post.id}`} className={styles.item}>
                        <time dateTime={post.date} className={styles.date}>
                            {formatDate(post.date)}
                        </time>
                        <div>
                            <h3 className={styles.title}>{post.title}</h3>
                            <p className={styles.description}>{post.description}</p>
                        </div>
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
