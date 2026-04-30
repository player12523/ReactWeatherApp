import { useState, useEffect } from 'react';
import WeatherCard from '../WeatherCard';
import type { Location, User } from '../../data/weather';
import { fetchWeather } from '../../data/weather';
import { getCurrentUser } from '../../data/auth';

export default function IndexPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  useEffect(() => {
    async function loadLocations() {
      try {
        setLoading(true);
        const data = await fetchWeather(search);
        setLocations(data);
      } catch (err) {
        console.error('Failed to fetch locations:', err);
      } finally {
        setLoading(false);
      }
    }

    loadLocations();
  }, [search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by place…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400"
        />
      </div>

      {loading ? (
        <p className="p-6">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((weather) => (
            <WeatherCard key={weather.id} Location={weather} User={user} />
          ))}
        </div>
      )}
    </div>
  );
}
