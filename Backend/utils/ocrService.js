const moment = require('moment');
const vision = require('@google-cloud/vision');
const { CREDENTIALS } = require('./googleVisionCredentials');

const CONFIG = {
  credentials: CREDENTIALS
};

// create google vision API client
const client = new vision.ImageAnnotatorClient(CONFIG);

function findIndexByText(array, targetText) {
  return array.findIndex(item =>
    item.toLowerCase().includes(targetText.toLowerCase())
  );
}

function removeSubstring(inputString, substringToRemove) {
  return inputString.replace(substringToRemove, '');
}

function getDate(dateString) {
  const dateObject = moment(dateString, 'DD MMM. YYYY');
  return dateObject.format('YYYY-MM-DD');
}

// function to extract data from thai id image
const detectText = async imgUrl => {
  try {
    const [result] = await client.textDetection(imgUrl);
    let temp = result.fullTextAnnotation.text;

    // Removing the Thai characters
    const thaiCharacterRegex = /[\u0E00-\u0E7F]/g;
    temp = temp.replace(thaiCharacterRegex, '');

    let text = temp.split('\n');

    // Remove empty strings and strings without any alphabet or numbers
    text = text.filter(item => item.trim() !== '' && /[a-zA-Z0-9]/.test(item));

    const idNumIndex = findIndexByText(text, 'Thai National ID Card') + 1;
    const idNum = text[idNumIndex];

    const nameIndex = findIndexByText(text, 'Name');
    const name = removeSubstring(text[nameIndex], 'Name ');

    const lastNameIndex = findIndexByText(text, 'Last name');
    const lastName = removeSubstring(text[lastNameIndex], 'Last name ');

    const issueIndex = findIndexByText(text, 'Date of Issue') - 1;
    const dateOfIssue = getDate(text[issueIndex]);

    const expiryIndex = findIndexByText(text, 'Date of Expiry') - 1;
    const dateOfExpiry = getDate(text[expiryIndex]);

    const dobIndex = findIndexByText(text, 'Date of Birth');
    const dateOfBirth = getDate(
      removeSubstring(text[dobIndex], 'Date of Birth ')
    );

    const data = {
      idNum,
      name,
      lastName,
      dateOfBirth,
      dateOfIssue,
      dateOfExpiry
    };
    return data;
  } catch (error) {
    console.error('Error during text detection:', error.message);
    return null; // Return null in case of an error
  }
};

module.exports = detectText;
