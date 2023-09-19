const express = require('express');
const app = express();
const connectDB = require('../Backend/db/connection');
const { body, validationResult } = require('express-validator');
const user = require('../Backend/db/model/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecretKey = 'Mynameisganeshpeduiamsoftwaredeveloper';
const cors = require('cors');
const hasVotes = require ("../Backend/db/model/hasVotes")


connectDB();

app.use(express.json()); 
app.use(cors())


app.get('/', (req, res) => {
  res.send('hello world');
});

app.post(
  '/createuser',
  [
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await user.create({
        username: req.body.username,
        email: req.body.email,
        password: secPassword,
        phonenumber: req.body.phone,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);


app.post('/loginuser',[

  body('email').isEmail(),
  body('password', 'Incorrect password').isLength({ min: 8 })]

  , async (req, res) => {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      let email = req.body.email;
      try {
          let userData = await user.findOne({ email });
          if (!userData) {
              return res.status(400).json({ errors: "Try logging with correct credentials" });
          }
          const pwPassword = await bcrypt.compare(req.body.password ,userData.password )

          if (!pwPassword) {
              return res.status(400).json({ errors: "Try logging with correct credentials" });
          }
          const data = {
              user : {
                  id : userData.id
              }
          }

          const authToken = jwt.sign(data , jwtSecretKey)


          return res.json({ success: true , authToken:authToken , userData});

      } catch (error) {
          console.log(error)
          res.json({ success: false })
      }

  })

  app.post('/recordvote/:email', async (req, res) => {
    const userEmail = req.params.email; 
    const candidate = req.body.selectedCandidate
  
    try {
      const user = await hasVotes.findOne({ email: userEmail });
  
      if (!user) {
        
        const newUser = new hasVotes({
          email: userEmail,
          hasvotes: true, 
          candidate: candidate
        });
  
        await newUser.save();
        return res.json({ success: true });
      }
  
      if (user.hasvotes) {
        
        return res.status(400).json({ message: 'You have already voted' });
      }
  
      
      user.hasvotes = true;
      await user.save();
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error recording the vote:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  app.get('/candidate-info', async (req, res) => {
    try {
      
      const candidateInfo = await hasVotes.aggregate([
        {
          $group: {
            _id: '$candidate',
            count: { $sum: 1 } 
          }
        }
      ]);
  
      
      const candidateCountMap = {};
  
      
      candidateInfo.forEach((info) => {
        candidateCountMap[info._id] = info.count;
      });
  
      res.json(candidateCountMap);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


 


app.listen(5000, () => {
  console.log('server Running');
});
