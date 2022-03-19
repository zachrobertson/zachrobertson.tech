import * as React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import PageLayout from './pageLayout';

import { calcNumberOfTimers } from '../utils/timeToRead';

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

const TimerElement = styled.p`
    display: inline-block;
    margin: 0;
`

function BlogTemplate({ data }) {
    const { markdownRemark } = data;
    const { frontmatter } = markdownRemark;
    const timers = calcNumberOfTimers(markdownRemark.timeToRead);
    let timerElements = [];
    for (let i = 0; i < timers; i++) {
        timerElements.push(
            <TimerElement key={i}>
                &#9203;
            </TimerElement>
        )
    }

    return (
        <PageLayout current='BLOG'>
            <Helmet>
                <meta className="application"/>
                <title>{frontmatter.title} - ZACHROBERTSON.tech</title>
                <link rel="canonical" href="https://zachrobertson.tech" />
            </Helmet>
            <BlogContainer>
                <BlogTitle>
                    {frontmatter.title}
                </BlogTitle>
                {frontmatter.date} - 
                {timerElements.map((element) => {
                    return element
                })
                }
                {markdownRemark.timeToRead} min read
                <div dangerouslySetInnerHTML={{__html: markdownRemark.html}} />
            </BlogContainer>
        </PageLayout>
    )
}

export default BlogTemplate

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
                date(formatString: "MMM DD, YYYY")
                slug
                title
                author
            }
            html
            timeToRead
        }
    }
`