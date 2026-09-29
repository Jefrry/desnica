import { ERROR_MESSAGES, ERROR_STATUS } from '~/constants/errorConstants';

export function clientInterceptor(response: Response) {
  const isUnauthorized = response.status === ERROR_STATUS.UNAUTHORIZED;
  const isServer = typeof window === 'undefined';

  if (isUnauthorized && !isServer) {
    window.location.replace('/');
    throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
  }
}
