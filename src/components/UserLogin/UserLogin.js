import React, { useReducer } from "react";
import { styles } from "../styles";
import { Heading } from 'react-bulma-components';


const UserLogin = (props) => {
    const { handleLogin, loginError } = props

    return (
        <div>
            <Heading>Log In</Heading>
            <form onSubmit={(event) => handleLogin(event, props)}>
                { loginError && <p className="has-text-danger">{ loginError }</p> }
                <label className="label" style={styles.padding}>Username</label>
                <input type="text" className="input" name="username" placeholder="Username" required></input>
                <label className="label" style={styles.padding}>Password</label>
                <input type="password" className="input" name="password" placeholder="Password" required></input>
                <input type="submit" value="Login" className="button is-info" style={styles.padding}></input>
            </form>
        </div>
    )
}

export default UserLogin