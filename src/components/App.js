import React, {
    useReducer,
    useEffect
} from "react";
import {
    Route,
    Redirect,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import { Container } from "react-bulma-components";

// import services functions
import { loginUser, logoutUser, userAuthenticated } from "../services/authServices";
import { getAllBlogPosts } from "../services/blogServices";
import { retrieveUser, postUser } from "../services/userServices";

// import our components for the Switch!
import Nav from "./Nav/Nav";
import HomePage from "./HomePage/HomePage"
import Blog from "./Blog/Blog";
import UserDashboard from "./UserDashboard/UserDashboard";
import UserLogin from "./UserLogin/UserLogin";
import UserRegister from "./UserRegister/UserRegister";
import UserWishlist from "./UserWishlist/UserWishlist";
import stateReducer from "../config/stateReducer"
import Vitamin from "./Vitamin/Vitamin";

// App is our main component. It hosts a lot of state for the components, using a reducer, and it
// also has functions to help with the functionality of the website, particularly the authentication -
// in particular these function also alter the global state
const App = () => {

    // State for the app, using a reducer
    const [loggedInUser, dispatchLoggedInUser] = useReducer(stateReducer, null);
    const [loginError, dispatchLoginError] = useReducer(stateReducer, null);
    const [blogPosts, dispatchBlogPosts] = useReducer(stateReducer, []);
    const [userDetails, dispatchUserDetails] = useReducer(stateReducer, null)

    // handleLogin function is a callback function passed in as props to the Login component
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
                // set the loggedInUser in the global state
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
                // redirect to homepage after user logged in
                props.history.push("/")
            })
            .catch((error) => {
                // if there is an error, this ternary decides which status to display
                const status = error.response ? error.response.status : 500
                console.log(`An error occurred authenticating: ${error} with status: ${status}`)
                // sets the error in global state
                dispatchLoginError({
                    type: "setLoginError",
                    data: "Authentication failed! Check your username and password"
            })
        })
    }

    // Function returns the user's username from the local storage
    function getLoggedInUser() {
        return localStorage.getItem("loggedInUser")
    }

    // Sets the logged in user to local storage, in case a user refreshes their browser - so that they stay logged in.
    // Sets the user ID as well so that the user details can be retrieved from the database if necessary
    function setLoggedInUser(userDetails) {
        userDetails ? localStorage.setItem("userId", userDetails._id) : localStorage.removeItem("useId")
        userDetails ? localStorage.setItem("loggedInUser", userDetails.username) : localStorage.removeItem("loggedInUser")
    }

    // returns the user's id. Useful for making a get request for the rest of the user's details
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
            })
            .catch((error) => {
                console.log(`There was an error trying to fetch a user - error - ${error}`)
            })
    }

    // changes the state for the user logout
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


    // App returns our router which handles the routing of the website and what component to render for each url
    // It renders the navigation up the top of the page.
    // Many components have props passed in, including callback functions
    return (
        <Router>
            <Container>
                <Nav loggedInUser={loggedInUser} />
            <Switch>
                <Route path="/vitamin/:id" component={Vitamin} />
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