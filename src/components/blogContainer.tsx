import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { BlogData } from '@/interfaces/blog';

const StyledContainer = styled.div`
    width: 100%;
    text-align: left;
    font-size: 18px;
    color: white;

    a {
        color: white;
        text-decoration: none;

        :hover {
            color: white;
            text-decoration: underline;
        }
    }

    p {
        a {
            text-decoration: none;
        }
    }
`;

const BlogHeaderImage = styled(Image)`
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
    margin: 10px auto;
`;

const Separator = styled.div`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid;
    padding: 0.5rem;
`;

const StravaGraph = dynamic(() => import('../components/stravaGraph'), {
    ssr: false,
});

const BlogContainer = (post: BlogData) => {
    const date = new Date(post.date);
    const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

    return (
        <StyledContainer>
            {(post.headerImage === "stravaGraph" && post.stravaData !== undefined) ? (
                <StravaGraph data={post.stravaData}/>
            ) : (
                <BlogHeaderImage src={post.headerImage} alt={post.title} width={800} height={250} priority/>
            )}
            <Link href={`/blog/${post.id}`}>
                <h1>{post.title}</h1>
            </Link>
            {formattedDate}
            <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
            <Separator/>
        </StyledContainer>
    );
};

export default BlogContainer;
