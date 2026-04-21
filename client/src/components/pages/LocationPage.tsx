import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { callWeatherLocation } from '../utilities/navigation';
import type { Location } from '../../types/weather';

export default function LocationPage() {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const data = await callWeatherLocation(Number(id));
      setLocation(data);
    }
    load();
  }, [id]);

  if (!location) return <p>Loading...</p>;

  return (
    <div>
      <h1>{location.LocationName}</h1>
      {/* Your detailed UI here */}
    </div>
  );
}