import React from "react"
import Layout from "../components/layout"

const Default404Page = () => {
    return (
        <Layout>
            <h1 style={{
                textAlign: "center"
            }}>
                404. 
                page not found!
            </h1>
            <br/>
            <h5 style={{
                textAlign: "center"
            }}>
                That's weird right?
            </h5>
        </Layout>
    )
}

export default Default404Page