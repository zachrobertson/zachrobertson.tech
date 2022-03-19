import * as React from 'react';
import styled from 'styled-components';
import '@fontsource/oswald';

import Header from './header.js';
import Footer from './footer.js';
import { createGlobalStyle } from "styled-components"
import { defineCustomElements as deckDeckGoHighlightElement } from "@deckdeckgo/highlight-code/dist/loader";

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

const PageLayout = (data) => {
    deckDeckGoHighlightElement();

    return (
        <>
            <Global/>
            <StyledLayout>
                    <Header>
                        {data.current}
                    </Header>
                    {data.children}
                    <Footer/>
            </StyledLayout>
        </>
    )
}

export default PageLayout