import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';


const StyledHeader = styled.div`
    display: flex;
    position: relative;
    cursor: pointer;

    ul {
        justify-content: space-between;
        display: flex;
        flex-direction: row; // Always align in a row
        padding: 0;
    }
`;

const StyledListItem = styled.li<{ $isActive: boolean }>`
    justify-content: center;
    list-style-type: none;
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
    padding-right: 1rem;

    a {
        text-decoration: none;
        justify-content: space-evenly;
        color: #000000;

        :hover {
            color: #000000;
            text-decoration: underline;
        }

        :visited {
            color: #000000;
        }
    }
`;

function Header(props: { pageName: string }) {
    return (
        <StyledHeader>
            <ul>
                <StyledListItem key="index" $isActive={props.pageName === "index"}>
                    <Link href='/'>
                        ZACHROBERTSON.tech
                    </Link>
                </StyledListItem>
                <StyledListItem key="blogs" $isActive={props.pageName === "blogs"}>
                    <Link href="/blogs">
                        BLOGS
                    </Link>
                </StyledListItem>
                <StyledListItem key="about" $isActive={props.pageName === "about"}>
                    <Link href="/about">
                        ABOUT
                    </Link>
                </StyledListItem>
            </ul>
        </StyledHeader>
    );
}

export default Header;