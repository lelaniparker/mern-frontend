import React, { Fragment, useState } from "react";
import { Navbar, Container } from "react-bulma-components";
import { Link } from "react-router-dom";

const Nav = (props) => {
    const [active, setActive] = useState(false)
    const { loggedInUser } = props

    function hideMenu() {
        setActive(false)
    }

    function navLoggedIn() {
        return(
            <Fragment>
                <Navbar.Container position="start">
                    <Navbar.Item href="#">Home</Navbar.Item>
                    <Link to="/wishlist">My Wishlist</Link>
                </Navbar.Container>
                <Navbar.Container position="end">
                    <Link to={`/dashboard/`}>Dashboard</Link>
                    {/* <Navbar.Item href={`/wishlist?username=${loggedInUser}`}>My Wishlist</Navbar.Item> CHECKS IF USER IS LOGGED IN TO VIEW WISHLIST */}
                    <Link to="/logout" className="navbar-item" onClick={hideMenu}>Logout</Link>
                    {/* <Navbar.Item href="#">Logout</Navbar.Item> */}
                </Navbar.Container>
            </Fragment>
        )
    }

    function navLoggedOut() {
        return(
            <Fragment>
                <Navbar.Container position="start">
                    <Navbar.Item>
                        <Link to="/"> Home</Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Link to="/blog">Blog</Link>
                    </Navbar.Item>
                    <Navbar.Item>
                        <Link to="/vitamin">Vitamin</Link>
                    </Navbar.Item>
                </Navbar.Container>
                <Navbar.Container position="end">
                    <Link to="/login">Login</Link>
                    <Navbar.Item href="#">Login</Navbar.Item>
                    <Navbar.Item href="#">Register</Navbar.Item>
                </Navbar.Container>
            </Fragment>
        )
    }

    return(
        <Navbar color="info" fixed="top" active={active}>
            <Navbar.Brand>
                <Navbar.Burger onClick={() => {setActive(!active)}} />
            </Navbar.Brand>
             <Navbar.Menu>
                    {/* Render the relevant links depending on whether or not a user is logged in  */}
                    {loggedInUser ? navLoggedIn() : navLoggedOut()}
                </Navbar.Menu>
                <Navbar.Item renderAs="p">{loggedInUser || "guest"}</Navbar.Item>
        </Navbar>
    )
}

export default Nav