import React from 'react';
import Layout from '@/components/layout';
import Link from 'next/link';
import styled from 'styled-components';

const TerminalSection = styled.div`
    margin-bottom: 2rem;
`;

const AboutContainer = styled.div`
    font-size: 1rem;
    line-height: 1.6;
    color: #CCC;
    padding: 1rem;
    background-color: #1a1a1a;
    border: 1px solid #333;
    border-radius: 5px;
    font-family: 'Fira Code', monospace;

    p {
        margin-bottom: 1.5rem;
    }

    ul {
        border-left: 2px solid #00FF00;
        padding-left: 1rem;
        margin-top: 1rem;
    }

    li {
        list-style-type: none;
        margin: 0.5rem 0;
        position: relative;
        padding-left: 1.5rem;
        
        &:before {
            content: "→";
            position: absolute;
            left: 0;
            color: #00FF00;
        }
    }

    a {
        color: #00AAFF;
        text-decoration: none;
        border-bottom: 1px dashed #00AAFF;
        
        &:hover {
            color: #00DDFF;
            border-bottom: 1px solid #00DDFF;
        }
    }
`;

export default function AboutPage() {
    return (
        <Layout pageName='about'>
            <TerminalSection>
                <AboutContainer>
                    <p>
                        I&apos;m Zach Robertson, a software developer with a Physics degree. These days I&apos;m working as an Aerospace software engineer, but that&apos;s just the day job.
                    </p>

                    <p>
                        When I&apos;m not coding, you&apos;ll probably find me on my bike. I&apos;m really into cycling, my focus is on gravel and crit racing because I love going fast. If you are in the St. Louis area come by Carondelete park
                        on Tuesday nights for the local crit race series, all are welcome!
                    </p>

                    <p>
                        I&apos;m also passionate about learning new skills in my free time. I&apos;ve been diving deep into agentic AI and large language models. I have experience working on an open-source agent
                        framework and building pipelines for training transformer based models using PyTorch and Tensorflow (and a bit of Tinygrad, if you know you know) and am always looking for inspiration for
                        new things to learn or build.
                    </p>
                </AboutContainer>
            </TerminalSection>
        </Layout>
    );
};