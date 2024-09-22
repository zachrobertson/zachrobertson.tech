import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const listItemFontSize = `1.25rem`; // Lowered font size

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
    font-size : ${listItemFontSize}; // Lowered font size
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

function Header() {
    const router = useRouter();

    return (
        <StyledHeader>
            <ul>
                <StyledListItem $isActive={router.pathname === "/"}>
                    <Link href='/'>
                        ZACHROBERTSON.tech
                    </Link>
                </StyledListItem>
                <StyledListItem $isActive={router.pathname === "/blogs"}>
                    <Link href="/blogs">
                        BLOGS
                    </Link>
                </StyledListItem>
                <StyledListItem $isActive={router.pathname === "/about"}>
                    <Link href="/about">
                        ABOUT
                    </Link>
                </StyledListItem>
            </ul>
        </StyledHeader>
    );
}

export default Header;
