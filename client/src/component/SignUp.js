import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const data = {
    username: '',
    email: '',
    password: '',
    phone: '',
  };

  const [credentials, setCredentials] = useState(data);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(credentials));

    try {
      const response = await fetch('http://localhost:5000/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.status === 200) {
        const json = await response.json();
        if (json.success) {
          setMessage('Successful registration');

          // Clear the message after 1 second
          setTimeout(() => {
            setMessage('');
            navigate('/login'); 
          }, 1000);
        } else {
          setMessage('Enter valid Credentials');
        }
      } else {
        setMessage('Server error. Please try again later.');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="container">
      <h1>Signup Page</h1>
      <form onSubmit={handleSubmit}>
        {message && <div className={`alert ${message.includes('Successful') ? 'alert-success' : 'alert-danger'}`} >{message}</div>}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={credentials.username}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={credentials.phone}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
