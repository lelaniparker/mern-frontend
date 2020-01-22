import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Blog from "./Blog"
import { MemoryRouter } from "react-router-dom";

// mocking the props being passed in
jest.mock('./Blog', () => ({ blogPosts, loggedInUser }) => "mockComponent")

// builds the Blog component
const buildComponent = () => {
    return(
        <MemoryRouter>
            <Blog />
        </MemoryRouter>
    )
}

// setup variable container to hold our test in
// starts off null, is defined before each test
let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
})

it('renders without crashing', () => {
    act(() => {
        render(buildComponent(), container);
    })
})