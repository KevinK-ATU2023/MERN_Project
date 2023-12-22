import './home.css'

// react imports
import { useState } from "react";

// react bootstrap imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// my components
import Media from './media';

// package imports
import axios from "axios";

function Home() {
    const [media_title, setMediaTitle] = useState("")
    const [media_result, setMediaResult] = useState([])

    // api call that gets results for search
    let search_movie = (title) => {
        axios.get(`https://search.imdbot.workers.dev/?q=${title}`)
        .then((res) => {
            setMediaResult(res.data.description)
        }).catch((error) => {
            console.log(error)
        })
    }

    return(
        <>
            {/* Navigation bar with search input */}
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Entertainment</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/watchlist">WatchList</Nav.Link>
                        <Nav.Link href="/account">Account</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Film or TV"
                            className="me-2"
                            aria-label="Search"
                            onChange={(e) => {setMediaTitle(e.target.value)}}
                            />
                        <Button 
                            variant="outline-light"
                            onClick={(e) => {search_movie(media_title)}}
                        >Search</Button>
                    </Form>
                </Container>
            </Navbar>

            <div className="results">
                <Media results={media_result} />
            </div>
        </>
    )
}

export default Home;