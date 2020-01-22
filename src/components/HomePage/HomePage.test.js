import React from 'react';
import "./HomePage";
import HomePage, { searchVitamins } from "./HomePage";
import * as vitamins from "../../tests/vitamin_test_data.json"
import { MemoryRouter } from "react-router-dom";
import { unmountComponentAtNode, render } from "react-dom";
import { act } from "@testing-library/react";

const event = {
    target: "k1"
}
// builds the HomePage component
const buildComponent = () => {
    return(
        <MemoryRouter>
            <HomePage />
        </MemoryRouter>
    )
}

// container to hold our test component
let container = null;

beforeEach(() => {
    // setting up DOM element as render target
    container = document.createElement("div");
    document.body.appendChild(container)
});

afterEach(() => {
    // cleanup after each test
    unmountComponentAtNode(container)
    container.remove();
    container = null;
});

describe('it renders without crashing', () => {
    it('renders the component', () => {
        act(() => {
            render(buildComponent(), container);
        })
    })
})

// describe('it renders a header')