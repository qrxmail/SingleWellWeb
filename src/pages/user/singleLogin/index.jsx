
import React from 'react';
import { connect } from 'umi';

const SingleLogin = (props) => {

  // 定义属性
  const {
    dispatch,
    userLogin = {},
  } = props;

  // 从url中获取用户名
  const userName = props.location.query.username;
  // 需要传入的参数
  let values = { userName: userName, password: 'ant.design', type: 'account' }
  // 分发请求地址
  dispatch({
    type: 'singleLogin/login',
    payload: values,
  });

  // 必须要有返回页面
  return (
    <>
      {
        userLogin.status === 'ok' ?
          <p>单点登录成功</p> :
          <p>账户或密码错误</p>
      }
    </>);
};

// 建立连接器：singleLogin是空间名，不可随意定义
export default connect(({ singleLogin }) => ({
  userLogin: singleLogin,
}))(SingleLogin);
