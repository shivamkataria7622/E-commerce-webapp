import React, { useState } from 'react';
import './Login.css'; // Changed from Signup.css
import TitleofuserCredentials from './TitleofuserCredentials';

import { API_BASE_URL } from "../../config";
import toast from 'react-hot-toast'; // Added toast import
import { Eye, EyeOff } from 'lucide-react';

const Signup = ({ onSwitchToLogin }) => {
  const [prevName, setName] = useState(''); // Renamed name to prevName
  const [prevMail, setMail] = useState(''); // Renamed email to prevMail, setEmail to setMail
  const [prevPassword, setPassword] = useState(''); // Renamed password to prevPassword
  const [loading, setLoading] = useState(false); // Kept loading state
  const [showPassword, setShowPassword] = useState(false);

  async function submitHandler(event) {
    event.preventDefault();
    setLoading(true); // Kept setLoading(true)

    const newUser = { // Added newUser object
      name: prevName,
      email: prevMail,
      password: prevPassword
    };

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, { // Changed endpoint to /auth/register
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser) // Changed body to newUser
      });

      const data = await response.json();

      if (response.ok) { // Changed condition from data.success to response.ok
        toast.success("Registration Successful! Please login."); // Replaced alert with toast.success
        onSwitchToLogin(); // Simplified onSwitchToLogin call
      } else {
        toast.error(data.message || "Registration failed"); // Replaced alert with toast.error
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during registration."); // Replaced alert with toast.error
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <TitleofuserCredentials />
        {/* <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Register</h3> */}
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full Name *</label>
            <input
              className="form-input"
              type="text"
              id="name"
              placeholder="Enter your full name"
              required
              value={prevName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address *</label>
            <input
              className="form-input"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={prevMail}
              onChange={(e) => setMail(e.target.value)}
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
                value={prevPassword}
                onChange={(e) => setPassword(e.target.value)}
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
              <input type="checkbox" className="checkbox-input" required />
              <span className="checkbox-label">I agree to the terms & conditions</span>
            </label>
          </div>

          <button className="form-button" type="submit" disabled={loading}>
            {loading ? 'REGISTERING...' : 'REGISTER'}
          </button>

          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <span
              style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
              onClick={onSwitchToLogin}
            >
              Already have an account? Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
