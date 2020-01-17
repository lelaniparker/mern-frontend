import React from "react"

const UserLoginIn = () => {

    return (
        <form>
            <label className="label">Username</label>
            <input type="text" className="input" name="username" placeholder="Username" required></input>
            <label className="label">Password</label>
            <input type="password" className="input" name="password" placeholder="Password" required></input>
            <input type="submit" value="Login" className="button is-info"></input>
        </form>
    )
}

export default UserLoginIn