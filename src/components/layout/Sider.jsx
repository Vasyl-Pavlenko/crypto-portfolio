import { useContext } from 'react';
import { Layout, Card, Statistic, List, Typography, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../helpers/utils';
import CryptoContext from '../../context/crypto-context';

const siderStyle = {
  padding: '1rem',
};
export default function Sider() {
  const { assets } = useContext(CryptoContext);

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map(({ id, totalAmount, totalProfit, amount, grow, growPercent }) => (
        <Card key={id} style={{ marginBottom: '1rem' }}>
          <Statistic
            title={capitalize(id)}
            value={totalAmount}
            precision={2}
            valueStyle={{ color: grow ? '#3f8600' : '#cf1322' }}
            prefix={grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: 'Total Profit',
                value: totalProfit,
                withTag: true,
              },
              { title: 'Asset Amount', value: amount, isPlain: true },
            ]}
            renderItem={({ title, value, withTag, isPlain }) => (
              <List.Item>
                <span>{title}</span>

                <span>
                  {withTag && <Tag color={grow ? 'green' : 'red'}>{growPercent}%</Tag>}

                  {isPlain && value}

                  {!isPlain && (
                    <Typography.Text type={grow ? 'success' : 'danger'}>
                      {value.toFixed(2)}$
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
