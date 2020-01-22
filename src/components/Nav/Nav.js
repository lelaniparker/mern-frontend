import React, { Fragment, useState } from "react";
import { Navbar, Container } from "react-bulma-components";
import { Link } from "react-router-dom";

// Nav is a functional component that displays the navbar.
const Nav = (props) => {
    // Active is used to see if the menu should be collapsed or not in mobile view.
    const [active, setActive] = useState(false)
    // A different menu is shown if a user is logged in
    const { loggedInUser } = props

    // The menu is hidden after a click on mobile view
    function hideMenu() {
        setActive(false)
    }

    // When the user is logged in, this menu is displayed. It shows the user dashboard and wishlist, as well
    // as the logout link
    function navLoggedIn() {
        return(
            <Fragment>
                <Navbar.Container position="start">
                    <Navbar.Item><Link to="/">Home</Link></Navbar.Item>
                    <Navbar.Item><Link to="/wishlist">My Wishlist</Link></Navbar.Item>
                    <Navbar.Item><Link to="/blog">Blog</Link></Navbar.Item>
                </Navbar.Container>
                <Navbar.Container position="end">
                    <Navbar.Item><Link to={`/dashboard/`}>Dashboard</Link></Navbar.Item>
                    {/* <Navbar.Item href={`/wishlist?username=${loggedInUser}`}>My Wishlist</Navbar.Item> CHECKS IF USER IS LOGGED IN TO VIEW WISHLIST */}
                    <Link to="/logout" className="navbar-item" onClick={hideMenu}>Logout</Link>
                </Navbar.Container>
            </Fragment>
        )
    }

    // When a user is logged out, it will display the menu where I user can log in or register
    function navLoggedOut() {
        return(
            <Fragment>
                <Navbar.Container position="start">
                    <Navbar.Item><Link to="/">Home</Link></Navbar.Item>
                    <Navbar.Item><Link to="/blog">Blog</Link></Navbar.Item>
                </Navbar.Container>
                <Navbar.Container position="end">
                    <Navbar.Item><Link to="/login">Log in</Link></Navbar.Item>
                    <Navbar.Item><Link to="/register">Register</Link></Navbar.Item>
                </Navbar.Container>
            </Fragment>
        )
    }

    // The return function shows which nav bar, depending on if the user is logged in or not. When the
    // menu is clicked when it is in mobile view, it is closed by the setActive()
    // The navbar will also either display the logged in user's username or the word "guest" if no one is logged in
    return(
        <Navbar color="light" fixed="top" active={active}>
            <Container>
                <Navbar.Brand>
                    <Navbar.Burger onClick={() => {setActive(!active)}} />
                </Navbar.Brand>
                <Navbar.Menu>
                    {/* Render the relevant links depending on whether or not a user is logged in  */}
                    {loggedInUser ? navLoggedIn() : navLoggedOut()}
                    <Navbar.Item renderAs="p">{loggedInUser || "guest"}</Navbar.Item>
                </Navbar.Menu>
            </Container>
        </Navbar>
    )
}

export default Nav