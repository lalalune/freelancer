import Axios from "axios";
import { makeUseAxios } from "axios-hooks";

const axios = Axios.create({
  withCredentials: false, // only if env == DEVELOPMENT
});

const useAxios = makeUseAxios({ axios });

export {
  useAxios,
  axios,
};
