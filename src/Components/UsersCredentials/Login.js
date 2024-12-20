import React, { useState } from 'react'

import './Login.css'

function Login() {
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
    <div className='Login'>
      <div className='LoginCont'>
        <h1 className='LoginText'>Login</h1>

        <div className='Form' >
          <form onSubmit={submitHandler}>
            <label for='email'>Email</label>
            <input type='email' id='email' name='email' placeholder='Enter your email' required onChange={emailHandler}></input>
            <label for='password'>Password</label>
            <input type='password' id='password' name='password' placeholder='Enter your password' required onChange={passwordHandler} />
            <button type='submit'>Login</button>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
