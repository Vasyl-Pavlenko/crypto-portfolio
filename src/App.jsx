import CustomLayout from './components/layout/CustomLayout';
import { CryptoContextProvider } from './context/crypto-context';

export default function App() {
  return (
    <CryptoContextProvider>
      <CustomLayout />
    </CryptoContextProvider>
  );
}
