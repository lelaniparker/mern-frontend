import React, { useState, useReducer, useEffect } from "react";
import {
    Link,
    Route,
    Redirect,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import Nav from "./Nav/Nav";
import HomePage from "./HomePage/HomePage"
import Blog from "./Blog/Blog";
import UserDashboard from "./UserDashboard/UserDashboard";
import UserLogin from "./UserLogin/UserLogin";
import UserRegister from "./UserRegister/UserRegister";
import UserWishlist from "./UserWishlist/UserWishlist";
import { Container } from "react-bulma-components";
import stateReducer from "../config/stateReducer"
import Vitamin from "./Vitamin/Vitamin";
import { loginUser, logoutUser, userAuthenticated } from "../services/authServices";
import { getAllBlogPosts } from "../services/blogServices";
import { retrieveUser, postUser } from "../services/userServices";

const App = () => {
    const [loggedInUser, dispatchLoggedInUser] = useReducer(stateReducer, null);
    const [loginError, dispatchLoginError] = useReducer(stateReducer, null);
    const [blogPosts, dispatchBlogPosts] = useReducer(stateReducer, []);
    const [userDetails, dispatchUserDetails] = useReducer(stateReducer, null)

     function handleLogin(event, props) {
        event.preventDefault();
        const form = event.target;
        const username = form.elements.username.value
        const password = form.elements.password.value

        loginUser({
            username: username,
            password: password
        })
            .then((response) => {
                console.log(response._id)
                dispatchLoggedInUser({
                    type: "setLoggedInUser",
                    data: username
                })
                // set the user details when logged in
                dispatchUserDetails ({
                    type: "setUserDetails",
                    data: response
                })
                setLoggedInUser(response);
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

    function getLoggedInUser() {
        return localStorage.getItem("loggedInUser")
    }

    function setLoggedInUser(userDetails) {
        userDetails ? localStorage.setItem("userId", userDetails._id) : localStorage.removeItem("useId")
        userDetails ? localStorage.setItem("loggedInUser", userDetails.username) : localStorage.removeItem("loggedInUser")
    }
    function getUserId() {
        return localStorage.getItem("userId")
    }

    // Fetches blog posts from server and updates state
    function fetchBlogPosts() {
        getAllBlogPosts()
            .then((response) => {
                const allPosts = response
                dispatchBlogPosts ({
                    type: "setBlogPosts",
                    data: allPosts
                    })
            }).catch((error) => {
                console.log(`oops! Something is wrong while fetching blog posts - check the server. We got an error: ${error}`)
        })
    }

    // gets user details
    function fetchUserDetails() {
        console.log(localStorage.getItem("userId"))
        retrieveUser(getUserId())
            .then((response) => {
                const userDetail = response.data;
                console.log(userDetail)
                console.log(userDetails)
                dispatchUserDetails({
                    type: "setUserDetails",
                    data: userDetail
                });
            })
            .catch((error) => {
                console.log(`There was an error trying to fetch a user - error - ${error}`)
            })
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

    // before a component mounts, these functions take place. This is so that when we render the blog (and try to access other state etc), it is already loaded and we don't get an error that there is no data.
	useEffect(()=> {
        fetchBlogPosts();

        // If we have login information persisted and we're still logged into the server, set the state
        userAuthenticated()
            .then(() => {
                dispatchLoggedInUser({
                    type: "setLoggedInUser",
                    data: getLoggedInUser()
                })
                fetchUserDetails();
            })
            .catch((error) => {
                console.log("got an error trying to check authenticated user:", error)
                setLoggedInUser(null)
                dispatchLoggedInUser({
                    type: "setLoggedInUser",
                    data: null
                })
                dispatchUserDetails ({
                    type: "setUserDetails",
                    data: null
                })
        });

        // this return specifies any actions to occur when the component unmounts
		return () => {}
	}, [])



    return (
        <Router>
            <Container>
                <Nav loggedInUser={loggedInUser} />
            <Switch>
                {/* this should be /vitamin/:id */}
                <Route path="/vitamin/:id" component={Vitamin} />

                {/* This should be wishlist/:id */}
                <Route path="/wishlist/:id" component={UserWishlist} />
                <Route path="/register" component={UserRegister} />
                <Route path="/login" render={ (props) => <UserLogin {...props} handleLogin={handleLogin} loginError={loginError} />} />
                <Route path="/logout" render={() => handleLogout()} />
                <Route path="/dashboard/" render={ (props) => <UserDashboard {...props} userDetails={userDetails} />} />
                <Route path="/blog/:id" render={ (props) => <Blog {...props} blogPosts={blogPosts} loggedInUser={loggedInUser}/> }/>
                <Route path="/blog" render={ (props) => <Blog {...props} blogPosts={blogPosts} loggedInUser={loggedInUser}/> } />
                <Route exact path="/" component={HomePage} />
            </Switch>
            </Container>
        </Router>
    )
}

export default App