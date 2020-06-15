import { atom } from "recoil";

const userState = atom({
  key: "userState",
  default: {
    loading: false,
    error: "",
    data: [],
  },
});

export {
  userState,
};
