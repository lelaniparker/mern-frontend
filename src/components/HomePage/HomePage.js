import React from 'react'
import { Section, Heading, Columns, Image, Level, Box } from "react-bulma-components"
import Axios from "axios";
import { styles } from "../styles";

export class HomePage extends React.Component {
    searchVitamins(event, vitamins) {
        event.preventDefault()
        const form = event.target
        const searchValues = form.elements.vitamin.value.trim().split(" ")
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
        this.setState({ vitaminsToDisplay: allFilteredVitamins })
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
        const { vitamins, vitaminsToDisplay } = this.state
        return (
            <Section>
                <Level>
                    <Level.Item>
                        <img alt="AnalyzeVit logo" src="analyzevit-logo-transparent.png" style={{ height: 250 }}></img>
                    </Level.Item>
                </Level>

                <Level>
                    <Section>
                        <Heading>Welcome!</Heading>
                        <p>At AnalyzeVit, we make it easy to compare the ingredients in your vitamins.</p>
                    </Section>

                    <Level.Item>
                        <Box>
                            <form data-cy="new-post-form" onSubmit={(event) => this.searchVitamins(event, vitamins)}>
                                <label className="label">Enter a Vitamin</label>
                                <input type="text" className="input" data-cy="vitamin" name="vitamin" placeholder="Vitamin" required></input>
                                <input type="submit" value="Submit" data-cy="post-submit" className="button is-info" style={styles.padding}></input>
                            </form>
                        </Box>
                    </Level.Item>
                </Level>

                <Columns>
                    {
                        vitaminsToDisplay.length > 0
                            ? vitaminsToDisplay.map(vitamin => {
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
                            : <p>There are no vitamins that match</p>
                    }
                </Columns>
            </Section>
        )
    }
}

export default HomePage