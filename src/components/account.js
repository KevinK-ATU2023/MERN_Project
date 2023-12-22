// react import 
import { useEffect, useState } from "react";

// react bootstrap imports
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// my components
import Navigation from "./navigation";
import './account.css'
import axios from "axios";

function Account() {
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [account_status_message, setMessage] = useState("")
    const [signed_in_as, setSignedIn] = useState("")

    // api call that determines active account status message
    useEffect(() => {
        axios.get('http://localhost:4000/signin/account')
        .then((res) => {
            if (!res.data.log_in_status) {
                setSignedIn("You are currently not logged in.");
            }
            else {
                setSignedIn(`You are signed in as ${res.data.first_name} ${res.data.last_name}`)
            }
        })
        .catch((e) => {
            console.log(e);
            if(e.code === "ERR_NETWORK") {
                setSignedIn("Server offline")
            }
        })
    })

    let submit_account = (event) =>  {
        event.preventDefault()

        let account = {
            fname: first_name,
            lname: last_name,
        }

        // api call that determines account status message, when user signs in
        axios.post('http://localhost:4000/find/account', account)
        .then((res) => {
            // console.log(res.data)
            setMessage(res.data.account_status_message)
        }).catch((e) => {
            console.log(e)
            if(e.code === "ERR_NETWORK") {
                setMessage("Server offline")
            }
        })

    }

    return(
        <>
            <Navigation />

            {/* active account status (if signed in, or not signed in) */}
            <div className="sign_in_status_container">
                <div className="sign_in_status">
                    <h1>{signed_in_as}</h1>
                </div>
            </div>

            {/* account credentials form */}
            <div className="container">
                <div className="account_form_container">
                    <Form onSubmit={submit_account} className="account_form">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter First name" 
                            value={first_name}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Enter Last name" 
                            value={last_name}
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }} />
                        </Form.Group>
                        <Button variant="outline-light" type="submit">Sign Up / Sign In</Button>
                    </Form>
                    <h4 className="account_status">{account_status_message}</h4>
                </div>
            </div>
        </>
    )
}

export default Account;