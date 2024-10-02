import { request } from '@/services/request';

/**
 * @description: 用户登录
 */
export function signIn(params: any) {
  return request({
    url: '/api/auth/login/',
    method: 'POST',
    data: params,
    requestOptions: {
      withToken: false,
      isShowErrorMessage: false,
    },
  });
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return request({
    url: '/api/auth/user/',
    method: 'GET',
  });
}

export function updateUserProfile(params: any) {
  return request({
    url: `/api/auth/user/`,
    method: 'PUT',
    data: params,
  });
}

/**
 * @description: 用户登出
 */
export function doLogout() {
  return request({
    url: '/api/auth/logout/',
    method: 'POST',
  });
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params: any) {
  return request({
    url: `/api/auth/password/change/`,
    method: 'POST',
    data: params,
  });
}

export function forgetPassword(email: string) {
  return request({
    url: '/api/auth/password/reset/',
    method: 'POST',
    data: { email },
    requestOptions: {
      withToken: false,
    },
  });
}

export function resetPasswordConfirm(params: any) {
  return request({
    url: '/api/auth/password/reset/confirm/',
    method: 'POST',
    data: params,
    requestOptions: {
      withToken: false,
    },
  });
}

export function sendEmailOpt(email: string, password: string) {
  return request({
    url: '/api/auth/registerion/send_email_otp/',
    method: 'POST',
    data: { email, password },
    requestOptions: {
      withToken: false,
      isShowErrorMessage: false,
      isTransformResponse: true,
    },
  });
}

export interface RegistrationParams {
  email: string;
  password1: string;
  password2: string;
  otp: string;
}

export function registration(params: RegistrationParams) {
  return request({
    url: '/api/auth/registration/',
    method: 'POST',
    data: params,
    requestOptions: {
      withToken: false,
    },
  });
}

export function loginWithGoogle(access_token: string) {
  return request({
    url: '/api/auth/social/google/',
    method: 'POST',
    data: { access_token },
    requestOptions: {
      withToken: false,
    },
  });
}

export function loginWithApple(code: string, id_token: string) {
  return request({
    url: '/api/auth/social/apple/',
    method: 'POST',
    data: { code, id_token },
    requestOptions: {
      withToken: false,
    },
  });
}
