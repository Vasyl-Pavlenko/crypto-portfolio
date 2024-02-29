import { createContext, useState, useEffect, useContext } from 'react';
import { fetchCoins, fetchAssets } from '../api/api';
import { percentDifference } from '../helpers/utils';

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  isLoading: true,
  isError: false,
  errorMessage: '',
  addAsset: () => {},
});

export function CryptoContextProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  const mapAssets = (assets, result) =>
    assets.map(({ id, amount, price }) => {
      const coin = result.find((c) => c.id === id);

      return {
        grow: price < coin.price,
        growPercent: percentDifference(price, coin.price),
        totalAmount: (amount + (coin.amount || 0)) * coin.price,
        totalProfit: (amount + (coin.amount || 0)) * coin.price - amount * price,
        name: coin.name,
        id,
        amount,
        price,
      };
    });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage('');
      try {
        const { result } = await fetchCoins();
        const storedAssets = localStorage.getItem('cryptoAssets');

        if (storedAssets) {
          setAssets(JSON.parse(storedAssets));
        } else {
          const fetchedAssets = await fetchAssets();
          setAssets(mapAssets(fetchedAssets, result));
          localStorage.setItem('cryptoAssets', JSON.stringify(mapAssets(fetchedAssets, result)));
        }

        setCrypto(result);
      } catch (error) {
        setIsError(true);
        setErrorMessage('Error fetching data. Please try again later');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const addAsset = (newAsset) => {
    setAssets((prev) => {
      const existingAssetIndex = prev.findIndex((asset) => asset.id === newAsset.id);

      if (existingAssetIndex !== -1) {
        const updatedAssets = [...prev];
        const existingAsset = updatedAssets[existingAssetIndex];

        if (existingAsset.price !== undefined) {
          existingAsset.amount += newAsset.amount;
          existingAsset.totalAmount = existingAsset.amount * existingAsset.price;
          existingAsset.date = newAsset.date;
        }

        localStorage.setItem('cryptoAssets', JSON.stringify(updatedAssets));
        return updatedAssets;
      } else {
        const updatedAssets = mapAssets([...prev, newAsset], crypto);

        localStorage.setItem('cryptoAssets', JSON.stringify(updatedAssets));
        return updatedAssets;
      }
    });
  };

  return (
    <CryptoContext.Provider value={{ isLoading, isError, errorMessage, crypto, assets, addAsset }}>
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
