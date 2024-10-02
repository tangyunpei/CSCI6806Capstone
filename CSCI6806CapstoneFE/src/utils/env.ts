export const getAppEnvConfig = () => {
  const {
    VITE_API_URL,
    VITE_CDN_URL,
    VITE_GOOGLE_AUTH_CLIENT_ID,
    VITE_APPLE_AUTH_CALLBACK_URL,
    VITE_APPLE_AUTH_CLIENT_ID,
    VITE_GTM_ID,
  } = import.meta.env;

  return {
    VITE_API_URL,
    VITE_CDN_URL,
    VITE_GOOGLE_AUTH_CLIENT_ID,
    VITE_APPLE_AUTH_CALLBACK_URL,
    VITE_APPLE_AUTH_CLIENT_ID,
    VITE_GTM_ID,
  };
};
