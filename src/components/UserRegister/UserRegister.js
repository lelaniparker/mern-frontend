import React, {useState} from "react";
import { registerUser } from "../../services/authServices";
import { styles } from "../styles";
import { Heading, Columns, Section } from 'react-bulma-components';

const RegisterUser = (props) => {

	const [registerError, setRegisterError] = useState(null)
	function handleRegister(event) {
		event.preventDefault()
		const form = event.target
		const username = form.elements.username.value
		const email = form.elements.email.value
		const password = form.elements.password.value

		registerUser({username: username, email: email, password: password}).then((response) => {
			console.log("got response from register user on server:", response)
			props.history.push("/login")
		}).catch((error) => {
			const status = error.response ? error.response.status : 500
			if(status === 409) {
				// This username is already registered. Let the user know.
				setRegisterError("This username already exists. Please login, or specify another username.")
			}
			console.log(`registration failed with error: ${error} and status ${status}`)
		})
	}

	return (
		<Section>
			<Heading size={1}>Register an Account</Heading>
			<Heading subtitle size={5}>Join thousands of others on AnalyzeVit</Heading>
			<Columns>
				<Columns.Column>
					<form onSubmit={handleRegister}>
					{ registerError && <p className="has-text-danger">{ registerError }</p> }

						<label className="label" style={styles.padding}>Username</label>
						<input type="text" className="input" name="username" placeholder="Username" required></input>
						<label className="label" style={styles.padding}>Email address</label>
						<input type="email" className="input" name="email" placeholder="Email" required></input>
						<label className="label" style={styles.padding}>Password</label>
						<input type="password" className="input" name="password" placeholder="Password" required></input>
						<input type="submit" value="Register" className="button is-info" style={styles.padding}></input>
					</form>
				</Columns.Column>
				<Columns.Column>
					<img alt="A healthy person" src="stockimage_person.jpg" style={styles.photo}></img>
				</Columns.Column>
			</Columns>
		</Section>
	)
}

export default RegisterUser