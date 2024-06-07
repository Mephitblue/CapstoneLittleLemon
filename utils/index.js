const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validateFirstName = (firstName) => {
  return firstName.length > 0 && firstName.match(/^[A-Za-z]+$/);
};

const validateLastName = (lastName) => {
  return lastName.length > 0 && lastName.match(/^[A-Za-z' ]+$/);
};

const validatePhoneNumber = (phoneNumber) => {
  return phoneNumber.length == 10;
};

export {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePhoneNumber,
};
