import * as CryptoJS from 'crypto-js';

const getImageUrl = (email) => {
  const URL = `https://www.gravatar.com/avatar/${CryptoJS.MD5(email).toString()}`;
  return URL;
};

export default getImageUrl;