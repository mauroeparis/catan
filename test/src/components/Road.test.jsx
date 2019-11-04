import React from "react";
import Road from "../../../src/components/Road";

describe("Road", () => {
  it("should render", () => {
    const vertices = [{ level: 0, index: 0 }, { level: 0, index: 1 }];
    shallow(<Road vertices={vertices} colour="red" username="foo" />);
  });
});
