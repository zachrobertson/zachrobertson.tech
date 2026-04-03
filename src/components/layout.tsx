import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";

import Header from '@/components/header';
import { DESKTOP_BREAKPOINT } from './constants';
import { theme } from '@/theme';

const Global = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        line-height: 1.6;
        color: ${theme.text};
        background-color: ${theme.background};
    }

    #__next {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

const StyledLayout = styled.div`
    flex: 1;
    display: flex;
    min-height: 100vh;
    
    /* Mobile: stack vertically */
    flex-direction: column;
    
    /* Desktop: split screen */
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
        flex-direction: row;
        overflow: hidden;
    }
`;

const LeftPanel = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    
    /* Mobile: full width */
    width: 100%;
    
    /* Desktop: left half */
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
        width: 50%;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        overflow-y: auto;
        justify-content: center;
    }
`;

const RightPanel = styled.div`
    flex: 1;
    padding: 2rem;
    
    /* Mobile: full width */
    width: 100%;
    
    /* Desktop: right half, offset by left panel */
    @media (min-width: ${DESKTOP_BREAKPOINT}px) {
        width: 50%;
        margin-left: 50%;
        overflow-y: auto;
        height: 100vh;
    }
`;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <Global/>
            <StyledLayout>
                <LeftPanel>
                    <Header/>
                </LeftPanel>
                <RightPanel>
                    {children}
                </RightPanel>
            </StyledLayout>
        </>
    );
};

export default Layout;
