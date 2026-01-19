export const validateCaptcha = (userFn, actual, options = {}) => {
  const { caseSensitive = false } = options;
  
  if (!userFn || !actual) {
    return false;
  }

  if (caseSensitive) {
    return userFn === actual;
  }

  return userFn.toUpperCase() === actual.toUpperCase();
};
