import React from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from "styled-components";

import Header from '@/components/header';
import Footer from '@/components/footer';
import { SMALL_DEVICE_MAX_WIDTH, MED_DEVICE_MAX_WIDTH } from '@/components/deviceConstants';


const Global = createGlobalStyle`
    html, body {
        height: 100%;
        width: 100%;
        background-color: black;
        color: white;
    }

    body {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        font-size: 100%;

        @media (min-width: ${MED_DEVICE_MAX_WIDTH+1}px) {
            width: 1024px;
        }

        @media (min-width: ${SMALL_DEVICE_MAX_WIDTH+1}px) and (max-width: ${MED_DEVICE_MAX_WIDTH}px) {
            width: 768px;
        }

        @media (max-width: ${SMALL_DEVICE_MAX_WIDTH}px) {
            width: 80%
        }
    }

    a {
        text-decoration: none;
    }
    
    a:hover {
        text-decoration: none;
    }

    ::selection {
        background-color: rgba(0, 255, 0, 0.5);
        color: #00FF00;
    }
`;

const StyledLayout = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

type LayoutProps = {
    pageName: string;
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children, pageName }) => {
    return (
        <>
            <Global/>
            <StyledLayout>
                <Header pageName={pageName} />
                {children}
                <Footer/>
            </StyledLayout>
        </>
    );
};

export default Layout;
