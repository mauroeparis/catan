import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect, useHistory } from "react-router-dom";

import api from "../Api";
import Background from "../public/img/catan-bg.jpg";

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

const bgImage = {
  backgroundImage: `url(${Background})`
};

function LoginPage() {
  return (
    <div
      className="h-full bg-cover bg-center flex justify-center"
      style={bgImage}
    >
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const res = await api.login(user, pass);
      const { token } = res.data;
      localStorage.setItem("token", token);
      history.push("/lobbyList");
    } catch (err) {
      console.log(`Error: ${err}`);
      alert("Invalid login of password");
    }
  };

  return (
    <div className="h-ful md:h-fit w-full md:w-6/12 lg:w-4/12 md:mt-20 md:rounded-lg shadow-lg bg-orange-300">
      {localStorage.token && <Redirect to="/lobbyList" />}
      <h1 className="font-cinzel text-center pt-24 leading-tight text-gray-900">
        <span className="text-xl">The Settlers of</span>
        <br />
        <span className="text-5xl font-bold tracking-widest">Catan</span>
      </h1>
      <form
        className="flex flex-col justify-around mt-16 pb-12"
        onSubmit={handleSubmit}
      >
        <CustomInput
          type="text"
          placeholder="USERNAME"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
        <CustomInput
          type="password"
          placeholder="PASSWORD"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <input
          type="submit"
          value="LOGIN"
          className={`
            mt-2
            h-12
            bg-blue-800
            text-white
            ${CommonClasses}
            ${TextClasses}
            `}
        />
        <span className="text-orange-800 text-center font-medium mt-5">
          Don’t have an account yet?
        </span>
        <input
          type="button"
          className={`
            mt-1
            h-12
            ${CommonClasses}
            ${TextClasses}
            text-white
            bg-orange-600
            `}
          value="REGISTER"
        />
        <div className="w-5/6 self-center pt-6">
          <a
            href="/#"
            className="text-orange-800 text-center font-medium mt-5 underline"
          >
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;