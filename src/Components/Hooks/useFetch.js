
import { API_LOGIN, API_REGISTER, API_, API_GENERATE_OTP, RES, API_VALIDATE_OTP, API_RESET_PASSWORD, ROUTE_HOME, ROUTE_LOGIN, API_FORGOT_PASSWORD } from "Store/constants";
import { authActions } from "Store/slices";
import { jsonToFormData, showError, showSuccess } from "Utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const generateOtp = async (mobileNumber) => {
    const formData = new FormData();
    formData.append('mobileNumber', mobileNumber);

    try {
      const resp = await apiRequest(API_GENERATE_OTP, formData);
      showSuccess({ message: resp.message });
      return resp;
    } catch (error) {
      showError({ message: error.message });
      throw new Error(error.message);
    }
  };

  const validateOtp = async (otp, mobileNumber) => {
    const formData = new FormData();
    formData.append('otp', otp);
    formData.append('mobileNumber', mobileNumber);

    try {
      const resp = await apiRequest(API_VALIDATE_OTP, formData);
      showSuccess({ message: resp.message });
      return resp;
    } catch (error) {
      showError({ message: error.message });
      throw new Error(error.message);
    }
  };

  const loginUser = async (credentials) => {
    // credentials = {type, value, password}
    const userFormData = jsonToFormData(credentials);
    try {
      const ack = await apiRequest(API_LOGIN, userFormData);
      if (ack.type === 'success') {
        dispatch(authActions.setTokens(ack.payload));
        return ack;
      }
      return showError({ message: ack.message });
    } catch (error) {
      showError({ message: error.message });
    }
  }

  const logoutUser = () => {
    console.log("Logged Out");
    dispatch(authActions.logout());
  }

  const registerUser = async (userObj) => {
    const userFormData = jsonToFormData(userObj);
    try {
      const ack = await apiRequest(API_REGISTER, userFormData);
      if (ack.type === 'success') {
        dispatch(authActions.setTokens(ack.payload));
        return ack;
      }
      return showError({message: ack.message});
    } catch (error) {
      showError({ message: error.message });
    }
  }

  const forgotPassword = async (credentials) => {
    try {
      const res = await apiRequest(API_FORGOT_PASSWORD, jsonToFormData(credentials));
      if (res.type === 'success') {
        return showSuccess({ message: res.message });
      }
      return showError({ message: res.message || 'Server Error' });
    } catch (error) {
      return showError({ message: error.message });
    }
  }

  const resetPassword = async (newPassword, userId) => {
    const json = {
      password: newPassword,
      userId,
    }
    const formData = jsonToFormData(json);
    apiRequest(API_RESET_PASSWORD, formData).then(ack => {
      showSuccess({ message: ack.message }).then(() => {
        nav(ROUTE_LOGIN);
      });
    }).catch(err => {
      showError({ message: err.message });
    })
  }

  const apiRequest = async (url, data = null, method = 'POST') => {
    setLoading(true);

    // If Access Token has expired, it will automatically renew using refresh token
    // if (!accessToken) {
    //   // Fetch new token using refresh token
    //   const refreshToken = Cookies.get("refreshToken"); // Retrieve the refresh token from storage mechanism
    //   const reqOptions = {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ refresh_token: refreshToken }),
    //   }
    //   // Making a request to server's token refresh endpoint
    //   var { access_token, refresh_token } = await apiRequest(API_REFRESH_TOKEN_ENDPOINT, reqOptions);
    //   accessToken = access_token;
    //   dispatch(renewTokens({
    //     accessToken: access_token,
    //     refreshToken: refresh_token,
    //   }));

    //   if (!accessToken) {
    //     console.log("Error refreshing token");
    //     setError("Error occured while refreshing access token");
    //     return;
    //   }
    // }

    return new Promise((resolve, reject) => {
      window.jQuery.ajax({
        url,
        type: method,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        headers: {
          'Access-Control-Allow-Origin': '*', // or specific origin URL
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // specify the allowed methods
        },
        success: (data) => {
          setLoading(false);
          resolve(data);
        },
        error: (err) => {
          setLoading(false);
          if (err.status === 401) {
            console.log("Unauthorized! Token expired!");
            dispatch(authActions.logout())
            reject({ type: 'error', message: 'Token expired! Please login again' });
          }
          if (err.status === 0) {
            reject({ type: 'error', message: 'Server unreachable' });
          }
          if (err.responseJSON) {
            reject(err.responseJSON);
          }
          if (err.status !== 200) {
            reject({ type: 'error', message: err.statusText });
          }
          reject({ type: 'error', message: 'Unexpected Error' });
        }
      });
    });
  };

  return {
    loading,
    result,
    generateOtp,
    validateOtp,
    loginUser,
    logoutUser,
    registerUser,
    forgotPassword,
    resetPassword,
  };
};

export default useFetch;
