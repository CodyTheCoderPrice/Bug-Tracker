import axios from "axios";

const setAuthorizationToken = jwToken => {
  if (jwToken) {
    // Apply authorization token to every request if logged in
	axios.defaults.headers.common["jwToken"] = jwToken;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["jwToken"];
  }
};

export default setAuthorizationToken;