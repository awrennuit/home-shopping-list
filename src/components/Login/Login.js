import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { loginUser } from "../../firebase";
import { Context } from "../App/App";
import "./Login.css";

export default function Login() {
  const history = useHistory();
  const { state, dispatch } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const res = await loginUser(email, password);
    if (res.user.email) {
      localStorage.setItem('user', res.user.email);
      dispatch({ type: `SET_USER`, payload: res.user.email });
      history.push("/hub");
    } else {
      alert("Email or Password incorrect. Did you sign up?");
    }
  }

  return (
    <div className="login-container">
      <h1>
        <span className="hub-heading">⋆｡*ﾟ✲* </span>
        Login
        <span className="hub-heading"> *✲ﾟ*｡⋆</span>
      </h1>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="input-container">
          <label className="login-label">Email </label>
          <input
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label className="login-label">Password </label>
          <input
            type="text"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
