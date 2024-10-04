import React from "react";
import { getAllBlogs } from "@/lib/api";
import Layout from "@/components/layout";
import BlogGrid from "@/components/blogGrid";
import { BlogData } from '@/interfaces/blog';

type BlogProps = {
    allMarkdownData: BlogData[];
};

export async function getStaticProps() {
    const blogData = await getAllBlogs();

    return {
        props: {
            allMarkdownData: blogData
        }
    };
};

export default function BlogPage (props: BlogProps) {
    return (
        <Layout pageName="blogs">
            <BlogGrid posts={props.allMarkdownData} />
        </Layout>
    );
};
