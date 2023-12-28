// eslint-disable-next-line import/no-extraneous-dependencies
const moment = require('moment');
const vision = require('@google-cloud/vision');
const { CREDENTIALS } = require('./googleVisionCredentials');

const CONFIG = {
  credentials: CREDENTIALS
};

// create google vision API client
const client = new vision.ImageAnnotatorClient(CONFIG);

function findIndexByText(textArray, targetText) {
  return textArray.findIndex(text => text.toLowerCase().includes(targetText));
}

function removeSubstring(inputString, substringToRemove) {
  return inputString.replace(substringToRemove, '');
}

function getDate(dateString) {
  const date = moment(dateString, 'DD MMM. YYYY');
  return date.format('YYYY-MM-DD');
}

// function to extract data from thai id image
const detectText = async imgUrl => {
  try {
    const [result] = await client.textDetection(imgUrl);
    let rawText = result.fullTextAnnotation.text;

    // Removing the Thai characters
    const thaiCharacterRegex = /[\u0E00-\u0E7F]/g;
    rawText = rawText.replace(thaiCharacterRegex, '');

    let text = rawText.split('\n');

    // Remove empty strings and strings without any alphabet or numbers
    text = text.filter(item => item.trim() !== '' && /[a-zA-Z0-9]/.test(item));

    // To extract identification number
    const idNumIndex = findIndexByText(text, 'identification number') - 1;
    let idNum = '';
    if (idNumIndex !== -2) {
      idNum = text[idNumIndex].trim();
    }

    // To extract name
    const nameIndex = findIndexByText(text, 'name');
    let name = '';
    if (nameIndex !== -1) {
      name = removeSubstring(text[nameIndex], 'Name ').trim();
    }

    // To extract last name
    const lastNameIndex = findIndexByText(text, 'last name');
    let lastName = '';
    if (lastNameIndex !== -1) {
      lastName = removeSubstring(text[lastNameIndex], 'Last name ').trim();
    }

    // To extract date of issue
    const issueIndex = findIndexByText(text, 'date of issue') - 1;
    let dateOfIssue = '';
    if (issueIndex !== -2) {
      dateOfIssue = getDate(text[issueIndex]);
    }

    // To extract date of expiry
    const expiryIndex = findIndexByText(text, 'date of expiry') - 1;
    let dateOfExpiry = '';
    if (expiryIndex !== -2) {
      dateOfExpiry = getDate(text[expiryIndex]);
    }

    // To extract date of birth
    const dobIndex = findIndexByText(text, 'date of birth');
    let dateOfBirth = '';
    if (dateOfBirth !== -1) {
      dateOfBirth = getDate(
        removeSubstring(text[dobIndex], 'Date of Birth ').trim()
      );
    }

    const data = {
      idNum,
      name,
      lastName,
      dateOfBirth,
      dateOfIssue,
      dateOfExpiry
    };
    return data;
  } catch (err) {
    console.error('Error during text detection:', err.message);
    return null; // Return null in case of an error
  }
};

module.exports = detectText;
