import React from 'react'
import { Section, Heading, Columns, Image, Level, Box } from "react-bulma-components"
import Axios from "axios";
import { styles } from "../../styles/styles";

// HomePage is a class component.
export class HomePage extends React.Component {
    // Function searches through all vitamins and returns array of vitamins that match search terms
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
            // spreading out the filteredVitamins so they are pushed individually to the allFilteredVitamins array
            allFilteredVitamins.push(...filteredVitamins)
        }
        this.setState({ vitaminsToDisplay: allFilteredVitamins })
    }

    // constructor for the class component. vitamins is an array of all the vitamins from the server's database.
    // vitaminsToDisplay is the filtered vitamin's from the user's search.
    constructor(props) {
        super(props)
        this.mounted = false;
        this.state = {
            vitamins: [],
            vitaminsToDisplay: []

        }
    }

    // Once the component has mounted, it makes an axios request to get all the vitamins from the server/database.
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

    // When the component unmounts, mounted is set to false
    componentWillUnmount() {
        this.mounted = false;
    }

    // currently the component will show all the vitamins in the database, and will filter these based on the search results.
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
                                <label className="label">Search for a Vitamin</label>
                                <input type="text" className="input" data-cy="vitamin" name="vitamin" placeholder="e.g. B12" required></input>
                                <input type="submit" value="Submit" data-cy="post-submit" className="button is-info" style={styles.padding}></input>
                            </form>
                        </Box>
                    </Level.Item>
                </Level>

                <Columns>
                    {/* If there are no results, a message displays to say there were no matches.
                    Otherwise, here the vitamins from the search results are displayed.
                    The vitamins are iterated over with the map function */}
                    {
                        vitaminsToDisplay.length > 0
                            ? vitaminsToDisplay.map(vitamin => {
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