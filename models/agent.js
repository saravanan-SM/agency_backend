const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

// Email Validation
var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

// PassWord Validation
var validatePassword = function(password) {
  //var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#()+-_\$%\^&\*])(?=.{8,})/;
  return strongRegex.test(password);
}


const agentSchema = new mongoose.Schema({
    agentName: {
      type: String,
      required: [true, 'please provide agentName'],
      unique:true,
      trim: true
    },
    address1: {
      type: String,
      required: [true, 'please provide agent address'],
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: [true, 'please provide agent city name'],
    },
    agencyPhNumber: {
      type: Number,
      required: [true, 'please provide agent phone number'],
    },
  }, { timestamps: true } 
);

const Agent = mongoose.model('agentDetails', agentSchema)

module.exports = Agent