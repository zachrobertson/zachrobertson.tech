import React from 'react';
import styled from 'styled-components';

import Layout from '@/components/layout';
import { BlogData } from '@/interfaces/blog';

const BlogContainer = styled.div`
    width: 50%;
    @media (max-width: 768px) {
        width: 70%;
    }

    background-color: #1e1e1e;
    border: 1px solid #00ff00;
    padding: 1rem;

    img {
        width: 100%;
    }

    div {
        a {
            color: #00ff00;

            :visited {
                color: #00ff00;
            }

            :visited:hover {
                color: #ffffff;
            }

            :hover {
                color: #ffffff;
            }
        }
        pre {
            code {
                display: block;
                width: 50%;
                background-color: #1e1e1e;
                color: #00ff00;
                border: 1px solid #00ff00;
                padding: 0.5rem;
            }
        }
    }
`;

const BlogTitle = styled.h2`
    text-align: left;
`;

function BlogTemplate(data: BlogData) {
    const date = new Date(data.date);
    const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

    return (
        <Layout>
            <BlogContainer>
                <BlogTitle>
                    {data.title}
                </BlogTitle>
                {formattedDate}
                <div dangerouslySetInnerHTML={{__html: data.html}} />
            </BlogContainer>
        </Layout>
    )
}
export default BlogTemplate;