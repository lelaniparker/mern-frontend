import React from 'react'
import {Section,Heading,Columns,Image} from "react-bulma-components"
import Axios from "axios";
import { styles } from "../styles";

export class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.mounted = false;
        this.state = {
            vitamins: []
        }
    }

    componentDidMount() {
        Axios.request({
            url: 'https://analyzevit-back.herokuapp.com/data',
        })
            .then(response => {
                this.mounted = true;
                // console.log(response.data)
                this.setState({
                    vitamins: response.data
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        const {vitamins} = this.state
        return(
        <Section>
            <Section>
                <img alt="AnalyzeVit logo" src="analyzevit-logo-transparent.png" style={{height:250}}></img>
                <Heading>Welcome!</Heading>
                <p>At AnalyzeVit, we make it easy to compare the ingredients in your vitamins.</p>
            </Section>

            <Section>
            <form data-cy="new-post-form">
			<label className="label">Enter a Vitamin</label>
			<input type="text" className="input" data-cy="vitamin" name="vitamin" placeholder="Vitamin" required></input>
			<input type="submit" value="Submit" data-cy="post-submit" className="button is-info" style={styles.padding}></input>
            </form>
            </Section>

            <Columns>
            { 
                vitamins.map(vitamin => {
                    return (
                    <Columns.Column>
                        <Heading className="subtitle">
                            Product: <b>{vitamin.productName}</b>
                        </Heading>
                        <Section>
                        <Image src={vitamin.image}/>
                        </Section>
                        <p>Ingredients:</p>
                        {vitamin.vitaminInformation.map((info) => {
                            return (
                                <div>{info.name} – {info.amount}</div>
                            )
                        })}
                    </Columns.Column>
                )})
            }
            </Columns>
        </Section>
        )
    }
}

export default HomePage