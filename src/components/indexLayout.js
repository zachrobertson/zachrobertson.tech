import React from "react"
import Header from "./indexHeader"
import Footer from "./footer"
import { createGlobalStyle } from "styled-components"


const Global = createGlobalStyle`
  html, body {
    background: #363945;
    margin: 0;
    position: relative;
    font-size: 100%;
    color: #ffff;
    background-color: #0d0d0d;
    height: auto;
    line-height: 1.5;
    font-family: Tahoma;
  }
`

const Layout = ({ children }) => {
    return (
        <>
        <Global />
            <Header />
            <div style={{
                margin: "0 auto",
                maxWidth: 960,
            }}>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout