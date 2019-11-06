import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../Api";

function Modal({ disabled, title, body, buttons }) {
  return (
    <div className={`modal ${disabled ? "disabled" : ""}`}>
      <button
        className="close"
        type="button"
        onClick={() => console.log("close")}
      >
        ☓
      </button>
      <div className="container">
        <h1>{title}</h1>
        <p>{body}</p>
        <div className="buttons-footer">
          {buttons.map(({ text, callback }) => (
            <button key={text} type="button" onClick={callback}>
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
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired
    })
  )
};

Modal.defaultProps = {
  body: "",
  buttons: []
};

export default Modal;
