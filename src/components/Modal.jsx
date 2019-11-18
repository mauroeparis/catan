import React, { useContext } from "react";
import PropTypes from "prop-types";

import GameContext from "../GameContext";

function Modal({ disabled, title, body, buttons, showCloseButton }) {
  const { showModal } = useContext(GameContext);
  return (
    <div className={`modal ${disabled ? "disabled" : ""}`}>
      {showCloseButton && (
        <button
          className="close"
          type="button"
          onClick={() => showModal({ disabled: true })}
        >
          ☓
        </button>
      )}
      <div className="container">
        <h1>{title}</h1>
        <p>{body}</p>
        <div className="buttons-footer">
          {buttons.map(({ text, callback }) => (
            <button
              key={text}
              type="button"
              onClick={() => {
                callback && callback();
                showModal({ disabled: true });
              }}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  disabled: PropTypes.bool.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      callback: PropTypes.func
    })
  ),
  showCloseButton: PropTypes.bool
};

Modal.defaultProps = {
  title: "",
  body: "",
  buttons: [],
  showCloseButton: true
};

export default Modal;
