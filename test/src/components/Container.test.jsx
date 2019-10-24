import React from "react";
import _ from "lodash";
import Container from "../../../src/components/Container";

const resources = ["brick", "lumber", "wool", "grain", "ore"];
const amounts = _.countBy(resources);

describe("<Container /> rendering", () => {
  it("should render six <li>", () => {
    const wrapper = shallow(<Container amounts={amounts} />);
    // Expects the app to have exactly 6 h1 children
    expect(wrapper.find("ul")).toHaveLength(1);
    expect(wrapper.find("li")).toHaveLength(5);
  });

  it("should render one <div>", () => {
    // Don't know why with the previous command this doesn't work
    const wrapper = shallow(<Container amounts={amounts} />);
    // Expects the app to have exactly one div children
    expect(wrapper.exists("div")).toEqual(true);
    expect(wrapper.find("div").hasClass("resource-list")).toEqual(true);
    expect(wrapper.filter("div")).toHaveLength(1);
  });
});
