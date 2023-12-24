const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  idNum: {
    type: String,
    required: [true, 'Identification Number is required!'],
    unique: [true, 'Identification Number must be unique for all records!']
  },
  name: {
    type: String,
    required: [true, 'First name is required!']
  },
  lastName: String,
  dateOfBirth: {
    type: Date,
    required: [true, 'Date Of Birth is required!']
  },
  dateOfIssue: {
    type: Date,
    required: [true, 'Date Of Issue is required!'],
    validate: {
      validator: function(date) {
        return date > this.dateOfBirth;
      },
      message: 'Date Of Issue ({VALUE}) should be after Date Of Birth!'
    }
  },
  dateOfExpiry: {
    type: Date,
    required: [true, 'Date Of Expiry is required!'],
    validate: {
      validator: function(date) {
        return date > this.dateOfIssue;
      },
      message: 'Date Of Expiry ({VALUE}) should be after Date Of Issue!'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  modifiedAt: Date,
  deleted: {
    type: Boolean,
    default: false,
    select: false
  }
});

// Document middleware to set modifiedAt property if record is modified before save operation
recordSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.modifiedAt = Date.now();
  }
  next();
});

// Query middleware to filter the records that have been deleted before any find operation
recordSchema.pre(/^find/, function(next) {
  this.find({ deleted: { $ne: true } });
  next();
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
