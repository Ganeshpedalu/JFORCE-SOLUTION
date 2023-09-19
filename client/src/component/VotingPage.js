import React, { useState } from 'react';
import axios from 'axios';

function VotingPage() {
  const email = localStorage.getItem("userEmail");
  const [selectedCandidate, setSelectedCandidate] = useState(0); 
  const [message, setMessage] = useState('');

  const handleCandidateSelection = (event) => {
    setSelectedCandidate(parseInt(event.target.value)); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/recordvote/${email}`, {
        selectedCandidate,
      });

      if (response.data.success) {
        setMessage('Vote recorded successfully!');
      }
    } catch (error) {
      console.error('Error recording the vote:', error);
      setMessage('You have already voted.');
    }
  };

  setTimeout(() => {
    setMessage('');
  }, 2000);

  
  
  return (
    <div className="container">
      <h1>Voting Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Select a Candidate:</label>
        </div>
        <div className="mb-3">
          <label>
            <input
              type="radio"
              value={1} 
              checked={selectedCandidate === 1}
              onChange={handleCandidateSelection}
            />
            Candidate 1
          </label>
        </div>
        <div className="mb-3">
          <label>
            <input
              type="radio"
              value={2}
              checked={selectedCandidate === 2}
              onChange={handleCandidateSelection}
            />
            Candidate 2
          </label>
        </div>
        <div className="mb-3">
          <label>
            <input
              type="radio"
              value={3}
              checked={selectedCandidate === 3}
              onChange={handleCandidateSelection}
            />
            Candidate 3
          </label>
        </div>
        <div className="mb-3">
          <label>
            <input
              type="radio"
              value={4}
              checked={selectedCandidate === 4}
              onChange={handleCandidateSelection}
            />
            Candidate 4
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Vote
        </button>
        {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`} style={{ position: 'absolute', top: '70px', right: '10px' }}>{message}</div>}
      </form>
    </div>
  );
}

export default VotingPage;
