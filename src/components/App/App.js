import React,{Component} from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import Nav from "../Nav/Nav";
import HomePage from "../HomePage/HomePage"
import Blog from "../Blog/Blog";
import BlogPost from "../BlogPost/BlogPost";
import UserDashboard from "../UserDashboard/UserDashboard";
import UserLogin from "../UserLogin/UserLogin";
import UserRegister from "../UserRegister/UserRegister";
import UserWishlist from "../UserWishlist/UserWishlist";

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: null
        }
    }
    render() {
        const {loggedInUser} = this.state
        return (
            <Router>
                <Nav loggedInUser={loggedInUser} />

                <Switch>
                    <Route path="/wishlist/:id" component={UserWishlist} />
                    <Route path="/register" component={UserRegister} />
                    <Route path="/login" component={UserLogin} />
                    <Route path="/dashboard/:id" component={UserDashboard} />
                    <Route path="/blog/:id" component={BlogPost} />
                    <Route path="/blog" component={Blog} />
                    <Route exact path="/" component={HomePage} />
                </Switch>

            </Router>
        )
    }
}

export default App