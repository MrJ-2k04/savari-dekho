
import { API_FORGOT_PASSWORD, API_GENERATE_OTP, API_GET_USERS, API_LOGIN, API_PAYMENT_CANCEL, API_PAYMENT_CREATE, API_PAYMENT_VALIDATE, API_REFRESH_TOKEN, API_REGISTER, API_RESET_PASSWORD, API_TRANSACTION, API_UPLOAD_RIDER_DOCS, API_UPLOAD_VEHICLE_DOCS, API_USER_ME, API_USER_UPDATE, API_VALIDATE_OTP } from "Store/constants";
import { selectAccessToken, selectRefreshToken } from "Store/selectors";
import { authActions } from "Store/slices";
import { jsonToFormData, showError, showSuccess } from "Utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useApi = () => {
  const [loading, setLoading] = useState(false);

  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const dispatch = useDispatch();


  // ######################################################### FOR USERS #########################################################

  const generateOtp = async (mobileNumber) => {
    const formData = new FormData();
    formData.append('mobileNumber', mobileNumber);

    try {
      const resp = await apiRequestWithReauth(API_GENERATE_OTP, formData);
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
      const resp = await apiRequestWithReauth(API_VALIDATE_OTP, formData);
      showSuccess({ message: resp.message });
      return resp;
    } catch (error) {
      showError({ message: error.message });
      throw new Error(error.message);
    }
  };

  const getUserDetails = async () => {
    const ack = await apiRequestWithReauth(API_USER_ME, null, 'GET')
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error('Cannot fetch user details');
  }

  const syncUser = () => {
    getUserDetails().then(userDetails => {
      dispatch(authActions.setUser(userDetails));
    }).catch(err => {
      console.error(err.message);
      dispatch(authActions.logout());
    });
  }

  const updateUserDetails = async (user) => {
    const ack = await apiRequestWithReauth(API_USER_UPDATE, jsonToFormData(user), 'PUT');
    return ack;
  };

  const loginUser = async (credentials) => {
    // dispatch(authActions.setTokens({ accessToken: "abc", refreshToken: "def" }));
    // credentials = {type, value, password}
    const userFormData = jsonToFormData(credentials);
    try {
      const ack = await apiRequestWithReauth(API_LOGIN, userFormData);
      if (ack.type === 'success') {
        dispatch(authActions.setTokens(ack.payload));
        return ack;
      }
      return showError({ message: ack.message });
    } catch (error) {
      showError({ message: error.message });
    }
  }

  const logoutUser = async () => {
    dispatch(authActions.logout());
  }

  const registerUser = async (userObj) => {
    const userFormData = jsonToFormData(userObj);
    try {
      const ack = await apiRequestWithReauth(API_REGISTER, userFormData);
      if (ack.type === 'success') {
        dispatch(authActions.setTokens(ack.payload));
        return ack;
      }
      return showError({ message: ack.message });
    } catch (error) {
      showError({ message: error.message });
    }
  }

  const forgotPassword = async (credentials) => {
    try {
      const res = await apiRequestWithReauth(API_FORGOT_PASSWORD, jsonToFormData(credentials));
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
    try {
      const ack = await apiRequestWithReauth(API_RESET_PASSWORD, formData);
      return ack;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const fetchWalletTransactions = async () => {
    const ack = await apiRequestWithReauth(API_TRANSACTION, null, 'GET');
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error(ack.message || "Cannot fetch transactions");
  }

  const requestPayment = async (amount, description = "Unknown") => {
    const ack = await apiRequestWithReauth(API_PAYMENT_CREATE, jsonToFormData({ amount, description }));
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error(ack.message);
  };

  const validatePayment = async (credentials) => {
    const ack = await apiRequestWithReauth(API_PAYMENT_VALIDATE, jsonToFormData(credentials));
    try {
      const userDetails = await getUserDetails(accessToken);
      dispatch(authActions.setUser(userDetails));
    } catch (error) {
      dispatch(authActions.logout());
    }
    if (ack.type === 'success') {
      return ack.message;
    }
    throw new Error(ack.message);
  };

  const cancelPayment = async (orderId) => {
    const ack = await apiRequestWithReauth(API_PAYMENT_CANCEL, jsonToFormData({ orderId }), 'PUT');
    return ack.message;
  }

  // ######################################################### FOR RIDERS #########################################################

  const uploadRiderDocs = async (docsJson) => {
    const ack = await apiRequestWithReauth(API_UPLOAD_RIDER_DOCS, jsonToFormData(docsJson));
    if (ack.type === 'success') {
      syncUser();
      return ack;
    }
    throw new Error(ack.message || "Couldn't upload the documents");
  }

  const uploadVehicleDocs = async (docsJson) => {
    const ack = await apiRequestWithReauth(API_UPLOAD_VEHICLE_DOCS, jsonToFormData(docsJson));
    if (ack.type === 'success') {
      syncUser();
      return ack;
    }
    throw new Error(ack.message || "Couldn't add vehicle");
  }

  // ######################################################### FOR ADMINS #########################################################

  const getUsersList = async () => {
    const ack = await apiRequestWithReauth(API_GET_USERS, null, 'GET')
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error(ack.message || 'Cannot fetch users list');
  }

  // ######################################################### ACTUAL API CALLS #########################################################

  const apiRequestWithReauth = async (url, data = null, method = 'POST') => {
    setLoading(true);
    return new Promise(async (resolve, reject) => {
      try {
        const res = await apiRequest(url, data, method);
        resolve(res);
      } catch (error) {
        if (error.code === 'AUTH_EXPIRED' || error.code === 'AUTH_INVALID') {
          try {
            // Generate new Access Token using Refresh Token
            const ack = await apiRequest(API_REFRESH_TOKEN, jsonToFormData({ refreshToken }))
            if (ack.type !== 'success') throw new Error(ack.message);

            // Store New Tokens in Local State
            dispatch(authActions.setTokens(ack.payload));

            // Avoid resending /me request
            if (url === API_USER_ME) return;

            // Resend the original API request
            try {
              const newHeader = { 'Authorization': `Bearer ${ack?.payload?.accessToken}` }
              const res = await apiRequest(url, data, method, newHeader);
              resolve(res);
            } catch (err) { reject(err) }
          } catch (error) {
            // If Refresh Token is also expired
            dispatch(authActions.logout());
            reject({ type: 'error', message: error.message });
          }
        } else {
          reject(error);
        }
      }
    });
  };

  const apiRequest = async (url, data = null, method = 'POST', headerOptions = {}) => {
    setLoading(true);
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Authorization': `Bearer ${accessToken}`,
      ...headerOptions,
    };

    return new Promise((resolve, reject) => {
      window.jQuery.ajax({
        url,
        type: method,
        data: data,
        processData: false,
        contentType: false,
        cache: false,
        headers,
        success: (data) => {
          setLoading(false);
          resolve(data);
        },
        error: async (err) => {
          setLoading(false);

          if (err.status === 0) return reject({ type: 'error', message: 'Server unreachable' });
          if (!err.responseJSON) return reject({ type: 'error', message: err.responseText || err.statusText });

          reject(err.responseJSON);
        }
      });
    });
  };

  return {
    loading,
    generateOtp,
    validateOtp,
    getUserDetails,
    syncUser,
    updateUserDetails,
    loginUser,
    logoutUser,
    registerUser,
    forgotPassword,
    resetPassword,
    fetchWalletTransactions,
    requestPayment,
    validatePayment,
    cancelPayment,
    // Rider
    uploadRiderDocs,
    uploadVehicleDocs,

    // Admin
    getUsersList
  };
};

export default useApi;
