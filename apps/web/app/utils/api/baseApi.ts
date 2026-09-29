import { fetchApi } from './fetchApi';
import { useRuntimeConfig } from '#imports';

export type BaseApiProps = {
  path: string;
  method?: string;
  body?: Record<string, unknown>;
  cookies?: Record<string, unknown>;
  query?: Record<string, string>;
  signal?: AbortSignal;
  isImage?: boolean;
};

export function baseApi<T>({
  path,
  method = 'GET',
  body = {},
  cookies,
  query,
  signal,
}: BaseApiProps) {
  const config = useRuntimeConfig();
  const baseUrl = import.meta.server ? config.strapiUrl : config.public.strapiUrl;
  const url = new URL(`api/${path.replace(/^\/+/, '')}`, `${baseUrl.replace(/\/$/, '')}/`);
  const headers = new Headers();

  Object.entries(query ?? {}).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  if (cookies) {
    headers.set(
      'Cookie',
      Object.entries(cookies)
        .map(([key, value]) => `${key}=${String(value)};path=/`)
        .join('; '),
    );
  }

  return fetchApi<T>({
    url: url.toString(),
    method,
    body,
    headers,
    signal,
  });
}
