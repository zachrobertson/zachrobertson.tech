import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import StravaGraph from './stravaGraph';
import { BlogData } from '@/interfaces/blog';

const StyledContainer = styled.div`
    width: 100%;
    text-align: left;
    font-size: 18px;

    img {
        width: 100%;
        height: 250px; /* Set a fixed height */
        object-fit: cover; /* Maintain aspect ratio and cover the area */
        display: block;
        margin: 10px auto;
    }

    a {
        text-decoration: none;

        :visited {
            color: #000000;
        }

        :hover {
            color: #000000;
        }
    }

    p {
        a {
            text-decoration: underline;
        }
    }
`;

const Separator = styled.div`
    width: 100%;
    text-align: center;
    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
    padding: 0.5rem;
`;

const BlogContainer = (post: BlogData) => {
    const date = new Date(post.date);
    const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

    return (
        <StyledContainer>
            {(post.headerImage === "stravaGraph" && post.stravaData !== undefined) ? (
                <StravaGraph data={post.stravaData}/>
            ) : (
                <img src={post.headerImage} alt={post.title} />
            )}
            <Link href={`/blog/${post.id}`}>
                <h1>{post.title}</h1>
            </Link>
            {formattedDate}
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <Separator>
                BLOG POST TERMINATED
            </Separator>
        </StyledContainer>
    );
};

export default BlogContainer;
