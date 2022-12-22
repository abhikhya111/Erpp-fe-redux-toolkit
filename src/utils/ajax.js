import React from "react";
import axios from "axios";
import _ from "lodash";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 9999,
    color: "#fff",
  },
}));
import useApp from "hooks/useApp";

axios.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

axios.interceptors.response.use((response) => {
  console.log("Response:", response);
  return response;
});

export const ajax = (function () {
  let app = useApp();
  let loaderCount = 0;
  // var ua = window.navigator.userAgent;
  const ajax = (method, url, option) => {
    const options = _.isUndefined(option) ? {} : option;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (_.has(options, "headers")) {
      Object.keys(options.headers).forEach((item) => {
        headers[item] = options.headers[item];
      });
    }

    options.headers = headers;
    options.method = method;
    options.timeout = 3000000;
    options.url = url;
    // options.baseURL = 'http://localhost:3009/v1';
    options.baseURL = process.env.REACT_APP_API_BASE_URL;

    /* isLoader : true means no need of common loader */
    if (!options.isLoader) {
      loaderCount += 1;
      // store.dispatch(loaderStart())
    }
    if (loaderCount > 0 && !options.isLoader) {
      app.showLoader();
    }
    return axios(options)
      .then(
        (response) => {
          if (loaderCount > 0 && !options.isLoader) {
            loaderCount -= 1;
            if (loaderCount === 0) {
              app.hideLoader();
            }
          }
          return response;
        },
        (error) => {
          if (loaderCount > 0 && !options.isLoader) {
            loaderCount -= 1;
            if (loaderCount === 0) {
              app.hideLoader();
            }
          }
          return error.response;
        }
      )
      .catch((error) => {
        if (loaderCount > 0 && !options.isLoader) {
          loaderCount -= 1;
          if (loaderCount === 0) {
            app.hideLoader();
          }
        }
        return error.response;
      });
  };

  ["get", "put", "post", "delete"].forEach((method) => {
    ajax[method] = function (url, options) {
      return ajax(method, url, options);
    };
  });

  return ajax;
})();

const commonLoader = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default commonLoader;
