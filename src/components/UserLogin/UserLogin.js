import React from "react";
import { styles } from "../../styles/styles";
import { Heading, Columns, Section } from 'react-bulma-components';

// This functional component handles the user login. It is a form that on submit callsback to the handleLogin function that was passed in as props. If there is an error back from the server, this form will display the error
const UserLogin = (props) => {
    const { handleLogin, loginError } = props

    return (
        <Section>
            <Heading size={1}>Log in</Heading>
			<Heading subtitle size={5}>Welcome back</Heading>
            <Columns>
                <Columns.Column>
                    <form onSubmit={(event) => handleLogin(event, props)}>
                        { loginError && <p className="has-text-danger">{ loginError }</p> }
                        <label className="label" style={styles.padding}>Username</label>
                        <input type="text" className="input" name="username" placeholder="Username" required></input>
                        <label className="label" style={styles.padding}>Password</label>
                        <input type="password" className="input" name="password" placeholder="Password" required></input>
                        <input type="submit" value="Login" className="button is-info" style={styles.padding}></input>
                    </form>
                </Columns.Column>
                <Columns.Column>
					<img alt="A group of happy people" src="stockimage_happypeople.jpg" style={styles.photo}></img>
				</Columns.Column>
            </Columns>
        </Section>
    )
}

export default UserLogin