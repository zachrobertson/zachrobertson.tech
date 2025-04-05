import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledFooter = styled.div`
    flex: 0;
    font-size: 0.9rem;
    padding: 1rem;
    border-top: 1px solid #444;
    background-color: transparent;
    font-family: monospace;
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: auto;
`;

const FooterLink = styled.a`
    color: #00FF00;
    display: flex;
    align-items: center;
    position: relative;
    
    &:before {
        content: '$';
        margin-right: 0.5rem;
        color: #888;
    }
    
    &:hover {
        color: #00DD00;
        text-decoration: none;
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <Link href='https://github.com/zachrobertson' target="_blank" rel='noopener noreferrer' passHref legacyBehavior>
                <FooterLink>github</FooterLink>
            </Link>
            <Link href='https://www.linkedin.com/in/zachrobertson-tech/' target="_blank" rel='noopener noreferrer' passHref legacyBehavior>
                <FooterLink>linkedin</FooterLink>
            </Link>
            <Link href='https://twitter.com/ZachRTech' target="_blank" rel='noopener noreferrer' passHref legacyBehavior>
                <FooterLink>twitter</FooterLink>
            </Link>
            <Link href='/api/rss/feed' passHref legacyBehavior>
                <FooterLink>rss</FooterLink>
            </Link>
        </StyledFooter>
    )
}

export default Footer;