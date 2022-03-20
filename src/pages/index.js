import React from "react"
import { Link, graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/indexLayout"
import Profile from "../components/profile"
import BlogContainer from "../components/blog/blogContainer"

const IndexPage = ({ 
  data: {
    allMarkdownRemark :  { edges }, 
  },
}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <BlogContainer data={edge.node} key={edge.node.frontmatter.slug}/>)

  return (
    <>
      <Layout>
        <IntroHeader>
            <span>
              <Profile/> 
            </span>
            <div>
              <span>ZACH ROBERTSON :</span>
              <br />
              <p>
                I like writing code and messing with tech hardware. Sometimes I write about my projects on my <Link to="/blog" style={{ textDecoration: "none" }}>blog</Link>.
                Follow me on twitter <a href="https://twitter.com/ZachRTech" style={{ textDecoration: "none" }}>@ZachRTech</a> or check out my work on <a href="https://github.com/zachrobertson" style={{ textDecoration: "none" }}>GitHub</a>
              </p>
              <HorizontalLine /> 
            </div>
        </IntroHeader>         
        <h2 style={{
          textAlign: "center",
          margin: "50px",
          fontSize: "35px"
        }}>
          RECENT BLOG POSTS :
        </h2>
        <div>
          {Posts}
        </div>
               

        <ToDo>
          
            <h1>
              UPCOMING PROJECTS :
            </h1>

            <HorizontalLine />
            <ul >
              <li key="ToDo1">
                Make website actually work on mobile, sorry about that
              </li>
              <li key="ToDo2">
                LittleBrother v0.0 alpha release :
                <br />
                <span> This is my open source dashboard camera project built around the ESP32 microcontroller</span>
              </li>
              <li key="ToDo3">
                Blog post on how to incorporate MoneyButton into a JavaScript project
              </li>
            </ul>
          
        </ToDo>
      </Layout>
    </>
  )
}

export default IndexPage

export const pageQuery = graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            excerpt(pruneLength: 1000, format: HTML)
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

const IntroHeader = styled.h1`
  position: relative;
  text-align: center;
  display: inline-block;
  vertical-align: center;

  span {
    display: inline-block;
    vertical-align: top;
    margin-top: 20px;
  }
  
  div {
    font-size: 20px;
    width: 50%;
    text-align: center;
    line-height: 150%;
    display: inline-block;
    padding-left: 10%;
    vertical-align: bottom;

    span {
      font-size: 35px;
      margin: 20px;
    }

    a {
      color: purple;

      :hover:visited {
        color: red;
      }

      :visited {
        color: purple;
      }

      :hover {
        color: red;
      }
    }
  }
`

const HorizontalLine = styled.hr`
  display: block;
  margin: 20px;
  height: 2px;
  background-color: #ffff;
  border: none;
`

const ToDo = styled.div`
  background: transparent;
  padding: 10%;
  padding-top: 10px;
  padding-bottom: 10%;
  height: auto;
  border-radius: 10px/10px;
  WebKitBorderRadius: 10px/10px;
  text-align: center;
  margin: 10% 10% 10% 10%;

  ul {
    list-style-type: circle;
    text-align: left;
    li {
      padding: 10px;
    }
  }
`;