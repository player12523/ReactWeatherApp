import type { Location, User } from '../../data/weather';

export async function toggleFavorite(location: Location, user: User | null) {
  if (!user) {
    alert("Please log in to manage your favorite locations.");
    return;
  }

  try {
    await fetch(`/api/${user.id}/favouritesIds/${location.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.error('Error toggling favorite status:', error);
  }
}