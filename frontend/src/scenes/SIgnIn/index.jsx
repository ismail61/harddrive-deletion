import React from "react";
import "./index.css";
import { NavLink } from "react-router-dom";

const Signin = () => {
  return (
    <>
      <div className="signup-form">
        <form method="post">
          <h2>Login Portal</h2>
          <p className="hint-text">Reiter</p>

          <div className="form-group">
            <input
              type="email"
              class="form-control"
              name="email"
              placeholder="Email"
              required="required"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
              required="required"
            />
          </div>

          <div className="form-group">
            <button type="submit" class="btn btn-success btn-lg btn-block">
              Log in{" "}
            </button>
          </div>
        </form>
        <div className="text-center">
          Don't have an account?{" "}
          <NavLink to="/signup">
            <b className="hint-text">Sign Up</b>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Signin;
