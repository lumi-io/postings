// Converts dictionary of colleges to a list only with True values
export function parseOutColleges(colleges){
  var collegesToSubmit = [];
  for (const [key, checked] of Object.entries(colleges)) {
    if (checked) {
      collegesToSubmit.push(key);
    }
  }
  return collegesToSubmit;
};

// Checks if all the required fields exist in applicant's info
export function requiredFieldsExist(applicantInfo){
  const requiredFields = [
    "firstName",
    "lastName",
    "major",
    "gradYear",
    "colleges",
    "email",
    "phone",
    "resume",
    "image"
  ]

  for (let i = 0; i < requiredFields.length; i++) {
    if (!(requiredFields[i] in applicantInfo)) {
      return false;
    }
  }
  
  return true;
};
