import { Tooltip, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { connect, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import NoticeIconView from './NoticeIconView';
const ENVTagColor = {
  dev: 'orange',
  test: 'green',
  pre: '#87d068',
};

const GlobalHeaderRight = (props) => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="生产设备"
        options={[
          {
            label: <a href="/DeviceLedgers/ProductDevice">生产设备</a>,
            value: '生产设备',
          },
          {
            label: <a href="/DeviceLedgers/PressureVesselDevice">压力容器</a>,
            value: '压力容器',
          },
          {
            label: <a href="/DeviceLedgers/PressurePipeDevice">压力管道</a>,
            value: '压力管道',
          },
          {
            label: <a href="/DeviceLedgers/ValvePitDevice">阀井阀门</a>,
            value: '阀井阀门',
          },
          {
            label: <a href="/DeviceLedgers/PressureRegulatingStation">调压箱调压柜</a>,
            value: '调压箱调压柜',
          },
        ]} // onSearch={value => {
      //   //console.log('input', value);
      // }}
      />
      <Tooltip title="使用文档">
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://pro.ant.design/docs/getting-started"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>
      <NoticeIconView />
      <Avatar />
      {REACT_APP_ENV && (
        <span>
          <Tag color={ENVTagColor[REACT_APP_ENV]}>{REACT_APP_ENV}</Tag>
        </span>
      )}
      {/* <SelectLang className={styles.action} /> */}
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
