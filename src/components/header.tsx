import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledHeader = styled.div`
    display: flex;
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #444;

    ul {
        display: flex;
        flex-direction: row;
        padding: 0;
        margin: 0;
        width: 100%;
    }
`;

const SiteBanner = styled.div`
    position: absolute;
    right: 0;
    bottom: 5px;
    font-size: 0.75rem;
    color: white;
    font-family: monospace;
    padding-right: 0.5rem;
`;

const StyledListItem = styled.li<{ $isActive: boolean }>`
    list-style-type: none;
    margin-right: 0.3rem;
    position: relative;
    
    a {
        display: block;
        background-color: ${({ $isActive }) => ($isActive ? '#333' : '#222')};
        color: ${({ $isActive }) => ($isActive ? '#00FF00' : '#888')};
        padding: 0.5rem 1rem;
        border: 1px solid #444;
        border-bottom: ${({ $isActive }) => ($isActive ? 'none' : '1px solid #444')};
        font-family: monospace;
        text-transform: uppercase;
        position: relative;
        bottom: ${({ $isActive }) => ($isActive ? '-1px' : '0')};
        z-index: ${({ $isActive }) => ($isActive ? '5' : '1')};
        border-radius: 4px 4px 0 0;
        
        /* Add shadow for depth on active tab */
        box-shadow: ${({ $isActive }) => ($isActive ? '0 0 10px rgba(0, 255, 0, 0.2)' : 'none')};
    }

    &:hover a {
        background-color: ${({ $isActive }) => ($isActive ? '#333' : '#2a2a2a')};
        color: ${({ $isActive }) => ($isActive ? '#00FF00' : '#00DD00')};
    }
    
    /* Make tabs overlap */
    margin-right: -15px;
`;

function Header(props: { pageName: string }) {
    return (
        <StyledHeader>
            <ul>
                <StyledListItem 
                    key="index" 
                    $isActive={props.pageName === "index"}
                    style={{ zIndex: props.pageName === "index" ? 30 : 3 }}
                >
                    <Link href='/'>
                        ~/home
                    </Link>
                </StyledListItem>
                <StyledListItem 
                    key="blogs" 
                    $isActive={props.pageName === "blogs"}
                    style={{ zIndex: props.pageName === "blogs" ? 20 : 2 }}
                >
                    <Link href="/blogs">
                        ~/blogs
                    </Link>
                </StyledListItem>
                <StyledListItem 
                    key="about" 
                    $isActive={props.pageName === "about"}
                    style={{ zIndex: props.pageName === "about" ? 10 : 1 }}
                >
                    <Link href="/about">
                        ~/about
                    </Link>
                </StyledListItem>
            </ul>
            <SiteBanner>zachrobertson.tech</SiteBanner>
        </StyledHeader>
    );
}

export default Header;