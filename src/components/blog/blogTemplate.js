import React from "react"
import Layout from "../layout"
import { graphql } from "gatsby" 
import styled from "styled-components"
import Profile from "../profile"
import { Link } from "gatsby"

export default function Template({ data }) {
  
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark

  return (
    <Layout>
        <IntroHeader>
        <Link to="/">
          <span>
            <Profile/> 
          </span>
        </Link>
          <div>
            <span>{frontmatter.title} </span>
            <br />
            {frontmatter.date + " : " + frontmatter.author}
            <HorizontalLine />
          </div>
        </IntroHeader>
        <PostContainer 
            dangerouslySetInnerHTML={{__html: markdownRemark.html}}
        />
    </Layout>
  )
}



export const pageQuery = graphql`
query($slug: String!) {
  markdownRemark(frontmatter: { slug: { eq: $slug } }) {
    html
    frontmatter {
      date(formatString: "MMMM DD, YYYY")
      slug
      title
      author
    }
    html
  }
}
`

const IntroHeader = styled.h1`
  position: relative;
  text-align: center;
  padding: 20px;
  display: inline-block;
  text-transform: uppercase;

  span {
    display: inline-block;
  }
  
  div {
    font-size: 20px;
    width: 50%;
    text-align: center;
    line-height: 150%;
    display: inline-block;
    padding-left: 10%;
    vertical-align: center;

    span {
        font-size: 35px;
        margin-bottom: 25px;
        line-height: 1.5;
    }

    a {

      &:hover:visited {
        color: red;
      }

      &:visited {
        color: purple;
      }
    }
  }
`

const HorizontalLine = styled.div`
    display: flex;
    height: 2px;
    background-color: #ffff;
    margin: 25px;
    width: 90%;
`

const PostContainer = styled.div`
    background: transparent;
    color: #ffff;
    padding: 25px;
    display: flex;
    flex-direction: column;
    position: relative;
    
    p, ol {
        line-height: 2;
        font-size: 20px;
        border-radius: 10px/10px;

        code {
          background: gray;
          border-radius: 10px/10px;
          padding: 5px;
        }

        span {
            borer-radius: 10px/10px;
            
          img {
            border-radius: 10px/10px;
          }
        }

        a {
          text-decoration: none;
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

    hr {
      border: none;
    }
  
    hr::before {
      content: '***';
      display: block;
      text-align: center;
      color: #ffff;
    }

    h2, h3, h4, h5 {
      text-align: center;
    }
`