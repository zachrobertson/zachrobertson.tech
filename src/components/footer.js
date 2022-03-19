import React from 'react';
import styled from 'styled-components'


const StyledFooter = styled.div`
    width: 100%;
    flex-shrink: 0;
    text-align: center;
    padding-top: 2vh;
    padding-bottom: 2vh;
    font-size: 1rem;

    a {
        color: #000000;

        :visited {
            color: #000000;
        }

        span {
            margin: 0 2vh;
        }
    }

`

const Footer = () => {
    return (
        <StyledFooter>
            <a href='https://github.com/zachrobertson'>
                <span>
                    GitHub
                </span>
            </a>
            <a href='https://linkedin.com/zachrobertson-tech'>
                <span>
                    LinkedIn
                </span>
            </a>
            <a href='https://twitter.com/ZachRTech'>
                <span>
                    Twitter
                </span>
            </a>
        </StyledFooter>
    )
}

export default Footer;