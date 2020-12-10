const axiosWithTimeout = (axios, time) => Promise.race([
  axios,
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('request timeout'));
    }, time);
  }),
]);

export default axiosWithTimeout;
