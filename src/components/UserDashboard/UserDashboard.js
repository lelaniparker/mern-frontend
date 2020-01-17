import React from 'react'
import {
    Link
} from "react-router-dom";
import {Heading,Section,Button} from 'react-bulma-components'

export class UserDashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: null
        }
    }

    render() {
        return(
            <Section>
                <Link to="/wishlist">My Wishlist</Link>
                <Heading>Dashboard</Heading>
                <Heading subtitle size={4}>Update Profile</Heading>
                    <form>
                        <label className="label">Username</label>
                        <input type="text" className="input" name="username" placeholder="Username" required></input>
                        <label className="label">Email</label>
                        <input type="text" className="input" name="email" placeholder="Email" required></input>
                        
                        <Heading subtitle size={4}>Update Password</Heading>
                        
                        <label className="label">Password</label>
                        <input type="text" className="input" name="password" placeholder="Password" required></input>
                        <input type="submit" value="Submit" className="button is-info" style={{marginTop:10}}></input>
                    </form>
                <br />
                <Button>Delete Account</Button>
                
            </Section>
        )
    }
}

export default UserDashboard