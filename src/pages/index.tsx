import React from "react";
import styled from 'styled-components';

import { getAllBlogs } from "@/lib/api";
import Layout from "@/components/layout";
import { BlogData } from '@/interfaces/blog';
import BlogList from "@/components/blogList";

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

const TerminalSection = styled.div`
    margin-bottom: 2rem;
`;

// TODO: decide if this is something we want to use, kind of looks tacky
// const CommandPrompt = styled.div`
//     color: #00FF00;
//     font-family: 'Fira Code', monospace;
//     margin-bottom: 0.5rem;
    
//     &:before {
//         content: "zach@zachrobertson:~$ ";
//         color: #0087D7;
//     }
// `;

export default function IndexPage (props: IndexProps) {   
    const firstSixPosts = props.allMarkdownData.slice(0, 6);

    return (
        <Layout pageName="index">
            <TerminalSection>
                <BlogList posts={firstSixPosts} />
            </TerminalSection>
        </Layout>
    )
};
