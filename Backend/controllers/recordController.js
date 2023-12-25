const Record = require('../models/recordModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const checkIFAllowed = require('../utils/checkIfAllowed');
<<<<<<< HEAD
const detectText = require('../utils/ocrService');
=======
>>>>>>> a35921303344189dbd5d01bcd6eca532d66b1705

// controller function to extract and send data to client form the uploaded image
exports.extractData = async (req, res, next) => {
  if (!req.body.image) {
    return next(new AppError('Please provide image to extract data.', 400));
  }
  const file = req.body.image;

  try {
    const result = await detectText(file);

    res.status(200).json({
      status: 'success',
      message: 'Data extracted successfully',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error extracting data, please provide clear image',
      error: err
    });
  }
};

// controller function to send record of provided id
exports.getRecord = catchAsync(async (req, res, next) => {
  const record = await Record.findById(req.params.id);

  if (!record) {
    return next(new AppError('No record found with this ID!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: record
  });
});

// controller function to send all the records in DB
exports.getAllRecords = catchAsync(async (req, res) => {
  // Get all filtered records
  const features = new APIFeatures(Record.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const records = await features.query;

  res.status(200).json({
    status: 'success',
    results: records.length,
    data: {
      records
    }
  });
});

// controller function to create a new record from provided input
exports.createRecord = catchAsync(async (req, res, next) => {
  // Check if new record contains any invalid fields
  if (!checkIFAllowed(req.body)) {
    return next(new AppError('Record contains invalid fields!', 400));
  }

  const newRecord = await Record.create(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Record added successfully!',
    data: newRecord
  });
});

// controller function to update fields of a record
exports.updateRecord = catchAsync(async (req, res, next) => {
  // Check if there is any invalid field or field which cannot be updated
  if (!checkIFAllowed(req.body)) {
    return next(new AppError('Invalid fields or cannot be updated', 400));
  }

  const record = await Record.findById(req.params.id);

  if (!record) {
    return next(new AppError('No record found with this ID!', 404));
  }

  Object.keys(req.body).forEach(el => {
    record[el] = req.body[el];
  });
  record.save();

  res.status(200).json({
    status: 'success',
    message: 'Record updated successfully',
    data: record
  });
});

// controller function which performs soft delete (i.e. record is still present but its deleted field is set to true)
exports.deleteRecord = catchAsync(async (req, res, next) => {
  const record = await Record.findById(req.params.id);

  if (!record) {
    return next(new AppError('No document found with this ID!', 404));
  }

  record.deleted = true;
  record.save();

  res.status(204).json({
    status: 'success',
    message: 'Record deleted successfully.'
  });
});
