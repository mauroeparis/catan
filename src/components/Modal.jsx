import React, { useContext } from "react";
import PropTypes from "prop-types";

import GameContext from "../GameContext";

function Modal({ disabled, title, body, buttons, showCloseButton }) {
  const { showModal } = useContext(GameContext);
  return (
    <div
      className={`modal ${
        disabled
          ? "opacity-0 overflow-x-hidden overflow-y-visible pointer-events-none"
          : ""
      } fixed w-full h-full top-0 left-0 flex items-center justify-center`}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        {showCloseButton && (
          <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
            <svg
              className="fill-current text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              onClick={() => showModal({ disabled: true })}
            >
              <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
            </svg>
          </div>
        )}

        <div className="modal-content py-4 text-left px-6 font-sans">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold text-black">{title}</p>
            <div className="modal-close cursor-pointer z-50">
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                onClick={() => showModal({ disabled: true })}
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>

          <p className="text-black">{body}</p>

          <div className="flex justify-end pt-2">
            {buttons.map(({ text, callback, primary }) => (
              <button
                key={text}
                className={`px-4 bg-transparent p-3 rounded-lg ${
                  primary
                    ? "bg-blue-800 text-gray-100 hover:bg-blue-900 hover:text-blue-200"
                    : "text-blue-800 bg-gray-200 hover:bg-gray-400"
                } mr-2`}
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
