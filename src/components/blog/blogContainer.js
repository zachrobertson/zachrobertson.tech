import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"


const BlogContainer = ({ data }) => {
    
    return (
        <Link to={data.frontmatter.slug} style={{
            textDecoration: "none"
        }}>
        <Container>
            <span>{data.frontmatter.title}</span>
            <div>{"By : " + data.frontmatter.author + ", " + data.frontmatter.date}</div>
            < HorizontalLine />
            <ContentContainer dangerouslySetInnerHTML={{__html: data.excerpt}}/>
        </Container>
        </Link>
    )
}

export default BlogContainer

const Container = styled.div`
    position: relative;
    left: -96px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: transparent;
    color: #ffff;
    margin: 10% 10% 10% 10%;
    border-radius: 10px/10px;
    padding-left: 20px;
    box-shadow: 0px 0px 10px 5px black;
    line-height: 2;
    font-family: Tahoma;

    span {
        font-size: 35px;
        text-transform: uppercase;
        margin-top: 10px;
        
    }

    div {
        font-size: 20px;
        text-transform: uppercase;
    }
`

const ContentContainer = styled.p`
    color: #ffff;
    margin: 20px;
    line-height: 2;
    font-size: 20px;

    code {
        background: gray;
        border-radius: 10px/10px;
        padding: 5px;
    }

    img {
        border-radius: 10px/10px;
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

    h1 {
        color: #ffff;
    }

    h2, h3 {
        text-align: center;
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
`

const HorizontalLine = styled.hr`
    padding: 0;
    height: 2px;
    width: 90%;
    background-color: #ffff;
    border: none;
`