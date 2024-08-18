import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { BlogData } from '@/interfaces/blog';
import { SMALL_DEVICE_MAX_WIDTH, MED_DEVICE_MAX_WIDTH } from '@/components/deviceConstants';

const StyledContainer = styled.div`
    width: 100%;
    text-align: left;
    font-size: 18px;
    background-color: #1e1e1e;

    a {
        text-decoration: none;
        color: #00ff00;

        :visited {
            color: #00ff00;
        }

        :hover {
            color: #ffffff;
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
    border-top: 1px solid #00ff00;
    border-bottom: 1px solid #00ff00;
    padding: 0.5rem 0;
    color: #00ff00;
`;

const BlogContainer = (post: BlogData) => {
    const date = new Date(post.date);
    const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

    return (
        <StyledContainer>
            <img src={post.headerImage} alt={post.title} style={{ width: '100%', height: 'auto' }} />
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
