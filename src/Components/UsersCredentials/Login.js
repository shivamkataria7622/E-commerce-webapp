
import React, { useState } from 'react'; 
import './Login.css'; // Importing the CSS file
import TitleofuserCredentials from './TitleofuserCredentials';

const LoginForm = () => {
  function submitHandler(event){
    event.preventDefault();
    let credentials=
    {
      Mail:prevMail,
      Password:prevPassword
    }
    console.log(credentials);
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
             <form>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Username or Email Address *</label>
            <input className="form-input" type="text" id="email" placeholder="Enter your username or email" required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password *</label>
            <input className="form-input" type="password" id="password" placeholder="Enter your password" required />
          </div>
          <div className="form-footer">
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-label">Remember me</span>
            </label>
            <a href="#" className="forgot-password">Lost your password?</a>
          </div>
          <button className="form-button">LOGIN</button>
        </form>
      </div>
    </div>
   
  );
};

export default LoginForm;
