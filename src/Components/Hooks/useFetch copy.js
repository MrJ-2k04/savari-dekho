import { PutObjectCommand } from "@aws-sdk/client-s3";
import { API_LOGIN, API_REGISTER, API_USERS, THIS_URL } from "Constants";
// import { compressImage, s3 } from "Services";
import { jsonToFormData, showError, showSuccess } from "Utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useFetch = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const nav = useNavigate();

  // const getSingleUser = async (id) => {
  //   // POST /users/:id

  //   return new Promise((resolve, reject) => {
  //     apiRequest(`${API_USERS}/${id}`).then(data => {
  //       data.user.details = JSON.parse(data.user.details);
  //       data.user.details.hobbies = JSON.parse(data.user.details.hobbies);
  //       resolve(data.user);
  //     }).catch(err => reject(err))
  //   })
  // };

  // const getAllUsers = async () => {
  //   return new Promise((resolve, reject) => {
  //     apiRequest(API_USERS)
  //       .then(data => {
  //         const users = data.users.map(user => {
  //           user.details = JSON.parse(user.details);
  //           user.details.hobbies = JSON.parse(user.details.hobbies);
  //           user = { created_at: user.created_at, ...user.details };
  //           return user;
  //         });
  //         resolve(users);
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // };


  // POST /register
  // const registerUser = (formData, file) => {
  //   setLoading(true);
  //   const userId = formData.get('mobileNumber');
  //   const fileName = userId + file.name.substring(file.name.lastIndexOf("."));

  //   // 1) Compress the Image
  //   compressImage(file).then(compressedImage => {
  //     // Add Profile Picture URL in FormData
  //     formData.append("profilePicture", `${process.env.REACT_APP_BUCKET_ACCESS_URL}/${fileName}`);

  //     // 2) Validate & Save data in SQL with Node API
  //     apiRequest(API_REGISTER, formData).then((data) => {
  //       if (!data) {
  //         throw new Error('Server Error');
  //       }
  //       if (!data.valid) {
  //         throw new Error(data.message || 'Invalid Data');
  //       }

  //       // 2.1) Get Buffer from the CompressedImage
  //       setLoading(true);
  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         const buffer = reader.result;

  //         // 3) Upload Image to Cloud
  //         uploadToR2(fileName, buffer, compressedImage.type).then(res => {
  //           showSuccess({ message: "User Saved Successfully!" }).then(() => setTimeout(() => {
  //             setResult(`${THIS_URL}/profile/${userId}`);
  //           }, 0));
  //         }).catch(err => {
  //           deleteUser(userId);
  //           showError({ title: "Can't Upload image!", message: err.message });
  //         }).finally(() => setLoading(false));
  //       }
  //       reader.onerror = e => {
  //         setLoading(false);
  //         showError({ title: 'Internal Error!', message: e.target.error });
  //       }
  //       reader.readAsArrayBuffer(compressedImage);

  //     }).catch(err => showError({ message: err.message }));
  //   }).catch(err => {
  //     setLoading(false);
  //     showError({ title: 'Image Compression Failed!', message: err.message });
  //   });

  // };  


  // POST /login
  // const loginUser = (credentials) => {
  //   setLoading(true);

  //   // Send credentials for API Request
  //   apiRequest(API_LOGIN, jsonToFormData(credentials)).then(data => {
  //     showSuccess({ message: data.message }).then(() => nav(`/profile/${data.userid}`));
  //   }).catch(err => {
  //     showError({ message: err.message });
  //   });
  // };

  // const deleteUser = async (id) => {
  //   // DELETE /products/:id
  //   apiRequest(`${API_USERS}/${id}`, null, 'DELETE').then(() => { }).catch(() => { });
  // };

  // const updateUser = () => {
  //   // Future
  // };

  const apiRequest = async (url, data = null, method = 'POST') => {
    setLoading(true);

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
          if (err.status === 0) {
            reject({ type: 'error', message: 'Server unreachable' });
          }
          reject(err.responseJSON);
        }
      });
    });
  };

  return {
    loading,
    result,
    getAllUsers,
    getSingleUser,
    registerUser,
  };
};

export default useFetch;
