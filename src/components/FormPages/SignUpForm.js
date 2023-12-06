// SignUpForm.js

import formStyle from "./formStyle.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  createUserAsync,
  userSelector,
  signInWithGoogle,
} from "../../redux/reducers/userReducer";
import { toast } from "react-toastify";

function SignUpForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
  });
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  function handleSubmission(e) {
    e.preventDefault();
    if (values.pass !== values.confirmPass) {
      toast.error("Password and confirm password do not match.");
      return;
    }
    dispatch(createUserAsync(values));
  }

  return (
    <div>
      <div className={formStyle.pageStyle}>
        <h1> Sign Up </h1>
        <form onSubmit={handleSubmission}>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <input
            type="email"
            placeholder="Enter email"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, pass: e.target.value }))
            }
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            onChange={(e) =>
              setValues((prev) => ({ ...prev, confirmPass: e.target.value }))
            }
            required
          />
          <button type="submit" className={formStyle.signUpButton}>
            Sign Up
          </button>
          <button
            style={{ background: "red" }}
            type="button"
            onClick={() => dispatch(signInWithGoogle())}
          >
            Sign In with Google
          </button>
        </form>
      </div>
      <div className={formStyle.otherPageLink}>
        Already have an account? : &nbsp;
        <Link
          to="/signin"
          className={`linkStyle ${
            window.location.pathname === "/signin" ? "active" : ""
          }`}
        >
          Sign in.
        </Link>
      </div>
    </div>
  );
}

export default SignUpForm;
