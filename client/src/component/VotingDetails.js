import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../component/VotingDetails.css'

export default function VotingDetails() {
  const [candidateInfo, setCandidateInfo] = useState({});

  useEffect(() => {
    
    axios.get('http://localhost:5000/candidate-info')
      .then((response) => {
        setCandidateInfo(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2>Voting Details</h2>
      <div className="candidate-box">
        <p>Candidate 1</p>
        <p>{candidateInfo['1']}</p>
      </div>
      <div className="candidate-box">
        <p>Candidate 2</p>
        <p>{candidateInfo['2']}</p>
      </div>
      <div className="candidate-box">
        <p>Candidate 3</p>
        <p>{candidateInfo['3']}</p>
      </div>
      <div className="candidate-box">
        <p>Candidate 4</p>
        <p>{candidateInfo['4']}</p>
      </div>
    </div>
  );
}
