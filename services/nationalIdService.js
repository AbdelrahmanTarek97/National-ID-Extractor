const moment = require("moment");
const utils = require("./utils");
const errorObjects = require("./json/errorCodeMessages.json");

module.exports.isValidNationalId = (req, res, next) => {
  // Get the nationalId from the request
  let { nationalId } = req.params;

  utils.validateNationalId(res, nationalId);

  // Split the nationalId into understandable values
  let splitNationalIdNumber = utils.splitNationalIdNumber(nationalId);

  // Validate the fields returned from splitting the nationalId
  let validateNationalIdFields = utils.validateNationalIdFields(
    res,
    splitNationalIdNumber
  );

  // If validation is correct, continue to the next function
  if (validateNationalIdFields) {
    req.nationalIdFields = splitNationalIdNumber;
    return next();
  }

  return utils.returnError(res, errorObjects.GENERIC_ERROR);
};

module.exports.returnExtractedData = (req, res) => {
  // Get data from passed field from the previous middleware
  let {
    century,
    year,
    month,
    day,
    birthGovernate,
    birthNumberOnThatDay,
    gender,
    ministryOfInteriorDigit,
  } = req.nationalIdFields;

  // Construct Object that will be returned to the user
  let centuryLookUp = { 0: "17", 1: "18", 2: "19", 3: "20" };
  let dateOfBirth = centuryLookUp[century] + year + "-" + month + "-" + day;
  let placeOfBirth = birthGovernate;
  let result = {
    dateOfBirth,
    placeOfBirth,
    yourWereTheNthNewBornOnThatDay: birthNumberOnThatDay,
    gender,
    theMinistryOfInteriorAffairsAssignedYouThisNumber: ministryOfInteriorDigit,
  };

  return res.send(result);
};
