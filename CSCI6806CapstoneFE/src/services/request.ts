import axios from 'axios';
import { storage } from '@pkg/util/storage';
import { isNumeric } from '../utils/basic';
import { showFailToast } from '@/utils/helpers';
import { ACCESS_TOKEN } from '@/store/mutationTypes';
import { useAuthStoreWidthOut, AuthRouter } from '@/store/modules/auth';
import { useUserStoreWidthOut } from '@/store/modules/user';
import { getAppEnvConfig } from '@/utils';
import type { CreateAxiosOptions, RequestInstance } from './types';

const authStore = useAuthStoreWidthOut();
const { VITE_API_URL } = getAppEnvConfig();
const CURRENT_SESSION = crypto.randomUUID();
function createAxios(config?: Partial<CreateAxiosOptions>) {
  const instance: RequestInstance = axios.create({
    baseURL: VITE_API_URL,
    timeout: 15000,
    withCredentials: true,
    validateStatus: status => status >= 200 && status <= 599,
    ...config,
  });

  instance.interceptors.request.use(
    (requestConfig: Partial<CreateAxiosOptions>) => {
      // add a random session id every time a user open the app
      (requestConfig as Recordable).headers['Current-Session'] =
        CURRENT_SESSION;

      const token = storage.get(ACCESS_TOKEN);
      const withToken = requestConfig?.requestOptions?.withToken ?? true;

      if (token) {
        (requestConfig as Recordable).headers.Authorization = `Bearer ${token}`;
      } else if (withToken) {
        authStore.showAuth(AuthRouter.Login);
      }

      return requestConfig;
    }
  );

  // HTTPresponse拦截
  instance.interceptors.response.use(res => {
    if (res.status === 200) return handleSuccess(res);

    return handleFailure(res);
  }, handleFailure);

  return instance;
}

function handleSuccess(res: any) {
  const { data } = res;

  if (res.config.requestOptions?.isTransformResponse) {
    return data;
  }

  if (isNumeric(data.code)) {
    const code = Number(data.code);
    if (code >= 200 && code < 300) return data.data;
    if (code === 401) handleTokenExpiration();
  } else if (res.config.requestOptions?.isShowErrorMessage ?? true) {
    showFailToast(data.message);
  }

  return Promise.reject(res);
}

function handleFailure(error: any) {
  showFailToast('Network Error');
  return Promise.reject(error);
}

function handleTokenExpiration() {
  const useUserStore = useUserStoreWidthOut();

  useUserStore.logoutUserInfo();
  authStore.showAuth(AuthRouter.Login);
}

export const request = createAxios();
