import { defineStore } from 'pinia';
import { store } from '@/store';

export enum AuthRouter {
  Login,
  SignUp,
  VerifyCode,
  ForgetPassword,
}

export interface IAuthState {
  authFlag: boolean;
  showSignoutConfirm: boolean;
  currentRouter: AuthRouter;
  historyStack: AuthRouter[];
}

export const useAuthStore = defineStore({
  id: 'app-auth',
  state: (): IAuthState => ({
    authFlag: false,
    showSignoutConfirm: false,
    currentRouter: AuthRouter.Login,
    historyStack: [],
  }),

  actions: {
    showAuth(router: AuthRouter) {
      this.currentRouter = router;
      this.authFlag = true;
    },

    closeAuth(reloading?: boolean) {
      if (reloading) {
        window.location.reload();
        return;
      }

      this.historyStack = [];
      this.authFlag = false;
    },

    switchRouter(router: AuthRouter) {
      this.historyStack.push(this.currentRouter);
      this.currentRouter = router;
    },

    replace(router: AuthRouter) {
      this.historyStack = [];
      this.currentRouter = router;
    },

    back() {
      if (this.historyStack.length > 0) {
        const router = this.historyStack.pop();
        this.currentRouter = <AuthRouter>router;
      }
    },

    showSignout() {
      this.showSignoutConfirm = true;
    },

    closeSignout() {
      this.showSignoutConfirm = false;
    },
  },
});

export function useAuthStoreWidthOut() {
  return useAuthStore(store);
}
