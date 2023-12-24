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
};

module.exports = checkIFAllowed;
