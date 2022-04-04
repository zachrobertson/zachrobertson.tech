import { graphql } from "gatsby";
import { Helmet } from 'react-helmet';
import { StaticImage } from 'gatsby-plugin-image';
import React from "react";
import styled from 'styled-components';
import RightPanelTemplate from "../components/rightPanelTemplate.js";
import BlogContainer from '../components/blogContainer.js';
import PageLayout from "../components/pageLayout.js";



const TitleContainer = styled.div`
    display: flex;
    width: 50%;
    margin: 0 auto;
    justify-content: left;
`

const TitleParagraph = styled.div`
    margin-top: 0;
    padding-left: 1rem;
    align-content: center;
    font-size: 1.25rem;
    display: inline-block;

    span {
        display: inline-block;
    }

    div {
        display: inline-block;
        vertical-align: middle;
        margin-left: 2rem;
        margin-bottom: 1rem;
    }

    a {
        padding: 0 1rem 0 0;
        color: #000000;

        :visited {
            color: #000000;
        }
    }
`


const RightSidePanel = styled.div`
    @media (max-width : 768px) {
        display: none;
    }
    width: 20%;
    position: absolute;
    top: 15vh;
    right: 0;
    margin-right: 2rem;
    border-top: 8px solid black;
    text-align: left;

    h3 {
        margin: 0 auto;
        font-size: 1.5rem;
    }
`


// markup
const IndexPage = ({
    data: {
        allMarkdownRemark : { edges },
    },
}) => {
    const Posts = edges.filter(
        edge => !!edge.node.frontmatter && edge.node.frontmatter.title !== 'Upcoming Projects and Blogs'
    ).map(
        (edge) => {
            return <BlogContainer data={edge.node} key={edge.node.frontmatter.slug}/>}
    )

    const RightPanelMarkdown = edges.filter(
        edge => edge.node.frontmatter.title === "Upcoming Projects and Blogs"
    )[0] // should always be only 1 dimension
    let RightPanelIndex = 0;

    return (
        <PageLayout current='HOME'>
            <Helmet>
                <meta className="application"/>
                <title>ZACHROBERTSON.tech</title>
                <link rel="canonical" href="https://zachrobertson.tech" />
            </Helmet>
            <TitleContainer>
                {/* You cannot use styled-components to styled StaticImages elements */}
                {/* Reference: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#using-staticimage-with-css-in-js-libraries*/}
                <StaticImage
                    src='../images/profile.jpg'
                    alt='profile picture'
                    style={{
                        display: 'inline-block',
                        width: '75px',
                        height: '75px',
                        borderRadius: '50%',
                        border: '1px solid black',
                        background: 'transparent'
                    }}
                />
                <TitleParagraph>
                    <span>
                        This is my blog, here I write about stuff.
                        <br/>
                        Mostly AI and Data Science.
                        <br/>
                    </span>
                    {/* Same reason as above for inline styles */}
                    <div>
                        <StaticImage
                            src='../images/TF_FullColor_Icon.png'
                            alt='Tensorflow Logo'
                            style={{
                                display: 'inline-block',
                                width: '32px',
                                height: '32px',
                                paddingTop: '.5rem',
                                paddingRight: '.75rem',
                                borderRadius: '0px',
                                border: 'none',
                            }}
                            objectFit="contain"
                        />
                        <StaticImage
                            src='../images/python-logo-notext.png'
                            alt='Python Logo'
                            style={{
                                display: 'inline-block',
                                width: '32px',
                                height: '32px',
                                paddingTop: '.5rem',
                                paddingLeft: '1rem',
                                paddingRight: '.75rem',
                                borderRadius: '0px',
                                border: 'none',
                            }}
                            objectFit="contain"
                        />
                        <StaticImage
                            src='../images/Git-Icon-Black.png'
                            alt='Git Logo'
                            style={{
                                display: 'inline-block',
                                width: '32px',
                                height: '32px',
                                paddingTop: '.5rem',
                                paddingLeft: '1rem',
                                paddingRight: '.75rem',
                                borderRadius: '0px',
                                border: 'none',
                            }}
                            objectFit="contain"
                        />
                        <StaticImage
                            src='../images/JavaScript-Logo-Official.png'
                            alt='JavaScript Logo'
                            style={{
                                display: 'inline-block',
                                width: '32px',
                                height: '32px',
                                paddingTop: '.5rem',
                                paddingLeft: '1rem',
                                paddingRight: '.75rem',
                                borderRadius: '0px',
                                border: 'none',
                            }}
                            objectFit="contain"
                        />
                    </div>
                </TitleParagraph>
            </TitleContainer>
            {Posts}
            <RightSidePanel>
                <h3>
                    {RightPanelMarkdown.node.frontmatter.title}
                </h3>
                {RightPanelMarkdown.node.htmlAst.children.map(
                    (child) => {
                        RightPanelIndex += 1;
                       return(
                        <RightPanelTemplate key={RightPanelIndex}>
                            {child}
                        </RightPanelTemplate>
                    )}
                )}
            </RightSidePanel>
        </PageLayout>
    )
}

export default IndexPage;

export const pageQuery = graphql`
    query {
        allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            edges {
                node {
                    excerpt(pruneLength: 250, format: HTML)
                    frontmatter {
                        date(formatString: "MMM DD, YYYY")
                        slug
                        title
                        author
                    }
                    htmlAst
                    timeToRead
                }
            }
        }
    }
`
