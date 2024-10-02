import { storage } from '@pkg/util/storage';
import { ACCESS_TOKEN } from '@/store/mutationTypes';

export const isLogin = () => Boolean(storage.get(ACCESS_TOKEN));
