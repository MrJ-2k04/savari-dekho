
import { API_GET_PASSENGERS, API_PASSENGER_CANCEL_RIDE, API_PASSENGER_CONFIRM_RIDE, API_PASSENGER_END_RIDE, API_PASSENGER_REQUEST_RIDE, API_PASSENGER_SEND_OTP, API_PASSENGER_START_RIDE, API_PASSENGER_UPDATE_STATUS, API_REFRESH_TOKEN, API_RIDE, API_RIDE_CANCEL, API_RIDE_END, API_RIDE_START, API_SEARCH, API_USER_ME, RES } from "Store/constants";
import { selectAccessToken, selectRefreshToken } from "Store/selectors";
import { authActions } from "Store/slices";
import { jsonToFormData } from "Utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useRideApi = () => {
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

    // ######################################################### FOR AUTHENTICATED USERS #########################################################

    const getRidesHistory = async (url) => {
        const ack = await apiRequestWithReauth(url, null, 'GET');
        if (ack.type === RES.SUCCESS) {
            return ack.payload;
        }
        throw new Error(ack.message || "Internal Server Error");
    }

    // ######################################################### FOR PASSENGERS #########################################################

    // Passenger Side

    const requestRide = async (rideId, rideData) => {
        const ENDPOINT = API_PASSENGER_REQUEST_RIDE.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, jsonToFormData(rideData));
        if (ack.type === RES.SUCCESS) {
            return ack.message;
        }
        throw new Error(ack.message || "Failed to request ride");
    }
    const confirmRide = async (rideId, data) => {
        const ENDPOINT = API_PASSENGER_CONFIRM_RIDE.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, jsonToFormData(data), "PUT");
        if (ack.type === RES.SUCCESS) {
            return ack.message;
        }
        throw new Error(ack.message || "Failed to confirm ride");
    }
    const cancelRideBooking = async (rideId) => {
        const ENDPOINT = API_PASSENGER_CANCEL_RIDE.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, null, "PUT");
        if (ack.type === RES.SUCCESS) {
            return ack.message;
        }
        throw new Error(ack.message || "Failed to cancel ride");
    }

    // ######################################################### FOR DRIVERS #########################################################

    const publishRide = async (rideDetails) => {
        const ack = await apiRequestWithReauth(API_RIDE, jsonToFormData(rideDetails), 'POST');
        // const ack = await apiRequestWithReauth(`${API_ENDPOINT}/test`, jsonToFormData(rideDetails), 'POST');
        if (ack.type === RES.SUCCESS) {
            return ack;
        }
        throw new Error(ack.message || 'Failed to publish ride');
    }
    const updateRide = async (rideId, rideDetails) => {
        const ack = await apiRequestWithReauth(`${API_RIDE}/${rideId}`, jsonToFormData(rideDetails), 'PUT');
        // const ack = await apiRequestWithReauth(`${API_ENDPOINT}/test`, jsonToFormData(rideDetails), 'POST');
        if (ack.type === RES.SUCCESS) {
            return ack;
        }
        throw new Error(ack.message || 'Failed to update ride');
    }



    // Driver Side Ride Controls
    const getPassengers = async (rideId) => {
        const ENDPOINT = API_GET_PASSENGERS.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, null, "GET");
        if (ack.type === RES.SUCCESS) {
            return ack.payload;
        }
        throw new Error(ack.message || "Cannot fetch passengers");
    }
    const updatePassengerStatus = async (rideId, data) => {
        // Include passengerId in data

        const ENDPOINT = API_PASSENGER_UPDATE_STATUS.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, jsonToFormData(data), "PUT");
        if (ack.type === RES.SUCCESS) {
            return ack.message;
        }
        throw new Error(ack.message || "Cannot update passenger status");
    }
    const sendOtpToPassenger = async (rideId, passengerId) => {
        const ENDPOINT = API_PASSENGER_SEND_OTP.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, jsonToFormData({ passengerId }), "PUT");
        if (ack.type === RES.SUCCESS) {
            return ack.payload;
        }
        throw new Error(ack.message || "Cannot send otp to passenger");
    }
    const startPassengerRide = async (rideId, passengerId, otp) => {
        const ENDPOINT = API_PASSENGER_START_RIDE.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, jsonToFormData({ passengerId, otp }), "PUT");
        if (ack.type === RES.SUCCESS) {
            return ack.message;
        }
        throw new Error(ack.message || "Cannot start passenger's ride");
    }
    const endPassengerRide = async (rideId, passengerId) => {
        const ENDPOINT = API_PASSENGER_END_RIDE.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, jsonToFormData({ passengerId }), "PUT");
        if (ack.type === RES.SUCCESS) {
            return ack.message;
        }
        throw new Error(ack.message || "Cannot end passenger's ride");
    }
    const startWholeRide = async (rideId) => {
        const ENDPOINT = API_RIDE_START.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, null, "PUT");
        if (ack.type === RES.SUCCESS) {
            return ack.message;
        }
        throw new Error(ack.message || "Cannot start the ride");
    }
    const endWholeRide = async (rideId) => {
        const ENDPOINT = API_RIDE_END.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, null, "PUT");
        if (ack.type === RES.SUCCESS) {
            return ack.message;
        }
        throw new Error(ack.message || "Cannot end the ride");
    }
    const cancelWholeRide = async (rideId) => {
        const ENDPOINT = API_RIDE_CANCEL.replace(":rideId", rideId);
        const ack = await apiRequestWithReauth(ENDPOINT, null, "PUT");
        if (ack.type === RES.SUCCESS) {
            return ack.message;
        }
        throw new Error(ack.message || "Cannot cancel the ride");
    }

    // ######################################################### FOR ADMINS #########################################################



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

        getRidesHistory,
        searchRide,
        // Passenger Side Ride controls
        getRideDetails,
        requestRide,
        confirmRide,
        cancelRideBooking,
        sendOtpToPassenger,
        startPassengerRide,
        endPassengerRide,
        // Driver
        publishRide,
        updateRide,
        getPassengers,
        updatePassengerStatus,
        startWholeRide,
        endWholeRide,
        cancelWholeRide,
        // Admin
    };
};

export default useRideApi;
