import { StringUndefined } from '@/types';
import Cookies from 'js-cookie'

export type CookieKey = 'token'

const getCookie = (key: CookieKey): StringUndefined => Cookies.get(key);

const setCookie = (key: CookieKey, value: string, options?: Cookies.CookieAttributes): StringUndefined => Cookies.set(key, value, options);

const removeCookie = (key: CookieKey): void => Cookies.remove(key);

export { getCookie, setCookie, removeCookie };
