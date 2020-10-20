import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert } from 'antd';
import { getCurrentUserName } from '@/utils/authority';

const userName = getCurrentUserName();

console.log("当前用户名：" + userName);
export default () => (

  <PageContainer>
    <Card>
      <Alert
        message="正在开发中。。。"
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
    </Card>
  </PageContainer>
);
