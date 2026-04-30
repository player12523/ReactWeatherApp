import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WeatherLocation from '../WeatherLocation';
import { callWeatherLocation } from '../utilities/navigation';
import type { Location } from '../../data/weather';

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

  return <WeatherLocation location={location} />;
}
