const express = require('express');

const recordController = require('./../controllers/recordController');

const router = express.Router();

// post route for data extraction from image
router.post('/ocr', recordController.extractData);

// routes to create and get the records
router
  .route('/')
  .get(recordController.getAllRecords)
  .post(recordController.createRecord);

// routes to fetch , update or delete a record
router
  .route('/:id')
  .get(recordController.getRecord)
  .patch(recordController.updateRecord)
  .delete(recordController.deleteRecord);

module.exports = router;
