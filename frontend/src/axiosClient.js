import axios from "axios";

const userId = JSON.parse(localStorage.getItem('userId'));
const instance = axios.create({
    headers: {
      Authorization: `Bearer ${userId.token}`,
    },
  });

  export default instance;
  