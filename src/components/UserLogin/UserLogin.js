import React, { useReducer } from "react";

const UserLogin = (props) => {
    const { handleLogin, loginError } = props

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={(event) => handleLogin(event, props)}>
                { loginError && <p className="has-text-danger">{ loginError }</p> }
                <label className="label">Username</label>
                <input type="text" className="input" name="username" placeholder="Username" required></input>
                <label className="label">Password</label>
                <input type="password" className="input" name="password" placeholder="Password" required></input>
                <input type="submit" value="Login" className="button is-info"></input>
            </form>
        </div>
    )
}

export default UserLogin