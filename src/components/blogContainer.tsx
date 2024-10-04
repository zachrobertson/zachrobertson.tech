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
    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
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
            <Separator>
                BLOG POST TERMINATED
            </Separator>
        </StyledContainer>
    );
};

export default BlogContainer;
