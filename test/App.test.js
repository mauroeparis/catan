import React from "react";
import App from "../src/App";

describe("<Add /> rendering", () => {
  it("should render one <ul>", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.children("ul")).toHaveLength(1);
  });
});
