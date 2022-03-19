import * as React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';

import BlogContainer from '../components/blogContainer';
import PageLayout from '../components/pageLayout';

const BlogPage = ({
    data: {
        allMarkdownRemark: { edges },
    },
}) => {
    const Posts = edges.filter(
        edge => !!edge.node.frontmatter.date
    ).map(
        edge => <BlogContainer data={edge.node} key={edge.node.frontmatter.title}/>
    )
    return (
        <PageLayout current='BLOG' title='BLOG'>
            <Helmet>
                <meta className="application"/>
                <title>BLOG - ZACHROBERTSON.tech</title>
                <link rel="canonical" href="https://zachrobertson.tech" />
            </Helmet>
            {Posts}
        </PageLayout>
    )
}

export default BlogPage

export const pageQuery = graphql`
    query {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
            edges {
                node {
                    htmlAst
                    excerpt(pruneLength: 250, format: HTML)
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        slug
                        title
                        author
                    }
                }
            }
        }
    }
`