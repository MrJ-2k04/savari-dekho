import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from "../store/constants";

const mixins = {
  toolbar: {
    minHeight: APP_BAR_MOBILE,
    "@media (min-width:600px)": {
      minHeight: APP_BAR_DESKTOP,
    },
  },
};
export default mixins;
