import React from "react";
import Image from "next/image.js";
import styled from 'styled-components';

import { getAllBlogs } from "@/lib/api";
import Layout from "@/components/layout";
import { BlogData } from '@/interfaces/blog';
import BlogContainer from "@/components/blogContainer";


const TitleContainer = styled.div`
    display: flex;
    width: 50%;
    margin: 0 auto;
    justify-content: left;
`

const TitleParagraph = styled.div`
    margin-top: 0;
    padding-left: 1rem;
    align-content: center;
    font-size: 1.25rem;
    display: inline-block;
    width: 100%;

    span {
        display: inline-block;
    }

    div {
        display: inline-block;
        vertical-align: middle;
        margin-left: 2rem;
        margin-bottom: 1rem;
    }

    a {
        padding: 0 1rem 0 0;
        color: #000000;

        :visited {
            color: #000000;
        }
    }
`

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

// markup
export default function IndexPage (props: IndexProps) {
    const Posts = props.allMarkdownData.map((post) => {
        return <BlogContainer {...post} key={post.id} />
    });

    return (
        <Layout>
            <TitleContainer>
                <Image
                    src='/profile.jpg'
                    alt='profile picture'
                    width={75}
                    height={75}
                    style={{
                        display: 'inline-block',
                        width: '75px',
                        height: '75px',
                        borderRadius: '50%',
                        border: '1px solid black',
                        background: 'transparent'
                    }}
                />
                <TitleParagraph>
                    <span>
                        This is my blog, here I write about stuff.
                        <br/>
                        Mostly AI and Data Science.
                        <br/>
                    </span>
                </TitleParagraph>
            </TitleContainer>
            {Posts}
        </Layout>
    )
};