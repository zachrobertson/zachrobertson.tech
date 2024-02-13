import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { BlogData } from '@/interfaces/blog';


const StyledContainer = styled.div`
    width: 50%;
    @media (max-width: 768px) {
        width: 65%;
    }
    margin: 0 auto;
    text-align: left;
    font-size: 1.25rem;

    
    a {
        text-decoration: none;
        color: #000;

        :visited {
            color: #000;
        }

        :hover {
            color: #b89ea3;
        }
    
        :visited:hover {
            color: #b89ea3;
        }
    }

    p {
        a {
            text-decoration: underline;
        }
    }
`

const StyledLine = styled.hr`
    border: none;
    height: 1px;
    background-color: #000;
`

const BlogContainer = (data: BlogData) => {
    const date = new Date(data.date);
    const formattedDate = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;

    return (
            <StyledContainer>
                <Link href={`/blog/${data.id}`}>
                    <h1>{data.title}</h1>
                </Link>
                {formattedDate}
                <div dangerouslySetInnerHTML={{__html: data.excerpt}}/>
                <StyledLine/>
            </StyledContainer>
    )
}

export default BlogContainer