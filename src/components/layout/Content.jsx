import { Layout, Typography } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
  flexDirection: 'column',  
};

export default function Content() {
  const { assets, crypto } = useCrypto();

  const calculateTotalPortfolioValue = () => {
    return assets
      .map(({ amount, id }) => amount * cryptoPriceMap[id])
      .reduce((acc, value) => acc + value, 0)
      .toFixed(2);
  };

  const cryptoPriceMap = crypto.reduce((acc, curr) => {
    acc[curr.id] = curr.price;

    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: 'left', color: '#fff' }}>
        Portfolio: {calculateTotalPortfolioValue()}$
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
