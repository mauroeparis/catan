import React from 'react';
import rooms from '../rooms.json'


function App() {

  function sayAlert() {
    alert("hola");
  }


    return (
      <div>
        <div class="flex">
    <div class="w-1/6 bg-blue-300 h-12 text-center">{"id"}</div>
    <div class="w-1/6 bg-blue-300 h-12 text-center">{"name"}</div>
    <div class="w-1/6 bg-blue-300 h-12 text-center">{"owner"}</div>
    <div class="w-1/6 bg-blue-300 h-12 text-center">{"players"}</div>
    <div class="w-1/6 bg-blue-300 h-12 text-center">{"max_players"}</div>
    <div class="w-1/6 bg-blue-300 h-12 text-center">{"Join button"}</div>
  </div>
      {rooms.map((room, index) => {
        return <div>

              <div class="flex ">
  <div class="w-1/6 bg-yellow-300 h-12 text-center">
    {room.id}
</div>
  <div class="w-1/6 bg-yellow-300 h-12 text-center">
    {room.name}
</div>
  <div class="w-1/6 bg-yellow-300 h-12 text-center">
    {room.owner}
  </div>
  <div class="w-1/6 bg-yellow-300 h-12 text-center">
    {room.players}
  </div>
  <div class="w-1/6 bg-yellow-300 h-12 text-center">
    {room.max_players}
  </div>
  <div class="w-1/6 bg-yellow-300 h-12 text-center ">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 m-2 rounded" onClick={sayAlert}>
    Join Game
  </button>
  </div>
</div>

</div>
        })}
      </div>

    );
  }
export default App;
