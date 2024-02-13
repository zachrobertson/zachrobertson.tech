import React from "react";
import { getAllBlogs } from "@/lib/api";
import Layout from "@/components/layout";
import BlogContainer from "@/components/blogContainer";
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
    const Posts = props.allMarkdownData.map((post) => {
        return <BlogContainer {...post} key={post.id} />
    });

    return (
        <Layout>
            {Posts}
        </Layout>
    );
}