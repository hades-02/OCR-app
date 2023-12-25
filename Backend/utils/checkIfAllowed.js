// Check if record contains any invalid fields
const checkIFAllowed = data => {
  const allowedFields = [
    'idNum',
    'name',
    'lastName',
    'dateOfBirth',
    'dateOfIssue',
    'dateOfExpiry'
  ];

  Object.keys(data).forEach(el => {
    if (!allowedFields.includes(el)) return false;
  });

  return true;
};

module.exports = checkIFAllowed;
