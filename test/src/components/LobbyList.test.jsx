import React from "react";
import LobbyList from "../../../src/components/LobbyList";

jest.mock("react", () => ({
  ...jest.requireActual("react"), // use actual for all non-hook parts
  useContext: () => ({
    authDispatch: () => {}
  })
}));

describe("<LobbyList Logout/> rendering", () => {
  it("should render two inputs", () => {
    const wrapper = shallow(<LobbyList />);
    expect(wrapper.find("input")).toHaveLength(2);
  });

  it("should have the correct type", () => {
    const wrapper = shallow(<LobbyList />);
    expect(
      wrapper
        .find("input")
        .at(1)
        .type()
    ).toEqual("input");
  });

  it("should have the correct className", () => {
    const wrapper = shallow(<LobbyList />);
    expect(
      wrapper
        .find("input")
        .at(1)
        .hasClass(
          "mt-2 h-12 bg-blue-800 text-white text-center text-sm self-center tracking-wider text-bold shadow-md rounded h-12"
        )
    ).toEqual(true);
  });

  it("should correctly click the logout button", () => {
    const button = shallow(<LobbyList />);
    button
      .find("input")
      .at(1)
      .simulate("click");
  });
});
