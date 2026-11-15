import type { Metadata } from "next";

import PostList from "@/components/PostList";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
    title: "Projects",
    description: "Selected projects on simulation, embedded hardware, and AI-assisted engineering.",
};

export default function BlogsPage() {
    return (
        <>
            <header style={{ marginBottom: "2.5rem" }}>
                <p className="eyebrow">projects</p>
                <h1 style={{ margin: "0.5rem 0 0", fontSize: "clamp(2.25rem, 6vw, 3.5rem)", letterSpacing: "-0.035em", lineHeight: 1.05 }}>Selected projects</h1>
            </header>
            <PostList posts={getAllPosts()} />
        </>
    );
}
