import axios from "axios";

const getUrl = (path) => `${process.env.REACT_APP_API_BASE_URL + "/" + path}`;

const fileUpload = (files, bucketName, token, onSuccess, onError) => {
  if (!files) {
    return false;
  }

  const url = getUrl("aws/upload/s3");

  const config = {
    headers: {
      token: token,
      "Content-Type": "multipart/form-data",
    },
  };

  let file = files.name ? files : files[0];

  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", bucketName); // org-glen

  axios
    .post(url, formData, config)
    .then((response) => {
      if (response.status === 200) {
        onSuccess && onSuccess(response.data.data);
      }
    })
    .catch((error) => {
      onError && onError(error);
      console.log("Error while uploading file >", error);
    });
};

const post = (query, body, token, onSuccess, onError) => {
  const url = getUrl(query);

  const config = {
    headers: {
      token: token,
    },
  };

  axios
    .post(url, body, config)
    .then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        onSuccess && onSuccess(response.data.data);
      }
    })
    .catch((error) => {
      onError && onError(error);
      console.log("Error while uploading file >", error);
    });
};

const get = (query, body, token, onSuccess, onError) => {
  const url = getUrl(query);

  const config = {
    headers: {
      token: token,
    },
  };

  axios
    .get(url, config)
    .then((response) => {
      if (response.status === 200) {
        onSuccess && onSuccess(response.data.data);
      }
    })
    .catch((error) => {
      onError && onError(error);
      console.log("Error while uploading file >", error);
    });
};

const Api = { fileUpload, post, get };
export default Api;
