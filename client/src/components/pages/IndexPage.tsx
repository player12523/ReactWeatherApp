import { useState, useEffect } from 'react';
import WeatherCard from '../WeatherCard';
import type { Location } from '../../data/weather';
 
export default function LoginPage() {
  // It starts as an empty array.
  // 'setLocation' is the function we call to update it.
  const [Location, setLocation] = useState<Location[]>([]);
 
  // A second state variable to track whether data is loading.
  const [loading, setLoading] = useState(true);

  //this will search the inputs
  const [search, setSearch] = useState('');
 
  // useEffect runs the function inside it when the component
  // first mounts (appears on screen). The empty array []
  // means 'run this only once'.
  useEffect(() => {
    fetchLocation();
  }, [search]);
 
  // This function calls our API and stores the result in state.
  async function fetchLocation() {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
  
      const res = await fetch(`/api/Location?${params}`);
      const data: Location[] = await res.json();
      setLocation(data);
    } catch (err) {
      console.error('Failed to fetch Locations:', err);
    } finally {
      setLoading(false);
    }
  }
 
  // While loading, show a simple message instead of the grid.
  if (loading) return <p className="p-6">Loading…</p>;
 
  // Once loaded, send a confermation responce
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        type="text"
        placeholder="Search by place…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 px-4 py-2 rounded-lg border
                border-slate-300 focus:outline-none
                focus:border-sky-400 focus:ring-1
                focus:ring-sky-400"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2
                      lg:grid-cols-3 gap-6">
        {Location.map((weather) => (
          <WeatherCard Location={weather} User={null} />
        ))}
      </div>
    </div>
  );
}
