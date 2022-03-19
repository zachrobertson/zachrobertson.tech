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
    justify-content: center;
`

const ProfileImageWrapper = styled.div`
    img {
        margin: auto;
        display: block;
        width: 75px;
        height: auto;
        border-radius: 50%;
        border: 2px solid black;
        background: transparent;
    }
`

const TitleParagraph = styled.div`
    margin-top: 0;
    padding-left: 1rem;
    align-content: center;

    a {
        padding: 0 1rem 0 0;
        color: #000000;

        :visited {
            color: #000000;
        }
    }

    img {
        display: inline-block;
        width: 32px;
        height: auto;
        padding-top: .5rem;
        padding-left: 1rem;
        padding-right: .75rem;
        border-radius: 0px;
        border: none;
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
                <ProfileImageWrapper>
                    <StaticImage
                        src='../images/profile.jpg'
                        alt='profile picture'
                    />
                </ProfileImageWrapper>
                <TitleParagraph>
                    This is my blog, here I write about stuff.
                    <br/>
                    Mostly AI and Data Science.
                    <br/>
                    <StaticImage
                        src='../images/TF_FullColor_Icon.png'
                        alt='Tensorflow Logo'
                        transformOptions={{
                            fit : "contain"
                        }}
                    />
                    <StaticImage
                        src='../images/python-logo-notext.png'
                        alt='Python Logo'
                        transformOptions={{
                            fit : "contain"
                        }}
                    />
                    <StaticImage
                        src='../images/Git-Icon-Black.png'
                        alt='Git Logo'
                        transformOptions={{
                            fit : "contain"
                        }}
                    />
                    <StaticImage
                        src='../images/JavaScript-Logo-Official.png'
                        alt='JavaScript Logo'
                        transformOptions={{
                            fit : "contain"
                        }}
                    />
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
