import { cryptoAssets, cryptoData } from './data';

export function fakeFetchCrypto() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 200);
  });
}

const KEY = process.env.REACT_APP_COINS_API_KEY;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': KEY,
  },
};

export const fetchCoins = async () => {
  try {
    const response = await fetch('https://openapiv1.coinstats.app/coins', options);
    const result = await response.json();

    return result;
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
};
export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 200);
  });
}
