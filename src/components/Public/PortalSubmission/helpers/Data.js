import axios from "axios";

// Retrieves posting data of id
export const getPostingData = (
  id,
  setAppInfo,
  setListingsInfo,
  setErrorMessage,
  setOpenError
) => {
  axios
    .get(process.env.REACT_APP_FLASK_SERVER + "admin/postings/" + id)
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data.postingInfo["essay"].length !== 0) {
        setAppInfo((prevState) => {
          var newObj = {};
          let essayObjects = data.postingInfo["essay"].map((question) => ({
            question: question,
            answer: "",
          }));
          newObj["essay"] = essayObjects;
          return Object.assign({}, prevState, newObj);
        });
      }
      setListingsInfo(data.postingInfo);
      return;
    })
    .catch((err) => {
      setErrorMessage(
        err.toString() + ", please contact the admin or PCT Recruitment Team."
      );
      setOpenError(true);
    });
};

