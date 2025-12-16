import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import TitleofuserCredentials from './TitleofuserCredentials';
import Nav from '../Navbar/Nav';
import Footer from '../Footer/Footer';
import { API_BASE_URL } from "../../config";
import Signup from './Signup';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/profile');
    }
  }, [navigate]);

  const [prevMail, setMail] = useState('');
  const [prevPassword, setPassword] = useState('');

  const toggleForm = () => setIsLogin(!isLogin);

  async function submitHandler(event) {
    event.preventDefault();
    const credentials = {
      email: prevMail,
      password: prevPassword
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });

      const data = await response.json();

      if (data.success || data.jwt_token) {
        localStorage.setItem('token', data.jwt_token || data.token);
        toast.success('Login Successful!');
        navigate('/profile');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login.");
    }
  }

  function emailHandler(event) {
    setMail(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  return (
    <div>
      <Nav />
      {isLogin ? (
        <div className="login-container">
          <div className="login-card">
            <TitleofuserCredentials />
            {/* <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: '#555' }}>Login</h3> */}
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Username or Email Address *</label>
                <input
                  className="form-input"
                  type="text"
                  id="email"
                  placeholder="Enter your username or email"
                  required
                  onChange={emailHandler}
                  value={prevMail}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">Password *</label>
                <div className="password-input-wrapper">
                  <input
                    className="form-input"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    required
                    onChange={passwordHandler}
                    value={prevPassword}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="form-footer">
                <label className="checkbox-container">
                  <input type="checkbox" className="checkbox-input" />
                  <span className="checkbox-label">Remember me</span>
                </label>
                <a href="#" className="forgot-password">Lost your password?</a>
              </div>
              <button className="form-button" type="submit">LOGIN</button>

              <div style={{ marginTop: '1.5rem', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                <p style={{ marginBottom: '0.5rem' }}>Don't have an account?</p>
                <span
                  style={{
                    cursor: 'pointer',
                    color: '#333',
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                  }}
                  onClick={toggleForm}
                >
                  Register New Account
                </span>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Signup onSwitchToLogin={toggleForm} />
      )}
      <Footer />
    </div>
  );
};

export default LoginForm;
