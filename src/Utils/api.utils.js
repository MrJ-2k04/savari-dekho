

// export const apiRequest = async (url, data = null, method = 'POST', headerOptions = {}) => {
//     const headers = {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
//         ...headerOptions,
//     };

//     return new Promise((resolve, reject) => {
//         window.jQuery.ajax({
//             url,
//             type: method,
//             data: data,
//             processData: false,
//             contentType: false,
//             cache: false,
//             headers,
//             success: (data) => {
//                 resolve(data);
//             },
//             error: async (err) => {
//                 if (err.status === 0) return reject({ type: 'error', message: 'Server unreachable' });
//                 if (!err.responseJSON) return reject({ type: 'error', message: err.responseText || err.statusText });
//                 reject(err.responseJSON);
//             }
//         });
//     });
// }