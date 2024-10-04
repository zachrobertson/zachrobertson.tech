import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Layout from '@/components/layout';
import { BlogData } from '@/interfaces/blog';
import { MED_DEVICE_MAX_WIDTH, SMALL_DEVICE_MAX_WIDTH } from './deviceConstants';

const BlogContainer = styled.div`
    width: 50%;
    padding: 1rem;
    margin: 0 auto;
    text-align: center;
    font-size: 20px;
    @media (min-width: ${MED_DEVICE_MAX_WIDTH+1}px) {
        width: 1024px;
    }

    @media (min-width: ${SMALL_DEVICE_MAX_WIDTH+1}px) and (max-width: ${MED_DEVICE_MAX_WIDTH}px) {
        width: 768px;
    }

    @media (max-width: ${SMALL_DEVICE_MAX_WIDTH}px) {
        width: 100%
    }

    div {
        text-align: left;

        a {
            color: #000000;

            :visited {
                color: #000000;
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
                text-align: left;
                display: block;
                width: 50%;
                color: #000000;
                padding: 0.5rem;
            }
        }
    }
`;

const BlogTitle = styled.h2`
    text-align: left;
`;

const HeaderImage = styled.img`
    width: 100%;
    height: auto;
`;

const AuthorDateContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const StravaGraph = dynamic(() => import('../components/stravaGraph'), {
    ssr: false,
});

function BlogTemplate(data: BlogData) {
    const date = new Date(data.date);
    const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

    return (
        <Layout pageName='blogPage'>
            <BlogTitle>
                {data.title}
            </BlogTitle>
            <AuthorDateContainer>
                <span>{data.author}</span>
                <span>{formattedDate}</span>
            </AuthorDateContainer>
            {(data.headerImage === "stravaGraph" && data.stravaData !== undefined) ? (
                <StravaGraph data={data.stravaData}/>
            ) : (
                <HeaderImage src={data.headerImage} alt={data.title} />
            )}
            <BlogContainer>
                <div dangerouslySetInnerHTML={{__html: data.html}} />
            </BlogContainer>
        </Layout>
    )
}

export default BlogTemplate;