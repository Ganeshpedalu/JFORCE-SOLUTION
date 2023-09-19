const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  
    email:{
        type: String,
        required: true,
        unique: true,

    },

    hasvotes: {
        type: Boolean,
        required: true,
    },

    candidate : {
        type : Number
    },

   date:{
        type:Date,
        default: Date.now

    }
})


module.exports = mongoose.model('hasVotes', userSchema);