export interface GlobConfig {
  title: string;
  apiUrl: string;
  uploadUrl?: string;
  imgUrl?: string;
}

export interface GlobEnvConfig {
  // 接口地址
  VITE_GLOB_API_URL: string;
  // 图片上传地址
  VITE_GLOB_UPLOAD_URL?: string;
  // 图片前缀地址
  VITE_GLOB_IMG_URL?: string;
}
