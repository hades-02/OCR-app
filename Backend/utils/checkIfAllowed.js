<<<<<<< HEAD
// Check if record contains any invalid fields
=======
>>>>>>> a35921303344189dbd5d01bcd6eca532d66b1705
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
<<<<<<< HEAD

  return true;
=======
>>>>>>> a35921303344189dbd5d01bcd6eca532d66b1705
};

module.exports = checkIFAllowed;
