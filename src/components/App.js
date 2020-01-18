import React, { useState, useReducer, useEffect } from "react";
import {
    Link,
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import stateReducer from "../config/stateReducer"
import Nav from "./Nav/Nav";
import HomePage from "./HomePage/HomePage"
import Blog from "./Blog/Blog";
import BlogPost from "./BlogPost/BlogPost";
import UserDashboard from "./UserDashboard/UserDashboard";
import UserLogin from "./UserLogin/UserLogin";
import UserRegister from "./UserRegister/UserRegister";
import UserWishlist from "./UserWishlist/UserWishlist";
import { Container } from "react-bulma-components";

import Vitamin from "./Vitamin/Vitamin";
import { loginUser, logoutUser } from "../services/authServices";
import { getAllBlogPosts } from "../services/blogServices";

const App = () => {
    const [loggedInUser, dispatchLoggedInUser] = useReducer(stateReducer, null);
    const [loginError, dispatchLoginError] = useReducer(stateReducer, null);
    const [blogPosts, dispatchBlogPosts] = useReducer(stateReducer, [])

     function handleLogin(event, props) {
        event.preventDefault();
        const form = event.target;
        const username = form.elements.username.value
        const password = form.elements.password.value

        loginUser({
            username: username,
            password: password
        })
            .then(() => {
                dispatchLoggedInUser({
                    type: "setLoggedInUser",
                    data: username
                })
                setLoggedInUser(username)
                props.history.push("/")
            })
            .catch((error) => {
                const status = error.response ? error.response.status : 500
                console.log(`An error occurred authenticating: ${error} with status: ${status}`)
                dispatchLoginError({
                    type: "setLoginError",
                    data: "Authentication failed! Check your username and password"
            })
        })
    }

    function setLoggedInUser(user) {
        user ? localStorage.setItem("loggedInUser", user) : localStorage.removeItem("loggedInUser")
    }

    function handleLogout() {
        logoutUser()
        dispatchLoggedInUser({
            type: "setLoggedInUser",
            data:  null
        })
        setLoggedInUser(null)
        return <Redirect to="/" />
    }

    // Fetches blog posts from server and updates state
    function fetchBlogPosts() {
        getAllBlogPosts().then((response) => {
            const allPosts = response
            console.log("all posts from server:", allPosts)
            dispatchBlogPosts ({
                type: "setBlogPosts",
                data: allPosts
                })
            }).catch((error) => {
            console.log(`oops! Something is wrong - check the server. We got an error: ${error}`)
        })
    }

    // Use effect hook to initialise component on mount and when blog posts are updated
	useEffect(()=> {
        // for any initialisation to be performed when component mounts, or on update of state values in the second argument
        fetchBlogPosts()
        // return a function that specifies any actions on component unmount
		return () => {}
	}, [])


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
                <Route path="/register" component={UserRegister} />
                <Route path="/login" render={ (props) => <UserLogin {...props} handleLogin={handleLogin} loginError={loginError} />} />
                <Route path="/logout" render={() => handleLogout()} />
                {/* <Route path="/dashboard/:id" component={UserDashboard} /> */}
                <Route path="/blog/:id" component={BlogPost} />
                <Route path="/blog" render={ (props) => <Blog {...props} blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />
                <Route exact path="/" component={HomePage} />
            </Switch>
            </Container>
        </Router>
    )
}



export default App