import React from "react";
import styled from 'styled-components';

import { getAllBlogs } from "@/lib/api";
import Layout from "@/components/layout";
import { BlogData } from '@/interfaces/blog';
import BlogGrid from "@/components/blogGrid";

const TitleContainer = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: column;
`;

const TitleParagraph = styled.div`
    align-content: center;
    font-size: 1.25rem;
    display: inline-block;
    height: auto;
    line-height: 1.5;

    div {
        display: inline-block;
        vertical-align: middle;
    }
`;

const SectionHeader = styled.div`
    font-size: 25px;
`;

export async function getStaticProps() {
    const blogData = await getAllBlogs();
    return {
        props: {
            allMarkdownData: blogData
        }
    };
};

type IndexProps = {
    allMarkdownData: BlogData[];
};

export default function IndexPage (props: IndexProps) {   
    const firstSixPosts = props.allMarkdownData.slice(0, 6);

    return (
        <Layout>
            <TitleContainer>
                <TitleParagraph>
                    &gt; I am Zach Robertson, I have a degree in physics and currently work as an Aerospace Software Engineer.
                    <br/>
                    &gt; I like building things, like this website. My area of expertise is not in frontend design, that's why this website looks the way it does.
                    <br/>
                    &gt; My goal in life is to build Jarvis from IronMan, maybe I'll write about it here if I can find the motivation.
                    <br />
                    &gt; Oh and I love to ride my bike, and working on my bike. I'll write about that sometimes as well.
                </TitleParagraph>
            </TitleContainer>
            <SectionHeader>BLOGS</SectionHeader>
            <BlogGrid posts={firstSixPosts} />
        </Layout>
    )
};
