const axios = require("axios");

const KEY = "AIzaSyC41NHooeOCgkfQlI3MXIAHDVSy_q2nOrk";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 5,
    key: KEY
  }
});
