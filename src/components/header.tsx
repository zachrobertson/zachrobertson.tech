import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { keyframes } from 'styled-components';

import { SMALL_DEVICE_MAX_WIDTH } from '@/components/deviceConstants';

const listItemFontSize = `2rem`;

const ReplPrompt = styled.span`
    color: #00ff00;
    font-size : ${listItemFontSize};
    justify-content: center;
    list-style-type: none;
    font-weight: bold;
`;

const blink = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`;

const Cursor = styled.div`
    width: 1ch;
    height: 1.25em;
    background-color: #00ff00;
    animation: ${blink} 1s step-end infinite;
    display: none; /* Default to not displaying */

    @media (max-width: ${SMALL_DEVICE_MAX_WIDTH}px) {
        display: block; /* Display by default on small devices */
    }
`;

const StyledHeader = styled.div<{ $isUlVisible: boolean }>`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    ul {
        justify-content: flex-start;
        display: flex;
        flex-direction: row;

        @media (max-width: ${SMALL_DEVICE_MAX_WIDTH}px) {
            display: ${({ $isUlVisible }) => ($isUlVisible ? 'flex' : 'none')};
            flex-direction: ${({ $isUlVisible }) => ($isUlVisible ? 'column' : 'row')};
        }
    }

    @media (max-width: ${SMALL_DEVICE_MAX_WIDTH}px) {
        &:hover ${Cursor} {
            display: ${({ $isUlVisible }) => ($isUlVisible ? 'none' : 'block')};
        }
    }
`;

const StyledListItem = styled.li<{ $isActive: boolean }>`
    font-size : ${listItemFontSize};
    justify-content: center;
    list-style-type: none;
    font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};

    a {
        text-decoration: none;
        justify-content: space-evenly;
        padding: 5px;
        color: #00ff00;

        :hover {
            color: #ffffff;
            text-decoration: underline;
        }

        :visited {
            color: #00ff00;
        }
    }
`;

function Header() {
    const router = useRouter();
    const [$isUlVisible, set$isUlVisible] = useState(false);

    const handleMouseEnter = () => {
        set$isUlVisible(true);
    };

    const handleMouseLeave = () => {
        set$isUlVisible(false);
    };

    return (
        <StyledHeader $isUlVisible={$isUlVisible} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <ReplPrompt>&gt;&gt;&gt;</ReplPrompt>
            {!$isUlVisible && <Cursor />}
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
