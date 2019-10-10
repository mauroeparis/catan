import React from "react";
import App from "../src/App";

describe("<App /> rendering", () => {
  it("should render one <ul>", () => {
    const wrapper = shallow(<App />);
    // Expects the app to have exactly one div children
    expect(wrapper.children("div")).toHaveLength(1);
  });
});
