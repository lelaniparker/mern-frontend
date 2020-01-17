import React, { Fragment } from "react";
import { Section } from "react-bulma-components";


// need to get id for an individual item

export class Vitamin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: null,
            vitamin: this.mockVitamin
        }
    }

    mockVitamin = {
        "productName": "BIOSOURCE Women's Mega Multivitamin",
        "link": "https://www.priceline.com.au/weight-and-vitamins/vitamins/multivitamins-and-minerals/biosource-women-s-mega-multivitamin-120-capsules",
        "vitaminInformation": [
            {
                "name": "Thiamine hydrochloride",
                "amount": "75mg"
            },
            {
                "name": "Riboflavin",
                "amount": "75mg"
            },
            {
                "name": "Nicotinamide",
                "amount": "75mg"
            },
            {
                "name": "Calcium pantothenate",
                "amount": "69mg"
                        },
            {
                "name": "Pyridoxine hydrochloride",
                "amount": "62mg"
            },
            {
                "name": "Biotin",
                "amount": "100μg"
            },
            {
                "name": "Folic acid",
                "amount": "500μg"
            },
            {
                "name": "Cyanocobalamin",
                "amount": "50μg"
            },
            {
                "name": "Calcium ascorbate dihydrate",
                "amount": "200mg"
            },
            {
                "name": "Colecalciferol (Vitamin D3)",
                "amount": "12.5μg (500IU)"
            },
            {
                "name": "d-alpha-Tocopheryl acid succinate",
                "amount": "41.3mg (50IU)"
            },
            {
                "name": "Inositol",
                "amount": "20mg"
            },
            {
                "name": "Calcium",
                "amount": "40mg"
            },
            {
                "name": "Iron",
                "amount": "5mg"
            },
            {
                "name": "Potassium",
                "amount": "100μg"
            },
            {
                "name": "Magnesium",
                "amount": "20mg"
            },
            {
                "name": "Manganese",
                "amount": "1mg"
            },
            {
                "name": "Chromium",
                "amount": "45μg"
            },
            {
                "name": "Selenium",
                "amount": "26μg"
            },
            {
                "name": "Silicon",
                "amount": "30mg"
            },
            {
                "name": "Zinc",
                "amount": "12mg"
            },
            {
                "name": "Panax ginseng",
                "amount": "5mg"
            }
        ]
    }

    render(){
        const { vitamin } = this.state
        return(
            <Fragment>
                <Section>
                <p><b>Product Name:</b> <a href={vitamin.link}>{vitamin.productName}</a></p>
                <p>{vitamin.vitaminInformation.map((info) => {
                    return(
                        <div>
                            <p><b>Name:</b> {info.name}</p>
                            <p><b>Amount:</b> {info.amount}</p>
                        </div>
                    )
                })}</p>
                </Section>
            </Fragment>
        )
    }
}

export default Vitamin