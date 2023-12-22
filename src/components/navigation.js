// react bootstrap imports necessary 
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
    return(
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Entertainment</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/watchlist">WatchList</Nav.Link>
                    <Nav.Link href="/account">Account</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation;