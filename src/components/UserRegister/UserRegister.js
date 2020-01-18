import React from "react"
import { registerUser } from "../services/authServices"

const RegisterUser = (props) => {

    function handleRegister(event) {
        console.log("in handleregister")
        event.preventDefault()
        const form = event.target
        const username = form.elements.username.value
        const email = form.elements.email.value
        const password = form.elements.password.value

        // TBD: Register user with server and redirect to login.
        registerUser({ username: username, email: email, password: password }).then((response) => {
            console.log("got response from register user on server:", response)
            props.history.push("/auth/login")
        }).catch((error) => {
            const status = error.response.status
            console.log(`registration failed with error: ${error} and status ${status}`)
        })
    }
}

return (
    <form onSubmit={handleRegister}>
        <label className="label">Username</label>
        <input type="text" className="input" name="username" placeholder="Username" required></input>
        <label className="label">Email address</label>
        <input type="email" className="input" name="email" placeholder="Email" required></input>
        <label className="label">Password</label>
        <input type="password" className="input" name="password" placeholder="Password" required></input>
        <input type="submit" value="Register" className="button is-info"></input>
    </form>
)

export default RegisterUser