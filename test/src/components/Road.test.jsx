import React from "react";
import Road, { BuildRoadIndicator } from "../../../src/components/Road";

describe("Road", () => {
  it("should render", () => {
    const vertices = [{ level: 0, index: 0 }, { level: 0, index: 1 }];
    shallow(<Road vertices={vertices} colour="red" username="foo" />);
  });
});

describe.each([true, false])("BuildRoadIndicator", confirm => {
  it("should render", () => {
    const oldConfirm = window.confirm;
    window.confirm = () => confirm;
    const vertices = [{ level: 0, index: 0 }, { level: 0, index: 1 }];
    const wrapper = shallow(<BuildRoadIndicator vertices={vertices} />);
    wrapper.simulate("click");
    window.confirm = oldConfirm;
  });
});
