import type { Location, User } from '../../data/weather';
import { authHeaders } from '../../data/auth';

// Sends the favourite change to the protected API route.
export async function toggleFavorite(location: Location, user: User | null) {
  if (!user) {
    alert('Please log in to manage your favourite locations.');
    return null;
  }

  try {
    const response = await fetch(`/api/favourites/${location.id}/toggle`, {
      method: 'POST',
      headers: authHeaders(),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error ?? 'Could not update favourite.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error toggling favourite status:', error);
    alert('Could not update favourite. Please try again.');
    return null;
  }
}
