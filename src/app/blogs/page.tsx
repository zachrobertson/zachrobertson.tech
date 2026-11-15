import type { Metadata } from "next";

import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
    title: "Writing",
    description: "Project write-ups on simulation, embedded hardware, and AI-assisted engineering.",
};

export default function BlogsPage() {
    return (
        <>
            <header style={{ marginBottom: "2rem" }}>
                <p className="eyebrow">writing</p>
                <h1 style={{ margin: "0.5rem 0 0", fontSize: "2.25rem", letterSpacing: "-0.02em" }}>Project write-ups</h1>
            </header>
            <PostList posts={getAllPosts()} />
        </>
    );
}
