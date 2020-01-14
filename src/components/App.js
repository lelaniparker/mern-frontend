import React,{Component} from "react"
import Nav from "./Nav"

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
            <Nav loggedInUser = {loggedInUser}/>
        )
    }
}

export default App