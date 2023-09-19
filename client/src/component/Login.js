import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password, }))
    const response = await fetch("http://localhost:5000/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })

    const json = await response.json();
    

    if (!json.success) {
      setMessage("Enter valid Credentials")
    } else {
      localStorage.setItem("userEmail", credentials.email)
      localStorage.setItem("authToken", json.authToken)
      if (json.userData.role) {
        localStorage.setItem("role", "admin")
      }

      // Display a success message for 1 second
      setMessage("Successful Login");
      setTimeout(() => {
        setMessage('');
        navigate("/");
      }, 1000);
    }
  }
  

  return (
    <div className="container">
      <h1>Login Page</h1>
      {message && (
  <div className={`alert ${message.includes('Successful Login') ? 'alert-success' : 'alert-danger'}`}>
    {message}
  </div>
)}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        
        
        
          
        
      </form>
    </div>
  );
}

export default LoginPage;
