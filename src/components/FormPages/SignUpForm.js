import formStyle from "./formStyle.module.css";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createUserAsync, userSelector, signInWithGoogle } from '../../redux/reducers/userReducer';
import { toast } from "react-toastify";

function SignUpForm () {
  const [values, setValues] = useState({name:"", email:"", pass:"", confirmPass:""});
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  function handleSubmission(e){
    e.preventDefault();
    if(values.pass !== values.confirmPass){
      toast.error("Password and confirm password does not match.");
      return;
    }
    dispatch(createUserAsync(values));
  }

  return (
    <div>
      <div className={formStyle.pageStyle}>
        <h1> Sign Up </h1>

        <form onSubmit={handleSubmission}>
          <input type="name" placeholder="Enter Name" onChange={(e) => setValues((prev) => ({...prev, name:e.target.value}))} required/>
          <input type="email" placeholder="Enter email" onChange={(e) => setValues((prev) => ({...prev, email:e.target.value}))} required/>
          <input type="passwrord" placeholder="Enter password" onChange={(e) => setValues((prev) => ({...prev, pass:e.target.value}))} required/>
          <input type="passwrord" placeholder="Confirm password" onChange={(e) => setValues((prev) => ({...prev, confirmPass:e.target.value}))} required/>
          
          <button> Sign Up </button>
          <button onClick={() => dispatch(signInWithGoogle())}> 
            <span> Sign In with Google </span> 
        </button>
        </form>
      </div>
      
      <div className={formStyle.otherPageLink}><Link to='/signin' className="linkStyle"> Already have an account? Sign in. </Link></div>
    </div>
  )
}

export default SignUpForm;
