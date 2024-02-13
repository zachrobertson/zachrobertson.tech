import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const homeFontSize = `1.75rem`
const listItemFontSize = `1.25rem`

const StyledHeader = styled.div`
    height: 12.5vh;

    ul {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        padding: 0;
        padding-top: 5vh;
    }
`

const StyledListItem = styled.li`
    font-size : ${listItemFontSize};
    justify-content: center;
    list-style-type: none; /* Remove bullet points from list */

    a {
        text-decoration: none;
        justify-content: space-evenly;
        padding: 5px;
        color: #b89ea3;

        :hover {
            color: #000000;
        }

        :visited {
            color: #b89ea3;
        }

        :visited:hover {
            color: #000000;
        }
`

const HomeAccentedTitle = styled.li`
    font-size: ${homeFontSize};
    font-weight: bold;
    list-style-type: none; /* Remove bullet points from list */
    
    a {
        text-decoration: none;
        color: #000000;
        
        :visited {
            color: #000000;
        }

        :visited:hover {
            color: #b89ea3;
        }

        :hover {
            color: #b89ea3;
        }
    }
`

function Header() {
    return (
        <StyledHeader>
            <ul>
                <HomeAccentedTitle>
                    <Link href='/'>
                        ZACHROBERTSON.tech
                    </Link>
                </HomeAccentedTitle>
                <StyledListItem key="BLOG">
                    <Link href="/blog">
                        BLOG
                    </Link>
                </StyledListItem>
                <StyledListItem key="ABOUT">
                    <Link href="/about">
                        ABOUT
                    </Link>
                </StyledListItem>
            </ul>
        </StyledHeader>
    )
}

export default Header