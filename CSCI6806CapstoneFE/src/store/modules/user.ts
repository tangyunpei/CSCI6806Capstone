import { defineStore } from 'pinia';
import { createStorage } from '@pkg/util/storage';
import { store } from '@/store';
import { ACCESS_TOKEN, CURRENT_USER } from '@/store/mutationTypes';
import {
  doLogout,
  getUserInfo,
  updateUserProfile,
  changePassword,
  forgetPassword,
  resetPasswordConfirm,
  signIn,
  loginWithApple,
  loginWithGoogle,
  registration,
} from '@/services/auth';

const Storage = createStorage({ storage: localStorage });

interface UserInfo {
  email: string;
  name: string;
  pk: number;
  first_name?: string;
  last_name?: string;
  username: string;
  avatar_url?: string;
  phone_number: string;
  verification_tags: Record<string, string>[];
}

interface IUserState {
  token?: string;
  userInfo: Nullable<UserInfo>;
  lastUpdateTime: number;
}

interface SignInParams {
  email: string;
  password: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    userInfo: null,
    token: undefined,
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || Storage.get(CURRENT_USER, '') || {};
    },
    getToken(): string {
      return this.token || Storage.get(ACCESS_TOKEN, '');
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(token: string | undefined) {
      this.token = token || '';
      Storage.set(ACCESS_TOKEN, token);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      Storage.set(CURRENT_USER, info);
    },

    async SignIn(params: SignInParams) {
      try {
        const response = await signIn(params);

        if (response.key) {
          this.setToken(response.key);
        }
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async RegisterAndSignIn(params: any) {
      try {
        const response = await registration(params);

        if (response.key) {
          this.setToken(response.key);
        }
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async SignInWithGoogle(access_token: string) {
      try {
        const res = await loginWithGoogle(access_token);

        if (res.key) {
          this.setToken(res.key);
        }
        return Promise.resolve(res);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async SignInWithApple(code: string, id_token: string) {
      try {
        const res = await loginWithApple(code, id_token);

        if (res.key) {
          this.setToken(res.key);
        }
        return Promise.resolve(res);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async GetUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(res => {
            this.setUserInfo(res);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    async UpdateUserProfile(params: any) {
      return new Promise((resolve, reject) => {
        updateUserProfile(params)
          .then(res => {
            this.setUserInfo(res);
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    async ChangePassword(params: any) {
      return new Promise((resolve, reject) => {
        changePassword(params)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    async ForgetPassword(email: string) {
      return new Promise((resolve, reject) => {
        forgetPassword(email)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    async PasswordResetConfirm(params: any) {
      return new Promise((resolve, reject) => {
        resetPasswordConfirm(params)
          .then(res => {
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    async Logout() {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          // console.error('注销Token失败');
        }
      }
      this.logoutUserInfo();
      window.location.reload();
    },

    logoutUserInfo() {
      this.setToken(undefined);
      this.setUserInfo(null);
      Storage.remove(ACCESS_TOKEN);
      Storage.remove(CURRENT_USER);
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
