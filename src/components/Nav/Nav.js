import React, { Component, Fragment } from "react";
import { Navbar, Container } from "react-bulma-components";
import { Link } from "react-router-dom";

// The Nav component renders the nav bar at the top of the page
// It is a class component because it requires state to manage the hamburger menu toggle
class Nav extends Component {
    constructor(props) {
		super(props)
		this.state = {
			active: false
		}
    }

    // handleClick is used to toggle the active state of the hamburger menu
    handleClick = () => {
        const { active } = this.state
        this.setState({ active: !active })
    }

    navLoggedIn = () => {
        return (
            <Fragment>
                <Navbar.Container position="start">
                            <Navbar.Item href="#">Home</Navbar.Item>
                            <Navbar.Item href="#">My Wishlist</Navbar.Item>
                </Navbar.Container>
                <Navbar.Container position="end">
                    <Link to={`/dashboard/`}>Dashboard</Link>
                    <Navbar.Item href="#">Logout</Navbar.Item>
                </Navbar.Container>
            </Fragment>
        )
    }

    navLoggedOut = () => {
        return (
            <Fragment>
                <Navbar.Container position="start">
                    <Link to="/"> Home</Link>
                </Navbar.Container>
                <Navbar.Container position="end">
                        <Navbar.Item href="#">Login</Navbar.Item>
                        <Navbar.Item href="#">Register</Navbar.Item>
                </Navbar.Container>
            </Fragment>
        )
    }

    render() {
        // active is stored in state, and used to toggle the hamburger menu
        const { active } = this.state
        const { loggedInUser } = this.props
        return (
            <Navbar color="info" fixed="top"  active={active}>
                <Container>
                    <Navbar.Menu>
                        {/* Render the relevant links depending on whether or not a user is logged in */}
                        {loggedInUser ? this.navLoggedIn() : this.navLoggedOut()}
                        <Navbar.Brand>
                        <Navbar.Item renderAs="p">{loggedInUser || "guest"}</Navbar.Item>
                        <Navbar.Burger onClick={this.handleClick} />
                        </Navbar.Brand>
                    </Navbar.Menu>
                </Container>
            </Navbar>
        )
    }
}
export default Nav