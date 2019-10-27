import React from "react";
import _ from "lodash";
import ResourceListContainer from "../../../src/components/ResourceListContainer";

const resources = ["brick", "lumber", "wool", "grain", "ore"];
const amounts = _.countBy(resources);

describe("<ResourceListContainer /> rendering", () => {
  it("should render six <li>", () => {
    const wrapper = shallow(<ResourceListContainer amounts={amounts} />);
    // Expects the app to have exactly 5 hi children
    expect(wrapper.find("li")).toHaveLength(5);
  });

  // TODO : all tests should be something like this
  // it("should find amounts.brick", () => {
  //   const wrapper = shallow(<Container amounts={amounts} />);
  //   // Expects the app to have exactly 5 hi children
  //   expect(wrapper.equals(<li>Brick: `amounts.brick`</li>)).toEqual(true);
  // });

  it("should have correct amount of brick", () => {
    const wrapper = shallow(<ResourceListContainer amounts={amounts} />);
    expect(
      wrapper
        .find("li")
        .children()
        .at(1) // HACK : should find a better way to do this
        .text()
    ).toEqual("1");
  });
  it("should have correct amount of Lumber", () => {
    const wrapper = shallow(<ResourceListContainer amounts={amounts} />);
    expect(
      wrapper
        .find("li")
        .children()
        .at(3) // HACK : should find a better way to do this
        .text()
    ).toEqual("1");
  });
  it("should have correct amount of Wool", () => {
    const wrapper = shallow(<ResourceListContainer amounts={amounts} />);
    expect(
      wrapper
        .find("li")
        .children()
        .at(5) // HACK : should find a better way to do this
        .text()
    ).toEqual("1");
  });
  it("should have correct amount of Grain", () => {
    const wrapper = shallow(<ResourceListContainer amounts={amounts} />);
    expect(
      wrapper
        .find("li")
        .children()
        .at(7) // HACK : should find a better way to do this
        .text()
    ).toEqual("1");
  });
  it("should have correct amount of Ore", () => {
    const wrapper = shallow(<ResourceListContainer amounts={amounts} />);
    expect(
      wrapper
        .find("li")
        .children()
        .at(9) // HACK : should find a better way to do this
        .text()
    ).toEqual("1");
  });

  it("should render one <ul>", () => {
    const wrapper = shallow(<ResourceListContainer amounts={amounts} />);
    expect(wrapper.find("ul")).toHaveLength(1);
  });

  it("should render one <div>", () => {
    // Don't know why with the previous command this doesn't work
    const wrapper = shallow(<ResourceListContainer amounts={amounts} />);
    // Expects the app to have exactly one div children
    expect(wrapper.exists("div")).toEqual(true);
    expect(wrapper.find("div").hasClass("resource-list")).toEqual(true);
    expect(wrapper.filter("div")).toHaveLength(1);
  });
});
