import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CatanTypes from "../CatanTypes";

function BankTradeComp({ resources }) {
  const amounts = _.countBy(resources);
  const availableButtons = _.pickBy(amounts, x => x >= 4);
  const refreshButtons = _.keys(availableButtons);

  const currentResource = [];
  const buttonTable = {
    brick: true,
    lumber: true,
    wool: true,
    grain: true,
    ore: true
  };

  function pushResource(value) {
    currentResource.length = 0;
    currentResource.push(value);
    return currentResource;
  }

  function disableButtons(manyResources, table) {
    manyResources.forEach(res => (table[res] = false));
    return table;
  }

  const newButtonTable = disableButtons(refreshButtons, buttonTable);

  // Falta deshabilitar los botones que no se puedan usar usando availableButtons
  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => pushResource("brick")}
          disabled={newButtonTable.brick}
        >
          Give Brick
        </button>
        <button
          type="button"
          onClick={() => pushResource("lumber")}
          disabled={newButtonTable.lumber}
        >
          Give Lumber
        </button>
        <button
          type="button"
          onClick={() => pushResource("wool")}
          disabled={newButtonTable.wool}
        >
          Give Wool
        </button>
        <button
          type="button"
          onClick={() => pushResource("Grain")}
          disabled={newButtonTable.grain}>
          Give Grain
        </button>
        <button
          type="button"
          onClick={() => pushResource("Ore")}
          disabled={newButtonTable.ore}>
          Give Ore
        </button>
      </div>
      <div>
        <button type="button" onClick={() => pushResource("brick")}>
          Get Brick
        </button>
        <button type="button" onClick={() => pushResource("lumber")}>
          Get Lumber
        </button>
        <button type="button" onClick={() => pushResource("wool")}>
          Get Wool
        </button>
        <button type="button" onClick={() => pushResource("Grain")}>
          Get Grain
        </button>
        <button type="button" onClick={() => pushResource("Ore")}>
          Get Ore
        </button>
      </div>
      <div>
        <button type="button" onClick={() => alert("accept")}>
          Accept
        </button>
        <button type="button" onClick={() => alert("cancel")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

BankTradeComp.propTypes = {
  resources: PropTypes.arrayOf(CatanTypes.Resource).isRequired
};

export default BankTradeComp;
