import type { User } from './weather';

const TOKEN_KEY = 'weather-app-token';

async function readJsonSafely(response: Response) {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      response.ok
        ? 'The server returned an invalid response.'
        : `The server returned an invalid response. Status: ${response.status}`,
    );
  }
}

async function requestJson<T>(url: string, options?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(url, options);
  } catch {
    throw new Error('Could not connect to the API server. Make sure the database/server project is running on localhost:3000.');
  }

  const data = await readJsonSafely(response);

  if (!response.ok) {
    const serverError = data && typeof data === 'object' && 'error' in data
      ? String((data as { error: unknown }).error)
      : `Request failed with status ${response.status}.`;

    throw new Error(serverError);
  }

  return data as T;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function authHeaders() {
  const token = getToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;

  try {
    return await requestJson<User>('/api/auth/me', {
      headers: authHeaders(),
    });
  } catch {
    clearToken();
    return null;
  }
}

export async function login(username: string, password: string): Promise<User> {
  const data = await requestJson<{ token: string; user: User }>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  setToken(data.token);
  return data.user;
}

export async function register(username: string, password: string): Promise<User> {
  const data = await requestJson<{ token: string; user: User }>('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  setToken(data.token);
  return data.user;
}

export async function logout() {
  try {
    await requestJson<{ message: string }>('/api/auth/logout', {
      method: 'POST',
      headers: authHeaders(),
    });
  } finally {
    clearToken();
  }
}

export async function deleteAccount() {
  await requestJson<{ message: string }>('/api/auth/me', {
    method: 'DELETE',
    headers: authHeaders(),
  });

  clearToken();
}
