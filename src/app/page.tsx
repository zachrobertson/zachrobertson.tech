import Link from "next/link";

import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";
import styles from "./home.module.css";

export default function HomePage() {
    const posts = getAllPosts().slice(0, 6);

    return (
        <>
            <section className={styles.hero}>
                <p className="eyebrow">aerospace software engineer</p>
                <h1 className={styles.name}>Zach Robertson</h1>
                <p className={styles.lede}>
                    I write flight software by day and build simulations, hardware, and AI-assisted tooling on the side. This is where I write
                    up the projects that turned out interesting.
                </p>
                <div className={styles.actions}>
                    <Link href="/blogs" className={styles.primary}>Read the writing</Link>
                    <Link href="/about" className={styles.secondary}>About me</Link>
                </div>
            </section>

            <section aria-labelledby="latest">
                <div className={styles.sectionHead}>
                    <h2 id="latest" className="eyebrow">Latest writing</h2>
                    <Link href="/blogs" className={styles.all}>All posts →</Link>
                </div>
                <PostList posts={posts} />
            </section>
        </>
    );
}
