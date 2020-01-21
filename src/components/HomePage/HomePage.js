import React from 'react'
import { Section, Heading, Columns, Image } from "react-bulma-components"
import Axios from "axios";
import { styles } from "../styles";

export class HomePage extends React.Component {
    searchVitamins(event, vitamins) {
        event.preventDefault()
        const form = event.target
        const searchValues = form.elements.vitamin.value.trim().split(" ")
        console.log("searchvalues", searchValues)
        // update vitaminsToDisplay based on search criteria
        let allFilteredVitamins = [];
        let filteredVitaminsIds = [];
        for (let searchValue of searchValues) {
            let filteredVitamins = vitamins.filter((vitamin) => {
                for (let vitaminInfo of vitamin.vitaminInformation) {
                    if (vitaminInfo.name.toLowerCase().includes(searchValue.toLowerCase()) &&
                        !filteredVitaminsIds.includes(vitamin._id)) {
                        // Don't include the same vitamin twice
                        filteredVitaminsIds.push(vitamin._id)
                        return true
                    }
                }
                return false
            })
            allFilteredVitamins.push(...filteredVitamins)
        }
        console.log("All filitered vitamins", allFilteredVitamins)
        this.setState({ vitaminsToDisplay: allFilteredVitamins })
        console.log("vitamins to display:", this.state.vitaminsToDisplay)
    }

    constructor(props) {
        super(props)
        this.mounted = false;
        this.state = {
            vitamins: [],
            vitaminsToDisplay: []

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
                    vitamins: response.data,
                    vitaminsToDisplay: response.data
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
        const { vitamins,vitaminsToDisplay } = this.state
        return (
            <Section>
                <Section>
                    <img alt="AnalyzeVit logo" src="analyzevit-logo-transparent.png" style={{ height: 250 }}></img>
                    <Heading>Welcome!</Heading>
                    <p>At AnalyzeVit, we make it easy to compare the ingredients in your vitamins.</p>
                </Section>

                <Section>
                    <form data-cy="new-post-form" onSubmit={(event) => this.searchVitamins(event, vitamins)}>
                        <label className="label">Enter a Vitamin</label>
                        <input type="text" className="input" data-cy="vitamin" name="vitamin" placeholder="Vitamin" required></input>
                        <input type="submit" value="Submit" data-cy="post-submit" className="button is-info" style={styles.padding}></input>
                    </form>
                </Section>

                <Columns>
                    {
                        vitaminsToDisplay.map(vitamin => {
                            console.log(vitamin)
                            return (
                                <Columns.Column>
                                    <Heading className="subtitle">
                                        Product: <b>{vitamin.productName}</b>
                                    </Heading>
                                    <Section>
                                        <Image src={vitamin.image} />
                                    </Section>
                                    <p>Ingredients:</p>
                                    {vitamin.vitaminInformation.map((info) => {
                                        return (
                                            <div>{info.name} – {info.amount}</div>
                                        )
                                    })}
                                </Columns.Column>
                            )
                        })
                    }
                </Columns>
            </Section>
        )
    }
}

export default HomePage