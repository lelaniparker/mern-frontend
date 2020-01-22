import React from 'react'
import {
    Link
} from "react-router-dom";
import {Heading,Section,Button,Level,Columns, Fragment} from 'react-bulma-components';
import { styles } from "../../styles/styles";

// component displays user dashboard. User details are passed in as props
const UserDashboard = props => {
    const { userDetails } = props

    // At this point in time a visitor to the website could possibly view the dashboard url.
    // If a user sees the page and isn't logged in, these variables wont be loaded, as they
    // would cause an error
    if(userDetails){
        const { username, email, _id } = userDetails
    }

    // If there is a user logged in, this will be rendered
    function userDetailsLoaded() {
        return(
            <Fragment>
                <Level>
                    <Level.Side align="left">
                        <Level.Item>
                            <Heading size={1}>Dashboard</Heading>
                        </Level.Item>
                    </Level.Side>
                    <Level.Side align="right">
                        <Level.Item>
                        <Button><Link to="/wishlist">My Wishlist</Link></Button>
                        </Level.Item>
                    </Level.Side>
                </Level>
                <Heading subtitle size={4}>Update Profile</Heading>
                <Columns>
                    <Columns.Column>
                    <form>
                        <label className="label" style={styles.padding}>Username</label>
                        <input type="text" className="input" name="username" placeholder="Username" required></input>
                        <label className="label" style={styles.padding}>Email</label>
                        <input type="text" className="input" name="email" placeholder="Email" required></input>
                        <label className="label" style={styles.padding}>Password</label>
                        <input type="text" className="input" name="password" placeholder="Password" required></input>
                        <input type="submit" value="Submit" className="button is-info" style={styles.padding}></input>
                    </form>
                    <Button color="danger" style={styles.padding}>Delete Account</Button>
                    </Columns.Column>
                    <Columns.Column>
                    </Columns.Column>
                </Columns>
            </Fragment>
        )
    }

    // If no user is logged in, this will render
    function noUser() {
        return(
            <p>Login to view your dashboard</p>
        )
    }

    // ternary that checks if the userDetails are loaded
    return(
        <Section>
            { userDetails ? userDetailsLoaded() : noUser() }


        </Section>
    )

}

export default UserDashboard