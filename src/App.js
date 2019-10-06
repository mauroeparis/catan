import React from 'react';
import logo from './logo.svg';

function App() {
  return (
    <div class="text-center">
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
    </div>
  );
}

export default App;
