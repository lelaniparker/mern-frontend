import React, { Component } from "react";
import {
    Link,
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import Nav from "./Nav/Nav";
import HomePage from "./HomePage/HomePage"
import Blog from "./Blog/Blog";
import BlogPost from "./BlogPost/BlogPost";
import UserDashboard from "./UserDashboard/UserDashboard";
import UserLogin from "./UserLogin/UserLogin";
import UserRegister from "./UserRegister/UserRegister";
import UserWishlist from "./UserWishlist/UserWishlist";
import {Container} from "react-bulma-components";

import Vitamin from "./Vitamin/Vitamin";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: null
        }
    }

    // Get loggedInUser from localStorage
    getLoggedInUser() {
        return localStorage.getItem("loggedInUser")
    }

    // Store loggedInUser username in local storage
    setLoggedInUser(user) {
        user ? localStorage.setItem("loggedInUser", user) : localStorage.removeItem("loggedInUser")
    }


    // handles login
	// TODO: refactor to function as callback passed to SignIn form component
	// 	- get username and password from form event
	//	- authenticate with express server
	// 	- update loginError in state if there is one and re-render SignIn form component
	//	- update loggedInUser if successful (and save to local storage)
	handleLogin(event, props) {
		event.preventDefault()
		const form = event.target
		const username = form.elements.username.value
		const password = form.elements.password.value
		// TBD: Authenticate with server. If successful:
		dispatchLoggedInUser({
			type: "setLoggedInUser",
			data: username
		})
		setLoggedInUser(username)
		props.history.push("/posts")
	}

    render() {
        const { loggedInUser } = this.state
        return (
            <Router>
                <Container>
                    <Nav loggedInUser={loggedInUser} />
                    <Link to="/blog">Blog</Link>
                    <br />
                    <Link to="/vitamin">Vitamin</Link>
                    <br />
            <Link to="/wishlist">My Wishlist</Link>

                <Switch>
                    {/* this should be /vitamin/:id */}
                    <Route path="/vitamin/" component={Vitamin} />

                    {/* This should be wishlist/:id */}
                     <Route path="/wishlist/" component={UserWishlist} />
                    {/*<Route path="/register" component={UserRegister} />*/}
                    <Route path="/login" component={UserLogin} />
                    <Route path="/dashboard/:id" component={UserDashboard} />
                    <Route path="/blog/:id" component={BlogPost} />
                    <Route path="/blog" component={Blog} />
                    <Route exact path="/" component={HomePage} />
                </Switch>
                </Container>
            </Router>
        )
    }
}

export default App