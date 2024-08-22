import axios from "axios";
import swal from "sweetalert2";
import * as helpers from "../lib/Helpers";

const instance = axios.create({
  baseURL: "http://38.143.140.229:8088/api/",
  // baseURL: "http://localhost:8035/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  },
});

instance.interceptors.request.use(
  (request: any) => {
    document.body.classList.add("loading-indicator");
    instance.defaults.headers.post["Content-Type"] = "application/json";
    const token = helpers.access_token();
    request.headers["ByPassKey"] = "ibsvsabvsivs161b6bdbdbfdB";

    if (token !== "") {
      request.headers.Authorization = "bearer " + token;
    }
    return request;
  },
  (err) => {
    document.body.classList.remove("loading-indicator");
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (resp) => {
    document.body.classList.remove("loading-indicator");
    return resp;
  },
  (err) => {
    document.body.classList.remove("loading-indicator");
    swal.fire("oops!", "Some Error Occurred", "error");
    return Promise.reject(err);
  }
);
export default instance;
