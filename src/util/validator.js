const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Enter first name and last name");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("the email you entered is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("the password you entered is weak, make it strong");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "age",
    "gender",
    "about",
    "skills",
  ];

  const isAllowedEdit = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  return isAllowedEdit;
};

module.exports = {
  validateSignupData,
  validateEditProfileData,
};
