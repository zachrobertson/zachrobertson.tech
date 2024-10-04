import React from 'react';
import Layout from '@/components/layout';
import Link from 'next/link';
import styled from 'styled-components';

const AboutContainer = styled.div`
    font-size: 20px;

    br {
        content: "";
        display: block;
        margin-bottom: 1em;
    }
`

export default function AboutPage() {
    return (
        <Layout pageName='about'>
            <AboutContainer>
                <span>
                    I am Zach Robertson, currently I live in St. Louis Missouri with my lovely partner Emily and dog Stella.
                    I graduated from Texas A&amp;M, College Station, with a degree in Physics. During my Junior year I taught myself to program, there were no required coding classes for a physics major. Unbelievable!
                </span>
                <br/>
                <span>
                    I initially stared with data science projects and various other things related to either my physics classes or undergraduate research.
                    I&apos;ve now done web dev in JavaScript/TypeScript with various frameworks, embedded programming in C, bash scripting for automatic machine provisioning in linux distributions. In the past
                    few years I also became very interested in machine learning, before LLMs were even a thing! I remember when the &quot;Attention is all you need&quot; paper was released and the first iterations of GPT.
                    I now spend a lot of time working with open-source LLMs and machine learning frameworks (check out <Link href="https://github.com/tinygrad/tinygrad">Tinygrad</Link>), I even got my TensorFlow
                    certified developers certificate in 2018 (although I no longer use TensorFlow).
                </span>
                <br/>
                <span>
                    As an Aerospace Engineer I have had the opportunity to work on some very cool projects. The main thing I work on as a NASA contractor is building human interface
                    devices for the upcoming lunar space-station mission called Gateway. There are some very cool parts about working with NASA and in the Aerospace industry in general and I&apos;ve very much enjoyed it.
                    The bureaucracy can be annoying, but ultimately you get to work on things that no one else does and work with some of the most intelligent people in the world which makes the annoyance worth it.
                </span>
                <br/>
                <span>
                    Outside of work I spend a lot of time on my bike, currently I am training to be more competitive in the gravel racing scene.
                    Coming from an XC MTB background I really enjoy the technical parts of gravel racing and have been more and more interested in the `ultra endurance` aspects as well. My goals for the upcoming year are.
                    <ul>
                        <li>Finish Unbound 200 2025</li>
                        <li>Be competitive at the Tour of Herman Gravel Challenge 2025</li>
                        <li>Katy Trail Single Day Effort FKT Attempt</li>
                        <li>Gateway Cup Crit Race - Don&apos;t get dropped from the group!</li>
                    </ul>
                </span>
            </AboutContainer>
        </Layout>
    );
};