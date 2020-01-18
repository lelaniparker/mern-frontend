import React, { Fragment } from "react";
import { Section,Image } from "react-bulma-components";
import Axios from "axios";

// need to get id for an individual item

export class Vitamin extends React.Component {
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

    render(){
        const { vitamins } = this.state
        return(
            <Fragment>
                <Section>
                {
                    vitamins.map(vitamin => {
                        return (
                            <Section>
                                <p><b>Product Name:</b><a href={vitamin.link}>{vitamin.productName}</a></p>
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