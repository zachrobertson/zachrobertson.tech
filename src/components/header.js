import * as React from 'react';
import { Link } from 'gatsby';

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

const StyledAccentedListItem = styled.li`
    font-size: ${listItemFontSize};
    justify-content: center;
    list-style-type: none;

    a {
        text-decoration: none;
        justify-content: space-evenly;
        padding: 5px;
        color: #00000;

        :hover {
            color: #000000;
        }

        :visited {
            color: #000000;
        }

        :visited:hover {
            color: #000000;
        }
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
            color: #0000;
        }

        :visited:hover {
            color: #b89ea3;
        }

        :hover {
            color: #b89ea3;
        }
    }
`

const HomeTitle = styled.li`
    font-size: ${homeFontSize};
    font-weight: bold;
    list-style-type: none;

    a {
        text-decoration: none;
        color: #b89ea3;

        :visited {
            color: #b89ea3;
        }

        :visited:hover {
            color: #000000;
        }

        :hover {
            color: #000000;
        }
    }
`

function Header(current) {
    const headerList = [
        {name: 'BLOG', link: '/blog'},
    ]

    if(current.children === 'HOME') {
        return (
            <StyledHeader>
                <ul>
                    <HomeAccentedTitle>
                        <Link to='/'>
                            ZACHROBERTSON<span>.tech</span>
                        </Link>
                    </HomeAccentedTitle>
                    {headerList.map(
                        headerItem => {
                            return (
                                <StyledListItem key={headerItem.name}>
                                    <Link to={headerItem.link}>
                                        {headerItem.name}
                                    </Link>
                                </StyledListItem>
                            )
                        }
                    )}
                </ul>
            </StyledHeader>
        )
    }
    return (
        <StyledHeader>
            <ul>
                <HomeTitle>
                    <Link to='/'>
                        ZACHROBERTSON<span>.tech</span>
                    </Link>
                </HomeTitle>
                {headerList.map(
                    headerItem => {
                        if(headerItem.name === current.children) {
                            return (
                                <StyledAccentedListItem key={headerItem.name}>
                                    <Link to={headerItem.link}>
                                        {headerItem.name}
                                    </Link>
                                </StyledAccentedListItem>
                            )
                        }
                        return (
                            
                            <StyledListItem key={headerItem.name}>
                                <Link to={headerItem.link}>
                                    {headerItem.name}
                                </Link>
                            </StyledListItem>
                        )
                    }
                )}
            </ul>
        </StyledHeader>
    )
}

export default Header