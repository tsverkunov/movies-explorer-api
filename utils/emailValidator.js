module.exports.emailValidation = (email, helpers) => {
  const regex = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
  if (regex.test(email)) {
    return email;
  }
  return helpers.error('Email не валиден');
};
