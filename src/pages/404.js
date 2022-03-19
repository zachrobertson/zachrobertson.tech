import * as React from "react"
import styled from 'styled-components';

import PageLayout from "../components/pageLayout"


const ErrorTextContainer = styled.div`
    text-align: center;
`


// markup
const NotFoundPage = () => {
    return (
        <PageLayout>
            <ErrorTextContainer>
                This page doesn't exxist!
                <br/>
                That's pretty weird right?
            </ErrorTextContainer>
        </PageLayout>
    )
}

export default NotFoundPage
