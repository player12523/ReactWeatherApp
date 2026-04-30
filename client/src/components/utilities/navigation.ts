import type { Location } from '../../data/weather';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SETTINGS: '/settings',
  LOCATION: (id: number) => `/location/${id}`,
};

export function navigateTo(navigate: (path: string) => void, path: string) {
  navigate(path);
}

export function goToHome(navigate: (path: string) => void) {
  navigate(ROUTES.HOME);
}

export function goToLogin(navigate: (path: string) => void) {
  navigate(ROUTES.LOGIN);
}

export function goToSettings(navigate: (path: string) => void) {
  navigate(ROUTES.SETTINGS);
}

export function goToLocation(navigate: (path: string) => void, locationId: number) {
  navigate(ROUTES.LOCATION(locationId));
}

export async function callWeatherLocation(locationId: number): Promise<Location | null> {
  try {
    const response = await fetch(`/api/weather/${locationId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
}
