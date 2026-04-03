import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { DESKTOP_BREAKPOINT } from './constants';
import { theme } from '@/theme';

const StyledHeader = styled.nav`
    display: flex;
    flex-direction: column;
    width: 100%;
    
    /* Mobile: center content */
    justify-content: flex-start;
    align-items: center;
    
    /* Desktop: align content to top right */
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
        align-items: flex-end;
        height: 100%;
    }
`;

const Name = styled.a`
    font-weight: 600;
    font-size: 1.5rem;
    color: ${theme.text};
    margin-bottom: 0.5rem;
    text-align: center;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
        color: ${theme.textMuted};
    }

    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
        font-size: 2rem;
        margin-bottom: 0.75rem;
        text-align: right;
    }
`;

const Title = styled.div`
    font-size: 1.2rem;
    color: ${theme.textMuted};
    margin-bottom: 1rem;
    text-align: center;
    
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        text-align: right;
    }
`;

const SocialLinks = styled.div`
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    
    /* Mobile: center */
    justify-content: center;
    
    /* Desktop: right align */
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
        justify-content: flex-end;
    }
`;

const SocialLink = styled.a`
    color: ${theme.textMuted};
    transition: color 0.2s ease;
    font-size: 0.9rem;
    
    &:hover {
        color: ${theme.text};
    }
`;

function Header() {
    return (
        <StyledHeader>
            <Link href="/" passHref legacyBehavior>
                <Name>Zach Robertson</Name>
            </Link>
            <Title>Aerospace Software Engineer</Title>
            <SocialLinks>
                <Link href='https://github.com/zachrobertson' target="_blank" rel='noopener noreferrer' passHref legacyBehavior>
                    <SocialLink>GitHub</SocialLink>
                </Link>
                <Link href='https://www.linkedin.com/in/zachrobertson-tech/' target="_blank" rel='noopener noreferrer' passHref legacyBehavior>
                    <SocialLink>LinkedIn</SocialLink>
                </Link>
                <Link href='https://twitter.com/ZachRTech' target="_blank" rel='noopener noreferrer' passHref legacyBehavior>
                    <SocialLink>Twitter</SocialLink>
                </Link>
            </SocialLinks>
        </StyledHeader>
    );
}

export default Header;