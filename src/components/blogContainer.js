import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { calcNumberOfTimers } from '../utils/timeToRead';


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

const TimerElement = styled.p`
    display: inline-block;
    margin: 0;
`

const BlogContainer = ({
    data
}) => {
    const timers = calcNumberOfTimers(data.timeToRead);
    let timerElements = [];
    for (let i = 0; i < timers; i++) {
        timerElements.push(
            <TimerElement key={i}>
                &#9203;
            </TimerElement>
        )
    }
    return (
            <StyledContainer>
                <Link to={data.frontmatter.slug}>
                    <h1>{data.frontmatter.title}</h1>
                </Link>
                {data.frontmatter.date} - 
                {timerElements.map((element) => {
                    return element
                })
                }
                {data.timeToRead} min read
                <div dangerouslySetInnerHTML={{__html: data.excerpt}}/>
                <StyledLine/>
            </StyledContainer>
    )
}

export default BlogContainer