import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { act } from "react-dom/test-utils";

it("renders without crashing", () => {
    const div = document.createElement('div');
    act(() => {
        ReactDom.render(<App />, div);
    })
    ReactDom.unmountComponentAtNode(div);
});