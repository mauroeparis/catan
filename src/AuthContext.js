import { createContext } from "react";

const AuthContext = createContext(null);

export function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.token);
      localStorage.setItem("user", action.user);
      return { token: action.token, user: action.user };
    case "LOGOUT":
      delete localStorage.token;
      delete localStorage.user;
      return { token: null, user: null };
    default:
      throw new Error();
  }
}

export default AuthContext;
