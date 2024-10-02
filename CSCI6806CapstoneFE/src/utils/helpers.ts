import { formatDistanceToNow } from 'date-fns';
import { ElNotification } from 'element-plus';

export const getRelativeTime = (date: string) => {
  if (!date) return { value: 0, unit: 'seconds' };
  try {
    const relativeTime = formatDistanceToNow(new Date(date), {
      addSuffix: true,
    });
    const [value, unit, diff] = relativeTime.split(' ').slice(-3);
    if (diff !== 'ago') {
      return { value: 0, unit: 'seconds' };
    }
    if (value === 'a') {
      return { value: 1, unit };
    }
    return { value: parseInt(value, 10), unit };
  } catch (error) {
    return { value: 0, unit: 'seconds' };
  }
};

export const getUserDisplayName = (user: any) => {
  if (!user) {
    return 'Unknown';
  }
  // when user has first_name and last_name
  if (user?.first_name && user?.last_name) {
    return `${user.first_name}.${user.last_name.charAt(0).toUpperCase()}.`;
  }
  // when user has only username
  return user?.username;
};

export const showFailToast = (message: string | object) => {
  if (typeof message === 'object') {
    ElNotification({
      type: 'error',
      ...message,
    });
  } else {
    ElNotification({
      type: 'error',
      message,
      duration: 3000,
    });
  }
};

export const showSuccessToast = (message: string | object) => {
  if (typeof message === 'object') {
    ElNotification({
      type: 'success',
      ...message,
    });
  } else {
    ElNotification({
      type: 'success',
      message,
      duration: 3000,
    });
  }
};

export const showLoadingToast = (message: string | object) => {
  if (typeof message === 'object') {
    ElNotification({
      type: 'info', // 'loading' is not a valid type for ElNotification
      message: typeof message === 'string' ? message : (message as { message: string }).message,
      duration: 0,
      showClose: true,
    });
  } else {
    ElNotification({
      type: 'info', // 'loading' is not a valid type for ElNotification
      message,
      duration: 0,
      showClose: true,
    });
  }
};
