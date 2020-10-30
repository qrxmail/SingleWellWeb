import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

import { fakeAccountLoginOut } from '../../services/login';
import { setCurrentUserName, setAuthority } from '@/utils/authority';

class AvatarDropdown extends React.Component {
  onMenuClick = async (event) => {
    const { key } = event;

    if (key === 'logout') {
      const response = await fakeAccountLoginOut();
      // 登出成功
      if (response.status === 'ok') {
        // 设置系统当前登录用户为访客
        setCurrentUserName('guset');
        setAuthority("guset");
        window.location.href = '/user/login';
      }
    }

    history.push(`/account/${key}`);
  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          {/* <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" /> */}
          <Avatar  size="small" className={styles.avatar} style={{ backgroundColor: '#1890ff'}} icon={<UserOutlined />} />
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
        <span className={`${styles.action} ${styles.account}`}>
          <Spin
            size="small"
            style={{
              marginLeft: 8,
              marginRight: 8,
            }}
          />
        </span>
      );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
