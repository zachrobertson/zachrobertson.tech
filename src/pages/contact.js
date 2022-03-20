import React from "react"
import Layout from "../components/layout"
import styled from "styled-components"


const Contact = () => {


    const selectAllText = (e) => {
        e.target.select();
    };

    return (
        <Layout>

            <ContactHeader>
                If you have any questions fell free to fill out the form below, or if there is a problem with the site submit an issue on my <a href="https://github.com/zachrobertson">GitHub</a>
            </ContactHeader>

            <HorizontalLine />

            <Form method="post" netlify-honeypot="bot-field" data-netlify="true" name="contact" id="contact">
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="form-name" value="contact" />
            <label >
                Name :
                <input type="text" name="name" required={true}/>
            </label>
            <br />
            <label >
                Email :
                <input type="email" name="email" required={true}/>
            </label>
            <br />
            <label >
                Message :
                <textarea name="message" required={true} onClick={selectAllText} onFocus={selectAllText} defaultValue={"Type your message here!"} />
            </label>
            <br />
            
            <Submit type="submit" value="SUBMIT" style={{
                fontSize: "20px",
                background: "#4d4d4d",
                border: "2px solid black",
                borderRadius: "10px/10px",
                color: "white",
                padding: "15px"
            }} />
            
            </Form>

            

        </Layout>
    )
}

export default Contact

const ContactHeader = styled.h1`
    text-align: center;
    padding-top: 25px;
    font-size: 20px;

    a {
        text-decoration: none;
        color: purple;
        :hover {
            color: red;
        }

        :hover:visited {
            color: red;
        }

        :visited {
            color: purple;
        }
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    text-align: center;

    label {
        font-size: 20px;
        text-align: center;
        padding: 20px;

        input {
            font-size: 20px;
            margin-top: 20px;
            display: block;
            align-items: center;
            width: 420px;
            height: 50px;
            border-radius: 10px/10px;
            padding: 10px;
            border: 2px solid black;
            background: #4d4d4d;
            color: white;
            box-shadow: 0px 0px 10px 5px black;
        }

        textarea {
            margin-top: 20px;
            display: block;
            align-items: center;
            width: 420px;
            height: 250px;
            border-radius: 10px/10px;
            padding: 10px;
            color: white;
            background: #4d4d4d;
            border: 2px solid black;
            box-shadow: 0px 0px 10px 5px black;
            font-size: 20px;
        }
    }
`

const Submit = styled.input`
    box-shadow: 0px 0px 10px 5px black;
    
    :hover {
        cursor: pointer;
        color: white;
    }

`

const HorizontalLine = styled.hr`
    display: block;
    padding: 0;
    height: 2px;
    background-color: #ffff;
    border: none;
    width: 90%;
`