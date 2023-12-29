
import { API_ADMIN_DRIVER_REQUESTS, API_ADMIN_LIST_USERS, API_ADMIN_VEHICLE_REQUESTS, API_BANK, API_DRIVER, API_FORGOT_PASSWORD, API_GENERATE_OTP, API_GET_PASSENGERS, API_LOGIN, API_PASSENGER, API_PASSENGER_CANCEL_RIDE, API_PASSENGER_CONFIRM_RIDE, API_PASSENGER_END_RIDE, API_PASSENGER_REQUEST_RIDE, API_PASSENGER_SEND_OTP, API_PASSENGER_START_RIDE, API_PASSENGER_UPDATE_STATUS, API_PAYMENT_CANCEL, API_PAYMENT_CREATE, API_PAYMENT_VALIDATE, API_REFRESH_TOKEN, API_REGISTER, API_RESET_PASSWORD, API_RIDE, API_RIDES_BOOKED, API_RIDE_CANCEL, API_RIDE_END, API_RIDE_REQUEST, API_RIDE_START, API_SEARCH, API_SEARCH_HISTORY, API_TRANSACTION, API_USER_ME, API_USER_UPDATE, API_VALIDATE_OTP, API_VEHICLES, RES } from "Store/constants";
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



  // ######################################################### FOR EVERYONE #########################################################


  const searchRide = async (params) => {
    const queryString = new URLSearchParams(params).toString();
    const ack = await apiRequestWithReauth(`${API_SEARCH}?${queryString}`, null, 'GET');
    if (ack.type === RES.SUCCESS) {
      return ack.payload;
    }
    throw new Error(ack.message || "Server Error");
  }

  const getRideDetails = async (rideId) => {
    const ack = await apiRequestWithReauth(`${API_RIDE}/${rideId}`, null, "GET");
    if (ack.type === RES.SUCCESS) {
      return ack.payload;
    }
    throw new Error(ack.message || "Can't fetch the ride details");
  }

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

  const syncUser = async () => {
    await getUserDetails()
      .then(userDetails => {
        dispatch(authActions.setUser(userDetails));
      }).catch(err => {
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

  // ######################################################### FOR PASSENGERS #########################################################

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

  const createBank = async (bankDetails) => {
    const ack = await apiRequestWithReauth(API_BANK, jsonToFormData(bankDetails), "POST");
    if (ack.type === 'success') {
      return ack;
    }
    throw new Error(ack.message || "Couldn't add the new bank");
  }

  const getBanks = async () => {
    const ack = await apiRequestWithReauth(API_BANK, null, 'GET');
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error(ack.message || 'Could not fetch bank accounts');
  }

  const getBankDetails = async (bankId) => {
    const ack = await apiRequestWithReauth(`${API_BANK}/${bankId}`, null, 'GET');
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error(ack.message || 'Could not fetch bank details');
  }

  const updateBankById = async (bankId, bankDetails) => {
    const ack = await apiRequestWithReauth(`${API_BANK}/${bankId}`, jsonToFormData(bankDetails), 'PUT');
    if (ack.type === 'success') {
      return ack;
    }
    throw new Error(ack.message || "Couldn't update bank");
  }

  const deleteBankById = async (bankId) => {
    const ack = await apiRequestWithReauth(`${API_BANK}/${bankId}`, null, 'DELETE');
    if (ack.type === 'success') {
      return ack;
    }
    throw new Error(ack.message || "Couldn't delete bank");
  }

  const getSearchHistory = async () => {
    const ack = await apiRequestWithReauth(API_SEARCH_HISTORY, null, 'GET');
    if (ack.type === RES.SUCCESS) {
      return ack.payload;
    }
    return [];
  }

  // ######################################################### FOR DRIVERS #########################################################

  const uploadRiderDocs = async (docsJson) => {
    const ack = await apiRequestWithReauth(API_DRIVER, jsonToFormData(docsJson));
    if (ack.type === 'success') {
      syncUser();
      return ack;
    }
    throw new Error(ack.message || "Couldn't upload the documents");
  }

  const updateDrivingLicense = async (data) => {
    const ack = await apiRequestWithReauth(API_DRIVER, jsonToFormData(data), 'PATCH');
    if (ack.type === 'success') {
      syncUser();
      return ack;
    }
    throw new Error(ack.message || "Couldn't update the driving license");
  }

  const createVehicle = async (docsJson) => {
    const ack = await apiRequestWithReauth(API_VEHICLES, jsonToFormData(docsJson));
    if (ack.type === 'success') {
      syncUser();
      return ack;
    }
    throw new Error(ack.message || "Couldn't add vehicle");
  }

  const updateVehicleById = async (vehicleId, vehicleInfo) => {
    const ack = await apiRequestWithReauth(`${API_VEHICLES}/${vehicleId}`, jsonToFormData(vehicleInfo), 'PUT');
    if (ack.type === 'success') {
      return ack;
    }
    throw new Error(ack.message || "Couldn't update vehicle");
  }

  const deleteVehicleById = async (vehicleId) => {
    const ack = await apiRequestWithReauth(`${API_VEHICLES}/${vehicleId}`, null, 'DELETE');
    if (ack.type === 'success') {
      return ack;
    }
    throw new Error(ack.message || "Couldn't delete vehicle");
  }

  const getVehicles = async () => {
    const ack = await apiRequestWithReauth(API_VEHICLES, null, 'GET');
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error(ack.message || 'Could not fetch vehicles');
  }

  const getVehicleDetails = async (vehicleId) => {
    const ack = await apiRequestWithReauth(`${API_VEHICLES}/${vehicleId}`, null, 'GET');
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error(ack.message || 'Could not fetch vehicle details');
  }

  const publishRide = async (rideDetails) => {
    const ack = await apiRequestWithReauth(API_RIDE, jsonToFormData(rideDetails), 'POST');
    // const ack = await apiRequestWithReauth(`${API_ENDPOINT}/test`, jsonToFormData(rideDetails), 'POST');
    if (ack.type === RES.SUCCESS) {
      return ack;
    }
    throw new Error(ack.message || 'Failed to publish ride');
  }

  const getRidesHistory = async (url) => {
    const ack = await apiRequestWithReauth(url, null, 'GET');
    if (ack.type === RES.SUCCESS) {
      return ack.payload;
    }
    throw new Error(ack.message || "Internal Server Error");
  }

  // ######################################################### FOR ADMINS #########################################################

  const getUsersList = async () => {
    const ack = await apiRequestWithReauth(API_ADMIN_LIST_USERS, null, 'GET')
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error(ack.message || 'Cannot fetch users list');
  }

  const getRiderRequests = async () => {
    const ack = await apiRequestWithReauth(API_ADMIN_DRIVER_REQUESTS, null, 'GET');
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error(ack.message || 'Cannot fetch rider requests');
  }

  const getVehicleRequests = async () => {
    const ack = await apiRequestWithReauth(API_ADMIN_VEHICLE_REQUESTS, null, 'GET');
    if (ack.type === 'success') {
      return ack.payload;
    }
    throw new Error(ack.message || 'Cannot fetch vehicle requests');
  }


  const updateRiderRequest = async (newState) => {
    const ack = await apiRequestWithReauth(API_ADMIN_DRIVER_REQUESTS, jsonToFormData(newState), 'PUT');
    if (ack.type === 'success') {
      return ack;
    }
    throw new Error(ack.message || 'Could not update the status');
  }
  const updateVehicleRequest = async (newState) => {
    const ack = await apiRequestWithReauth(API_ADMIN_VEHICLE_REQUESTS, jsonToFormData(newState), 'PUT');
    if (ack.type === 'success') {
      return ack;
    }
    throw new Error(ack.message || 'Could not update the status');
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

    syncUser,
    getUserDetails,
    updateUserDetails,

    loginUser,
    logoutUser,
    registerUser,
    forgotPassword,
    resetPassword,

    getRidesHistory,
    searchRide,
    getSearchHistory,
    fetchWalletTransactions,
    requestPayment,
    validatePayment,
    cancelPayment,

    createBank,
    getBanks,
    getBankDetails,
    updateBankById,
    deleteBankById,
    // Passenger Side Ride controls
    getRideDetails,
    // requestRide,


    // Driver
    uploadRiderDocs,
    updateDrivingLicense,
    createVehicle,
    getVehicles,
    getVehicleDetails,
    updateVehicleById,
    deleteVehicleById,
    publishRide,
    // getPassengers,

    // Admin
    getUsersList,
    getRiderRequests,
    getVehicleRequests,
    updateRiderRequest,
    updateVehicleRequest,
  };
};

export default useApi;
