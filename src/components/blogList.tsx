import React from 'react';
import styled from 'styled-components';
import { BlogData } from '@/interfaces/blog';
import BlogContainer from '@/components/blogContainer';

import { SMALL_DEVICE_MAX_WIDTH } from '@/components/deviceConstants';

const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 800px;
    font-family: 'Fira Code', monospace;

    @media (max-width: ${SMALL_DEVICE_MAX_WIDTH}px) {
        width: 100%;
    }
`;

type BlogListProps = {
    posts: BlogData[];
};

const BlogList: React.FC<BlogListProps> = ({ posts }) => {
    return (
        <List>
            {posts.map(post => (
                <BlogContainer {...post} key={post.id} />
            ))}
        </List>
    );
};

export default BlogList;