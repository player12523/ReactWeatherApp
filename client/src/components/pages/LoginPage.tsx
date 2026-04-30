
import { useState, useEffect } from 'react';
import type { User } from '../../data/weather';
 
export default function LoginPage() {
  // It starts as an empty array.
  // 'setBooks' is the function we call to update it.
  const [User, setUser] = useState<User[]>([]);
 
  // A second state variable to track whether data is loading.
  const [loading, setLoading] = useState(true);
 
  // useEffect runs the function inside it when the component
  // first mounts (appears on screen). The empty array []
  // means 'run this only once'.
  useEffect(() => {
    fetchUser();
  }, []);
 
  // This function calls our API and stores the result in state.
  async function fetchUser() {
    try {
      const res = await fetch('/api/User');
      const data: User[] = await res.json();
      setUser(data);
    } catch (err) {
      console.error('Failed to fetch Users:', err);
    } finally {
      setLoading(false);
    }
  }
 
  // While loading, show a simple message instead of the grid.
  if (loading) return <p className="p-6">Loading…</p>;
 
  // Once loaded, send a confermation responce
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2
                      lg:grid-cols-3 gap-6">
        there should be an output.
      </div>
  );
}
