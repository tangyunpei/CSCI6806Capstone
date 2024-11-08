import type {
  AxiosDefaults,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
} from 'axios';
import type { AxiosTransform } from './axiosTransform';

export type Numeric = string | number;

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
  authenticationScheme?: string;
}

// 上传文件
export interface UploadFileParams {
  // 其他参数
  data?: Recordable;
  // 文件参数接口字段名
  name?: string;
  // 文件
  file: File | Blob;
  // 文件名称
  filename?: string;
  [key: string]: any;
}

export interface RequestOptions {
  // 请求参数拼接到url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间
  formatDate?: boolean;
  // 是否显示提示信息
  isShowMessage?: boolean;
  // 是否解析成JSON
  isParseToJson?: boolean;
  // 成功的文本信息
  successMessageText?: string;
  // 是否显示成功信息
  isShowSuccessMessage?: boolean;
  // 是否显示失败信息
  isShowErrorMessage?: boolean;
  // 错误的文本信息
  errorMessageText?: string;
  // 是否加入url
  joinPrefix?: boolean;
  // 接口地址， 不填则使用默认apiUrl
  apiUrl?: string;
  // 错误消息提示类型
  errorMessageMode?: 'none' | 'modal';
  // 是否添加时间戳
  joinTime?: boolean;
  // 不进行任何处理，直接返回
  isTransformResponse?: boolean;
  // 是否返回原生响应头
  isReturnNativeResponse?: boolean;
  // 忽略重复请求
  ignoreCancelToken?: boolean;
  // 是否携带token
  withToken?: boolean;
}

export interface ResponseData<T = any> {
  code: string;
  data: T;
  message: string;
  success: boolean;
}

export type RequestConfig<D = any> = AxiosRequestConfig<D> & {
  silence?: boolean;
  cancelToken?: CancelToken;
  requestOptions?: RequestOptions;
};
export interface RequestInstance {
  defaults: AxiosDefaults;
  interceptors: {
    request: AxiosInterceptorManager<RequestConfig<any>>;
    response: AxiosInterceptorManager<AxiosResponse<ResponseData>>;
  };
  <T = any, D = any>(config: RequestConfig<D>): Promise<T>;
  <T = any, D = any>(url: string, config?: RequestConfig<D>): Promise<T>;

  getUri: <D = any>(config?: RequestConfig<D>) => string;

  request: <T = any, D = any>(config: RequestConfig<D>) => Promise<T>;

  get: <T = any, D = any>(url: string, config?: RequestConfig<D>) => Promise<T>;

  delete: <T = any, D = any>(
    url: string,
    config?: RequestConfig<D>
  ) => Promise<T>;

  head: <T = any, D = any>(
    url: string,
    config?: RequestConfig<D>
  ) => Promise<T>;

  options: <T = any, D = any>(
    url: string,
    config?: RequestConfig<D>
  ) => Promise<T>;

  post: <T = any, D = any>(
    url: string,
    data?: any,
    config?: RequestConfig<D>
  ) => Promise<T>;

  put: <T = any, D = any>(
    url: string,
    data?: any,
    config?: RequestConfig<D>
  ) => Promise<T>;

  patch: <T = any, D = any>(
    url: string,
    data?: any,
    config?: RequestConfig<D>
  ) => Promise<T>;
}
