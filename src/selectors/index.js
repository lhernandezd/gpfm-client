import axios from "axios";
import { selectorFamily, selector } from "recoil";
import { userState } from "../atoms";

const userPostMehtod = selector({
  key: "userPostMehtod",
  set: async ({ get, set }, values) => {
    // const userStateConst = get(userState);
    // console.log(userStateConst);
    // set(userState, (prevState) => ({
    //   ...prevState,
    //   loading: true,
    // }));
    // try {
    const response = await axios.post("http://localhost:3001/api/auth/signin", values);
    console.log(response);
    if (response.status !== 200) {
      set(userState, (prevState) => ({
        ...prevState,
        error: response.error,
        loading: false,
      }));
    }
    set(userState, (prevState) => ({
      ...prevState,
      data: response.data,
      error: "",
      loading: false,
    }));

    // } catch (error) {
    // }
  },
});

export {
  userPostMehtod,
};
