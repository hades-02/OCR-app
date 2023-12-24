const Record = require('../models/recordModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const checkIFAllowed = require('../utils/checkIfAllowed');

exports.getRecord = catchAsync(async (req, res, next) => {
  const record = await Record.findById(req.params.id);

  if (!record) {
    return next(new AppError('No record found with this ID!', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      record
    }
  });
});

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

exports.createRecord = catchAsync(async (req, res, next) => {
  // Check if new record contains any invalid fields
  if (!checkIFAllowed(req.body)) {
    return next(new AppError('Record contains invalid fields!', 400));
  }

  const newRecord = await Record.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      record: newRecord
    }
  });
});

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
    data: {
      record
    }
  });
});

exports.deleteRecord = catchAsync(async (req, res, next) => {
  const record = await Record.findById(req.params.id);

  if (!record) {
    return next(new AppError('No document found with this ID!', 404));
  }

  record.deleted = true;
  record.save();

  res.status(204).json({
    status: 'success',
    data: null
  });
});
