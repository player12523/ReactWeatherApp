import type { User } from './weather';

const TOKEN_KEY = 'weather-app-token';

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

  const response = await fetch('/api/auth/me', {
    headers: authHeaders(),
  });

  if (!response.ok) {
    clearToken();
    return null;
  }

  return response.json();
}

export async function login(username: string, password: string): Promise<User> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? 'Login failed');
  }

  setToken(data.token);
  return data.user;
}

export async function register(username: string, password: string): Promise<User> {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error ?? 'Register failed');
  }

  setToken(data.token);
  return data.user;
}

export async function logout() {
  await fetch('/api/auth/logout', {
    method: 'POST',
    headers: authHeaders(),
  });

  clearToken();
}

export async function deleteAccount() {
  const response = await fetch('/api/auth/me', {
    method: 'DELETE',
    headers: authHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error ?? 'Could not delete account');
  }

  clearToken();
}
