import * as functions from "firebase-functions";

export const env = {
  github: {
    clientId: functions.config().client_id,
    clientSecret: functions.config().client_secret,
  },
};
