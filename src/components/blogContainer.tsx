import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { BlogData } from '@/interfaces/blog';
import { useRouter } from 'next/router';

const StyledContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 130px 1fr;
    color: #00FF00;
    font-family: 'Fira Code', monospace;
    font-size: 0.9rem;
    padding: 0.4rem 0;
    border-bottom: 1px dotted #333;
    cursor: pointer;
    
    &:hover, &:focus {
        background-color: rgba(0, 255, 0, 0.05);
        outline: none;
    }

    a {
        color: #00FF00;
        text-decoration: none;
        font-weight: 500;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const PostDate = styled.div`
    color: #00AAFF;
`;

const PostContent = styled.div`
    display: flex;
    flex-direction: column;
`;

const PostDescription = styled.div`
    color: #AAAAAA;
    font-size: 0.8rem;
    margin-top: 0.3rem;
`;

const BlogContainer = (post: BlogData) => {
    const date = new Date(post.date);
    const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`;
    const router = useRouter();
    
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            router.push(`/blog/${post.id}`);
        }
    };
    
    const handleClick = () => {
        router.push(`/blog/${post.id}`);
    };
    
    return (
        <StyledContainer 
            tabIndex={0} 
            onKeyDown={handleKeyDown}
            onClick={handleClick}
        >
            <PostDate>{formattedDate}</PostDate>
            <PostContent>
                <Link href={`/blog/${post.id}`} onClick={(e) => e.stopPropagation()} tabIndex={-1}>
                    {post.title}
                </Link>
                <PostDescription>{post.shortDescription}</PostDescription>
            </PostContent>
        </StyledContainer>
    );
};

export default BlogContainer;
