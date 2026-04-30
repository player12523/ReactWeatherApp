/*
This is the location page for the Weather Application
it shows the weather forcast for a specific location based on the id of the location.

functional components:
- Header: shows the title and description of the application
- Button to move from the location page to the home page
- The gernal weather for the location is shown in a card with the 
  following information (in that order):
  = Location name
  = Current temperature
  = Weather description
  = An icon representing the current weather
  = A 5 day weather forcast for the location (non-functional component)
  = A 24 hour weather forcast for the location (non-functional component)
  = humidity, wind speed, and other weather details (non-functional component)

non-functional components:
- The application should be responsive and work well on both desktop and mobile devices.
- Responsive design: the layout should adapt to different screen sizes and orientations.

additional features inported from modules:
- navigation bar: allows users to navigate between different pages of the application,
such as the home page, location page, sign in page, and settings page.
- search bar: allows users to search for specific locations.

*/


import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WeatherLocation from '../WeatherLocation';
import { callWeatherLocation } from '../utilities/navigation';
import type { Location } from '../../data/weather';

export default function LocationPage() {
  const { id } = useParams();
  const [location, setLocation] = useState<Location | null>(null);

  // Uses the id from the route to request one weather location.
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
