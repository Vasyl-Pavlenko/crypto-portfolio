import { useEffect, useState } from 'react';
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function Header() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const handleKeypress = (event) => {
      if (event.key === '/') {
        setIsSelectOpen((prev) => !prev);
      }
    };
    document.addEventListener('keypress', handleKeypress);
    return () => document.removeEventListener('keypress', handleKeypress);
  }, []);

  const handleSelect = (value) => {
    setCoin(crypto.find(({ id }) => id === value));
    setModal(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={isSelectOpen}
        onSelect={handleSelect}
        onClick={() => setIsSelectOpen((prev) => !prev)}
        value="press / to open"
        options={crypto.map(({ id, name, icon }) => ({
          label: name,
          value: id,
          icon,
        }))}
        optionRender={({ data }) => (
          <Space>
            <img style={{ width: 20 }} src={data.icon} alt={data.label} />
            {data.label}
          </Space>
        )}
        aria-label="Press / to open select"
      />

      <Button type="primary" onClick={() => setDrawer(true)}>
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => setDrawer(false)}
        open={drawer}
        destroyOnClose>
        <AddAssetForm onClose={() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
