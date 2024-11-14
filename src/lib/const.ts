import { browser, dev } from '$app/environment';

export const GLOBAL_ANIMATION_DURATION = 250;

export const IS_BROWSER = browser;
export const IS_SERVER = !browser;

export const IS_DEV = dev;
export const IS_PROD = !dev;
