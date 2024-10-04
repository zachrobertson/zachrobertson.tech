import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledFooter = styled.div`
    flex: 0;
    text-align: center;
    font-size: 1rem;
    margin: 1rem 0 1rem 0;

    :hover {
        text-decoration: underline;
    }

    a {
        margin: 1rem;
        color: white;
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <Link href='https://github.com/zachrobertson' target="_blank" rel='noopener noreferrer'>
                GitHub
            </Link>
            <Link href='https://www.linkedin.com/in/zachrobertson-tech/' target="_blank" rel='noopener noreferrer'>
                LinkedIn
            </Link>
            <Link href='https://twitter.com/ZachRTech' target="_blank" rel='noopener noreferrer'>
                Twitter
            </Link>
            <Link href='/api/rss/feed'>
                RSS
            </Link>
        </StyledFooter>
    )
}

export default Footer;