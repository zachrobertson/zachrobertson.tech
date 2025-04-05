import React from "react";
import styled from "styled-components";
import { getAllBlogs } from "@/lib/api";
import Layout from "@/components/layout";
import BlogList from "@/components/blogList";
import { BlogData } from '@/interfaces/blog';

type BlogProps = {
    allMarkdownData: BlogData[];
};

const TerminalSection = styled.div`
    margin-bottom: 2rem;
`;

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
            <TerminalSection>
                <BlogList posts={props.allMarkdownData} />
            </TerminalSection>
        </Layout>
    );
};
