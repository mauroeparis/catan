import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

import api from "../Api";
import Background from "../public/img/catan-bg.jpg";
import { TextClasses, CommonClasses } from "./Login";
import CustomInput from "./CustomInput";

function RegisterPage() {
  return (
    <div
      className="h-full bg-cover bg-center flex justify-center"
      style={bgImage}
    >
      <RegisterForm />
    </div>
  );
}

const bgImage = {
  backgroundImage: `url(${Background})`
};

function passIsValid(pass) {
  const passRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
  if (passRegex.test(pass)) {
    return true;
  }
  return false;
}

function RegisterForm() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");
  const history = useHistory();

  const handleSubmit = async event => {
    event.preventDefault();

    if (passIsValid(pass)) {
      if (pass === repeatPass) {
        try {
          await api.auth.register(user, pass);
          history.push("/login");
        } catch (err) {
          console.log(`Error: ${err}`);
          alert("Invalid register info.");
        }
      } else {
        alert("Passwords do not match!");
      }
    } else {
      alert(
        "Password needs to be >8 characters long, have a number and lower and upper case letters"
      );
    }
  };

  return (
    <div className="h-ful md:table w-full md:w-6/12 lg:w-4/12 md:mt-20 md:rounded-lg shadow-lg bg-orange-300">
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
        <CustomInput
          type="password"
          placeholder="REPEAT PASSWORD"
          value={repeatPass}
          onChange={e => setRepeatPass(e.target.value)}
        />
        <input
          type="submit"
          value="REGISTER"
          className={`
            cursor-pointer
            mt-2
            h-12
            bg-blue-800
            text-white
            ${CommonClasses}
            ${TextClasses}
            `}
        />
        <span className="text-orange-800 text-center font-medium mt-5">
          Already have an account?
        </span>
        <input
          type="button"
          onClick={() => {
            history.push("/login");
          }}
          className={`
            mt-1
            h-12
            ${CommonClasses}
            ${TextClasses}
            text-white
            bg-orange-600
            cursor-pointer
            `}
          value="LOGIN"
        />
      </form>
    </div>
  );
}

export default RegisterPage;
