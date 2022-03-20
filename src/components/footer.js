import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"




const Footer = () => {

    const images = useStaticQuery(graphql`
    query {
        githubImage: file(relativePath: { eq: "GitHubLogo.png" }) {
            childImageSharp {
                fixed(width: 32, height: 32) {
                    ...GatsbyImageSharpFixed
                    }
                }
            }
        linkedinImage: file(relativePath: {eq: "LinkedinLogo.png"}){
            childImageSharp {
                fixed(width: 32, height: 32) {
                    ...GatsbyImageSharpFixed
                }
            }
        }
        }
`)


    return (
        <StyledFooter>
            <FooterText>
                This is an open source website
                <StyledLink href="https://github.com/zachrobertson">
                    <Img fixed={images.githubImage.childImageSharp.fixed}/>
                </StyledLink> 
                | Created by Zach Robertson
                <StyledLink href="https://www.linkedin.com/in/zach-robertson-883509119/">
                    <Img fixed={images.linkedinImage.childImageSharp.fixed}/>
                </StyledLink>with <a href="https://www.gatsbyjs.com/" style={{ textDecoration: "none" }}>Gatsby</a>
            </FooterText>
        </StyledFooter>
    )
}

export default Footer

const StyledFooter = styled.footer`
    position: relative;
    align-items: center;
    text-align: center;
    display: inline-block;
    background: #4d4d4d;
    width: 100%;
    height: auto;
    border: none;
    z-index: 1;
    margin-top: 50px;
`

const FooterText = styled.div`
    display: inline-block;
    font-size: 1.25rem;
    color: #ffff;
    left: 50%;

    a {
        color: purple;

        :hover {
            color: red;
        }
    }
`

const StyledLink = styled.a`
    display: inline-block;
    margin: 20px;
`