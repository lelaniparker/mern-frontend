import React, { Fragment } from "react";
import { Section,Image } from "react-bulma-components";
import Axios from "axios";

// Class component to display the vitamin data from the server. On load it loads an empty array as it has not yet gotten the data back from the server
export class Vitamin extends React.Component {
    constructor(props) {
        super(props)
        this.mounted = false;
        this.state = {
            vitamins: []
        }
    }

    // Once the component mounts, an axios request is made to receive the vitamin data, which is then passed to the state of the component.
    componentDidMount() {
        Axios.request({
            url: 'https://analyzevit-back.herokuapp.com/data',
        })
            .then(response => {
                this.mounted = true;
                this.setState({
                    vitamins: response.data
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    // Once the component unmounts, the component is set to mounted = false
    componentWillUnmount() {
        this.mounted = false;
    }

    // As the data is an array, the render function must iterate over each element with the .map() function. There is also another array within the data for the vitaminInformation, so this too is iterated over, to display all the ingredients of the vitamins. 
    render(){
        const { vitamins } = this.state
        return(
            <Fragment>
                <Section>
                {
                    vitamins.map(vitamin => {
                        return (
                            <Section>
                                <p><b>Product Name:</b>{vitamin.productName}</p>
                                <Image src={vitamin.image}/>
                                {vitamin.vitaminInformation.map((info) => {
                                    return (
                                        <div>
                                            <p><b>Name:</b> {info.name}</p>
                                            <p><b>Amount:</b> {info.amount}</p>
                                        </div>
                                    )
                                })}
                            </Section>
                        )
                    })
                }
                </Section>
            </Fragment>
        )
    }
}

export default Vitamin