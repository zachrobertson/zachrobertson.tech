import React from "react";
import styled from 'styled-components';

import { getAllBlogs } from "@/lib/api";
import Layout from "@/components/layout";
import { BlogData } from '@/interfaces/blog';
import BlogGrid from "@/components/blogGrid";


export async function getStaticProps(): Promise<{ props: IndexProps }> {
    const blogData = await getAllBlogs();

    return {
        props: {
            allMarkdownData: blogData
        }
    };
}

type IndexProps = {
    allMarkdownData: BlogData[];
};

const AboutSection = styled.span`
    font-size: 20px;
`

const SectionTitle = styled.h2`
    font-size: 35px;
`

export default function IndexPage (props: IndexProps) {   
    const firstSixPosts = props.allMarkdownData.slice(0, 6);

    return (
        <Layout pageName="index">
            <AboutSection>
                Post physics student working an as aerospace software engineer<br/>
                Interested in the intersection of hardware and software<br/>
                Obsessed with bikes<br/>
                Read about it here.
            </AboutSection>
            <SectionTitle>BLOGS</SectionTitle>
            <BlogGrid posts={firstSixPosts} />
        </Layout>
    )
};
