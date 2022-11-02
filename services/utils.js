const _ = require("lodash");
const governateCodeLookUp = require("./json/governateCodeLookUp.json");
const genderLookUp = require("./json/genderLookUp.json");
const errorObjects = require("./json/errorCodeMessages.json");

returnError = (res, errorObject) => {
  return res.status(errorObject.code).send({
    message: errorObject.message,
    type: errorObject.type,
    path: errorObject.path,
  });
};

isNumeric = (val) => {
  return /^\d+$/.test(val);
};

splitNationalIdNumber = (nationalId) => {
  return {
    century: nationalId.substring(0, 1),
    year: nationalId.substring(1, 3),
    month: nationalId.substring(3, 5),
    day: nationalId.substring(5, 7),
    birthGovernate: governateCodeLookUp[nationalId.substring(7, 9)],
    birthNumberOnThatDay: nationalId.substring(9, 13),
    gender: genderLookUp[nationalId.substring(12, 13)],
    ministryOfInteriorDigit: nationalId.substring(13),
  };
};

validateNationalId = (res, nationalId) => {
  if (!nationalId || !_.isString(nationalId))
    return returnError(res, errorObjects.NATIONAL_ID_NOT_A_STRING);

  // Check if the national id is 14 digits long
  if (nationalId.length !== 14)
    return returnError(res, errorObjects.NATIONAL_ID_LENGTH_VALIDATION);

  // Check if the national id is all numbers
  if (!isNumeric(nationalId))
    return returnError(res, errorObjects.NATIONAL_ID_IS_NUMBER_VALIDATION);
};

validateNationalIdFields = (res, splitNationalIdNumber) => {
  let {
    century,
    year,
    month,
    day,
    birthGovernate,
    birthNumberOnThatDay,
    gender,
    ministryOfInteriorDigit,
  } = splitNationalIdNumber;

  // Validate century
  if (!["0", "1", "2", "3"].includes(century)) {
    return returnError(
      res,
      errorObjects.NATIONAL_ID_BIRTHDATE_CANNOT_BE_IN_THE_FUTURE
    );
  }

  // Validate year
  if (century == 3 && parseInt(year) > 22) {
    return returnError(
      res,
      errorObjects.NATIONAL_ID_BIRTHDATE_CANNOT_BE_IN_THE_FUTURE
    );
  }

  // Validate Month
  if (parseInt(month) == 0 || parseInt(month) > 12) {
    return returnError(res, errorObjects.NATIONAL_ID_HAS_TO_HAVE_A_VALID_MONTH);
  }

  // Validate day
  if (parseInt(day) == 0 || parseInt(day) > 31) {
    return returnError(res, errorObjects.NATIONAL_ID_HAS_TO_HAVE_A_VALID_DAY);
  }

  // Validate birth governate code
  if (!birthGovernate) {
    return returnError(
      res,
      errorObjects.NATIONAL_ID_HAS_TO_HAVE_A_VALID_GOVERNATE_CODE
    );
  }

  // Validate gender
  if (!gender) {
    return returnError(
      res,
      errorObjects.NATIONAL_ID_HAS_TO_HAVE_A_VALID_GENDER
    );
  }

  if (ministryOfInteriorDigit == 0) {
    return returnError(
      res,
      errorObjects.NATIONAL_ID_HAS_TO_HAVE_A_VALID_MINISTRY_OF_INTERIOR_CODE
    );
  }

  return true;
};

module.exports = {
  returnError,
  splitNationalIdNumber,
  validateNationalId,
  validateNationalIdFields,
};
