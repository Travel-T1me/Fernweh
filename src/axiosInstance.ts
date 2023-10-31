import axios from "axios";

const instance = axios.create({
  baseURL: 'https://fernweh-git-main-giovannivibe.vercel.app/',
});

export default instance;