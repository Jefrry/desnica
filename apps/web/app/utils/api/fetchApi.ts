import { clientInterceptor } from './clientInterceptor';
import { ERROR_MESSAGES } from '~/constants/errorConstants';

interface ApiErrorPayload {
  error?: {
    message?: string;
  };
  errors?: unknown;
}

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ApiError';
    this.status = status;
  }
}

type FetchApiProps = {
  url: string;
  method?: string;
  body?: Record<string, unknown>;
  headers?: Headers;
  signal?: AbortSignal;
};

export async function fetchApi<T>({
  url,
  method = 'GET',
  body = {},
  headers,
  signal,
}: FetchApiProps): Promise<T> {
  const reqHeaders = new Headers();
  let reqBody: BodyInit | undefined;

  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    reqHeaders.append('Content-Type', 'application/json');
    reqBody = JSON.stringify(body);
  }

  if (headers) {
    headers.forEach((value, key) => {
      reqHeaders.append(key, value);
    });
  }

  const response = await fetch(url, {
    credentials: 'include',
    method,
    headers: reqHeaders,
    body: reqBody,
    signal,
  });

  clientInterceptor(response);

  if (!response.ok) {
    const errorResponse = await response.json().catch(() => null) as ApiErrorPayload | null;
    const message = errorResponse?.error?.message ?? ERROR_MESSAGES.API_REQUEST_FAILED(response.status);
    throw new ApiError(message, response.status, { cause: errorResponse });
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return await response.json() as T;
}
