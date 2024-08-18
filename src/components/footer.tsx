import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledFooter = styled.div`
    width: 100%;
    flex-shrink: 0;
    text-align: center;
    padding-top: 2vh;
    padding-bottom: 2vh;
    font-size: 1rem;
    background-color: #1e1e1e;

    a {
        color: #00ff00;

        :visited {
            color: #00ff00;
        }

        span {
            margin: 0 1rem;
        }
    }
`;

const Footer = () => {
    return (
        <StyledFooter>
            <Link href='https://github.com/zachrobertson'>
                <span>
                    GitHub
                </span>
            </Link>
            <Link href='https://www.linkedin.com/in/zachrobertson-tech/'>
                <span>
                    LinkedIn
                </span>
            </Link>
            <Link href='https://twitter.com/ZachRTech'>
                <span>
                    Twitter
                </span>
            </Link>
            <Link href='/rss'>
                <span>
                    RSS
                </span>
            </Link>
        </StyledFooter>
    )
}

export default Footer;