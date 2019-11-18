import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import AuthContext from "../AuthContext";

import api from "../Api";
import CustomInput from "./CustomInput";

const TextClasses = "text-center text-sm self-center tracking-wider text-bold";
const CommonClasses = "w-5/6 shadow-md rounded h-12";

function CreateLobbyPage() {
  const { auth } = useContext(AuthContext);
  const [boards, setBoards] = useState([]);
  const history = useHistory();
  const [name, setName] = useState(
    `${_.startCase(auth.user)}'s Lobby #${_.random(1000, 9999)}`
  );
  const [boardId, setBoardId] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await api.boards.all();
      // TODO: Assumes there is always at least one board
      setBoardId(res.data[0].id);
      setBoards(res.data);
    };
    fetchRoom();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const { data: room } = await api.lobbies.create(name, boardId);
      if (room && room.id) history.push(`/lobby/${room.id}`);
      else history.push(`/lobby`);
    } catch (err) {
      alert(`Error: ${err}`);
    }
  };

  return (
    <div className="h-full bg-orange-300">
      <div className="py-5 flex flex-col">
        <h1 className="font-cinzel text-gray-900 text-5xl lg:text-6xl lg:text-bold md:pt-5 lg:pt-5 self-center">
          Create Lobby
        </h1>
        <div className="w-11/12 md:w-8/12 self-center">
          <form
            className="flex flex-col justify-around mt-4 pb-12"
            onSubmit={handleSubmit}
          >
            <CustomInput
              type="text"
              placeholder="LOBBY NAME"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <select
              className="rounded w-5/6 h-12 mb-4 bg-white text-center self-center"
              style={{ "text-align-last": "center" }}
              value={boardId}
              onChange={e => setBoardId(e.target.value)}
            >
              {boards.map(board => (
                <option value={board.id} key={board.id}>
                  {board.name}
                </option>
              ))}
            </select>
            <input
              type="submit"
              value="CREATE LOBBY"
              className={`
                mt-2
                h-12
                bg-blue-800
                text-white
                ${CommonClasses}
                ${TextClasses}
                `}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateLobbyPage;
