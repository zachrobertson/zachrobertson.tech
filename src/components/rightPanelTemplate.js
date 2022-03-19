import React from 'react';
import styled from 'styled-components';


const EventTitle = styled.div`
    font-size: 1rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-right: 1rem;
`

const EventBody = styled.div`
    font-size: .85rem;
    margin-top: .5rem;
    margin-right: 1rem;
`

const RightPanelTemplate = (data) => {
    if (!data.children.tagName) {
        return <div key={data.children.key}>{data.children.value}</div>
    }
    if (data.children.tagName !== 'h2') {
        return <EventBody key={data.children.key}>
            {data.children.children[0].value}
        </EventBody>
    }
    return <EventTitle key={data.children.key}>
        {data.children.children[0].value}
    </EventTitle>
}

export default RightPanelTemplate;