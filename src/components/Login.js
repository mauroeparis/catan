import React from 'react';

import Background from '../public/img/catan-bg.jpg';

const TextClasses = "text-center text-sm self-center tracking-wider text-bold";
const CommonClasses = "w-5/6 shadow-md rounded h-12";

function CustomInput(props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
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

const bgImage = {
  backgroundImage: `url(${Background})`
};

function LoginPage() {

  return (
    <div className="h-full bg-cover bg-center flex justify-center" style={bgImage}>
      <LoginForm />
    </div>
  );
}

function LoginForm() {

  return (
    <div className="
        h-ful
        md:h-fit
        w-full
        md:w-6/12
        lg:w-4/12
        md:mt-20
        md:rounded-lg
        shadow-lg
        bg-orange-300"
      >
      <h1 className="font-cinzel text-center pt-24 leading-tight text-gray-900">
        <span className="text-xl">The Settlers of</span> <br/>
        <span className="text-5xl font-bold tracking-widest">Catan</span>
      </h1>
      <div className="flex flex-col justify-around mt-16 pb-12">
        <CustomInput type="text" placeholder="USERNAME"/>
        <CustomInput type="password" placeholder="PASSWORD"/>
        <input
          type="button"
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
          <a href="/#" className="text-orange-800 text-center font-medium mt-5 underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  )
}



export default LoginPage;
