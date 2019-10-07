import React from "react";
import logo from "./logo.svg";
import LobbyList from "./components/LobbyList";

function App() {
  const rooms = [
    {
      id: 1,
      name: "superMegaHyperMegaRed",
      owner: "Julian",
      players: ["Hoyito", "Mayco", "Julian"],
      max_players: 3
    },
    {
      id: 2,
      name: "Omega",
      owner: "Fabricio",
      players: ["Jose", "Pepe", "Fabricio", "Esteban"],
      max_players: 4
    }
  ];

  return (
    <div className="text-center">
      <div
        className="
        flex
        flex-col
        m-6
        p-6
        rounded
        bg-purple-800
        shadow-lg"
      >
        <h1 className="text-white text-3xl">Welcome to React</h1>
        <div className="w-1/2 self-center">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </div>
      <p className="text-base">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <LobbyList rooms={rooms} />
    </div>
  );
}

export default App;
