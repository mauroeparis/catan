import React from "react";
import PropTypes from "prop-types";

const TextClasses = "text-center text-sm self-center tracking-wider text-bold";
const CommonClasses = "w-5/6 shadow-md rounded h-12";

function CustomInput(props) {
  const { type, placeholder, value, onChange } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        mb-4
        bg-gray-100
        placeholder-gray-600
        ${CommonClasses}
        ${TextClasses}
      `}
    />
  );
}

CustomInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CustomInput;
