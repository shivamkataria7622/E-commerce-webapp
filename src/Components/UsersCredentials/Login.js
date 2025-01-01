
import React, { useState } from 'react'; 
import './Login.css'; // Importing the CSS file
import TitleofuserCredentials from './TitleofuserCredentials';

const LoginForm = () => {
   async function submitHandler(event){
    event.preventDefault();
    let credentials=
    {
      email:prevMail,
      password:prevPassword
    }
    console.log(credentials);
    let response= await fetch("http://192.168.196.239HER:8000/login",{

      method:"POST",
      headers: {
        "Content-Type": "application/json" // Set headers as needed
      },
      body:JSON.stringify(credentials),
      credentials: 'include'
    })
    let data=await response.json();
    console.log(data.jwt_token);
    
  }
  let [prevMail, setMail] = useState('')
  let [prevPassword, setPassword] = useState('');
  function emailHandler(event) {
    setMail(event.target.value);

  }
  function passwordHandler(event) {
    setPassword(event.target.value)
    // console.log(event.target.value);
  }
   return (
    <div className="login-container">
      <div className="login-card">
          <TitleofuserCredentials/>  
             <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Username or Email Address *</label>
            <input className="form-input" type="text" id="email" placeholder="Enter your username or email" required onChange={emailHandler}/>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password *</label>
            <input className="form-input" type="password" id="password" placeholder="Enter your password" required onChange={passwordHandler}/>
          </div>
          <div className="form-footer">
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-label">Remember me</span>
            </label>
            <a href="#" className="forgot-password">Lost your password?</a>
          </div>
          <button className="form-button" type="submit">LOGIN</button>
        </form>
      </div>
    </div>
   
  );
};

export default LoginForm;
