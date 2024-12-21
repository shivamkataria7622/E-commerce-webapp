
import React, { useState } from 'react'; 
import './Signup.css'; // Importing the CSS file
import TitleofuserCredentials from './TitleofuserCredentials';

const Signup = () => {
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
            <label className="form-label" htmlFor="email">Email Address *</label>
            <input className="form-input" type="text" id="email" placeholder="Enter your username or email" required />
          </div>
         
          <div  className='form-span'>
          <span >A password will be sent to your email address.</span>
          <p>Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our Privacy policy.</p>
          <div className="form-footer">
            <label className="checkbox-container">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-label">i agree to the terms & conditions</span>
            </label>
          </div>
          </div>
         
          <button className="form-button">REGISTER</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
