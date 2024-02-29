import { useContext } from 'react';
import { Layout, Spin, Alert, Space } from 'antd';
import Header from './Header';
import Sider from './Sider';
import Content from './Content';
import CryptoContext, { useCrypto } from '../../context/crypto-context';

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function CustomLayout() {
  const { isLoading, isError, errorMessage } = useContext(CryptoContext);
  const { assets } = useCrypto();

  if (isLoading) {
    return (
      <Spin
        tip="Loading"
        size="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <div className="content" />
      </Spin>
    );
  }

  if (isError) {
    return (
      <Layout style={contentStyle}>
        <Space>
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
            style={{ width: '50%' }}
          />
        </Space>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      <Layout>
        {!assets.length ? (
          <Layout.Content style={contentStyle}>
            <Alert
              message="Welcome to Your Crypto Portfolio!"
              description="It looks like you haven't added any assets yet. Click the 'Add Asset' button to start building your portfolio."
              type="info"
              showIcon
              closable
              style={{ width: '50%' }}
            />
          </Layout.Content>
        ) : (
          <>
            <Sider />
            <Content />
          </>
        )}
      </Layout>
    </Layout>
  );
}
