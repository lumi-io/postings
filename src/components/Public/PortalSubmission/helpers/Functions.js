// Converts dictionary of colleges to a list only with True values
export function parseOutColleges(colleges) {
  var collegesToSubmit = [];
  for (const [key, checked] of Object.entries(colleges)) {
    if (checked) {
      collegesToSubmit.push(key);
    }
  }
  return collegesToSubmit;
}

// Checks if all the required fields exist in applicant's info
export function requiredFieldsExist(applicantInfo) {
  const requiredFields = [
    "firstName",
    "lastName",
    "major",
    "gradYear",
    "colleges",
    "email",
    "phone",
    "resume",
    "image",
    "essay",
  ];

  //checks if all the required fields and their values exist in the applicant info 
  for (const field of requiredFields)
    if (!applicantInfo?.[field])
      return false;

  return true;
}

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

// Handles the upload of resume and sets the state with base64 conversion of file
export const handleResumeUpload = async (event, setResumeName, setAppInfo) => {
  const file = event.target.files[0];
  setResumeName(file["name"]);
  const base64 = await convertBase64(file);
  setAppInfo((prevState) => {
    const val = base64;
    var newObj = {};
    newObj["resume"] = val;
    return Object.assign({}, prevState, newObj);
  });
};

// Handles the upload of an image and sets the state with base64 conversion of file
export const handleImageUpload = async (event, setImageName, setAppInfo) => {
  const file = event.target.files[0];
  setImageName(file["name"]);
  const base64 = await convertBase64(file);
  setAppInfo((prevState) => {
    const val = base64;
    var newObj = {};
    newObj["image"] = val;
    return Object.assign({}, prevState, newObj);
  });
};
