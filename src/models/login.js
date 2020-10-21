import { history } from 'umi';
import { fakeAccountLogin } from '@/services/login';
import { setAuthority, setCurrentUserName } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },

  effects: {

    *login({ payload }, { call, put }) {

      // 请求登录接口
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // 登录成功
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

      // 设置系统当前登录用户
      setCurrentUserName(payload.userName);
    },

  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // 设置用户权限
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    }
  },
};
export default Model;
