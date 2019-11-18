import React from "react";
import Road, { BuildRoadIndicator } from "../../../src/components/Road";

jest.mock("react", () => {
  const ActualReact = require.requireActual("react");
  return {
    ...ActualReact,
    useContext: () => ({ gameId: 1, showModal: () => {} }) // what you want to return when useContext get fired goes here
  };
});

describe("Road", () => {
  it("should render", () => {
    const vertices = [{ level: 0, index: 0 }, { level: 0, index: 1 }];
    shallow(<Road vertices={vertices} colour="red" username="foo" />);
  });
});

describe.each([true, false])("BuildRoadIndicator", confirm => {
  it(`can be answered with ${confirm}`, () => {
    const oldConfirm = window.showModal;
    window.showModal = () => confirm;
    const vertices = [{ level: 0, index: 0 }, { level: 0, index: 1 }];
    const wrapper = shallow(<BuildRoadIndicator vertices={vertices} />);
    wrapper.simulate("click");
    window.showModal = oldConfirm;
  });
});
