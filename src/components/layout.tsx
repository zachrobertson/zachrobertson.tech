import React from 'react';
import styled from 'styled-components';
import "@fontsource/oswald";
import { createGlobalStyle } from "styled-components";

import Header from './header';
import Footer from './footer';


const Global = createGlobalStyle`
    html, body {
        margin: 0; /* Removes margin around entire webpage (who the fuck thought this was a good idea) */
        font-family: Oswald;
        font-size: 100%; /*This will set the font size to 16px, the default value for the HTML tag*/
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`

const StyledLayout = styled.div`
`

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Global/>
            <StyledLayout>
                <Header/>
                {children}
                <Footer/>
            </StyledLayout>
        </>
    );
};

export default Layout;
