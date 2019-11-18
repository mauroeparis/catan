import React from "react";
import PropTypes from "prop-types";

function Modal({ closeModal, disabled, title, body, buttons }) {
  return (
    <div className={`modal ${disabled ? "disabled" : ""}`}>
      {closeModal && (
        <button
          className="close"
          type="button"
          onClick={() => window.showModal({ disabled: true })}
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
                window.showModal({ disabled: true });
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
  closeModal: PropTypes.bool,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      callback: PropTypes.func
    })
  )
};

Modal.defaultProps = {
  title: "",
  body: "",
  closeModal: false,
  buttons: []
};

export default Modal;
