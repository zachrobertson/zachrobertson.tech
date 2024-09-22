import React from 'react';
import styled from 'styled-components';
import { BlogData } from '@/interfaces/blog';
import BlogContainer from '@/components/blogContainer';

import { SMALL_DEVICE_MAX_WIDTH, MED_DEVICE_MAX_WIDTH } from '@/components/deviceConstants';

const MAX_COLUMN_COUNT = 2;

const Grid = styled.div`
    display: grid;
    justify: space-between;
    gap: 2rem;

    @media (min-width: ${MED_DEVICE_MAX_WIDTH+1}px) {
        width: 1024px;
        grid-template-columns: repeat(${MAX_COLUMN_COUNT}, 1fr);
        & > :nth-child(2n) {
            justify-self: end;
        }
    }

    @media (min-width: ${SMALL_DEVICE_MAX_WIDTH+1}px) and (max-width: ${MED_DEVICE_MAX_WIDTH}px) {
        width: 768px;
        grid-template-columns: repeat(${MAX_COLUMN_COUNT}, 1fr);
        & > :nth-child(2n) {
            justify-self: end;
        }
    }

    @media (max-width: ${SMALL_DEVICE_MAX_WIDTH}px) {
        width: 100%
        grid-template-columns: 1fr;
    }
`;

type BlogGridProps = {
    posts: BlogData[];
};

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
    return (
        <Grid>
            {posts.map(post => (
                <BlogContainer {...post} key={post.id} />
            ))}
        </Grid>
    );
};

export default BlogGrid;