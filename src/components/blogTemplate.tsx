import React from 'react';
import styled from 'styled-components';

import Layout from '@/components/layout';
import { BlogData } from '@/interfaces/blog';

const BlogContainer = styled.div`
    width: 50%;
    @media (max-width: 768px) {
        width: 70%;
    }
    margin: 0 auto;

    img {
        width: 100%;
    }

    div {

        a {
            color: #000;

            :visited {
                color: #000;
            }

            :visited:hover {
                color: #000;
            }

            :hover {
                color: #000;
            }
        }
        pre {
            code {

                display: block;
                width: 50%;
            }
        }
    }
`


const BlogTitle = styled.h2`
    text-align: left;
`

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