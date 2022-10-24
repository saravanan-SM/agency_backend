const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

// Email Validation
var validateEmail = function(email) {
  var valiEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return valiEmail.test(email)
};

// PassWord Validation
var validatePassword = function(password) {
  var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#()+-_\$%\^&\*])(?=.{8,})/;
  return strongRegex.test(password);
}

const clientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: [true, 'please provide client name'],
    unique:true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'please provide email.. email must'],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email format'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    trim: true,
    minlength: 8,
    required: [true, 'Please Provide Password Min 8 Char'],
    validate: [validatePassword, 'Password Validation Failed'],
  },
  agencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "agentDetails",
  },
  phoneNumber: {
    type: Number,
    minlength: 10,
  },
  totalBill: {
    type: Number,
    default: 100
  },
}, { timestamps: true });

// Sign JWT and return
clientSchema.methods.generateAuthToken = async function () {
  const client = this
  const token = jwt.sign({ _id: client._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
  return token
}

// Encrypt password using bcrypt
clientSchema.pre('save', async function (next) {
  const client = this
  if (client.isModified('password')) {
    client.password = await bcrypt.hash(client.password, 8)
  }
  next()
})

const Client = mongoose.model('clientDetails', clientSchema)

module.exports = Client