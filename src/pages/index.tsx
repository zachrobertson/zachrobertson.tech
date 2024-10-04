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
                I like to ride bikes. If everything goes to plan, quickly<br/>
                I work in the Aerospace industry as a software engineer.<br/>
                Sometimes I write about things that interest me. <br/>
                Maybe it will interest you as well.
            </AboutSection>
            <SectionTitle>BLOGS</SectionTitle>
            <BlogGrid posts={firstSixPosts} />
        </Layout>
    )
};
