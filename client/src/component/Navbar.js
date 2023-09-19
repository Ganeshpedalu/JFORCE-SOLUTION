import React ,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../component/Navbar.css';

function Navbar() {
  const authToken = localStorage.getItem('authToken');
  const role = localStorage.getItem('role');
  const [message, setMessage] = useState("");


  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');

    setMessage("Successfully logged out")

    setTimeout(() => {
      setMessage('')
      navigate('/login');
    }, 1000)


  };

  

  return (
    
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {!authToken ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
              </>
            ) : role === 'admin' ? ( 
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/voting-details">
                    Voting Details
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/voting">
                    Voting Page
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {message && (
        <div className="alert alert-success" style={{ position: 'absolute', top: '70px', right: '10px' }}>
          {message}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
