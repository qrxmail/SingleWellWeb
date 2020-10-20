import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority, setCurrentUserName } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'singleLogin',

  // 必须要定义state
  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);

      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // 登录成功：跳转到请求页面/欢迎页
      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
      // 登录失败：跳转到登录页面
      else {
        window.location.href = '/user/login';
      }

      // 设置系统当前登录用户
      setCurrentUserName(payload.userName);
    },

  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // 设置系统登录用户权限
      setAuthority(payload.currentAuthority);
      // 必须要有返回值
      return { ...state, status: payload.status, type: payload.type };
    },
  },

};
export default Model;
