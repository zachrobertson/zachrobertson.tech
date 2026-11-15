import Link from "next/link";

import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";
import styles from "./home.module.css";

export default function HomePage() {
    const posts = getAllPosts();

    return (
        <>
            <section className={styles.hero}>
                <p className="eyebrow">Aerospace software engineer</p>
                <h1 className={styles.headline}>
                    I build simulations, hardware, and tools for <span className={styles.em}>engineering work.</span>
                </h1>
                <p className={styles.lede}>
                    Flight software by day. On the side: spacecraft docking sims, a voice recorder that snaps onto a phone, and video overlays for
                    bike racing.
                </p>
                <Link href="/about" className={styles.more}>More about me →</Link>
            </section>

            <section aria-labelledby="projects">
                <h2 id="projects" className={`eyebrow ${styles.sectionLabel}`}>Selected projects</h2>
                <PostList posts={posts} />
            </section>
        </>
    );
}
