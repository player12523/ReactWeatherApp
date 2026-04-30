/* This is the main entry point for the Weather Application 
it shows the weather forcast for all saved locations.

functional components:
- Header: shows the title and description of the application
- Button to move from the home page to the add location page
  for each location based on id.
- The gernal weather for each location is shown in a card with the following information:
  = Location name
  = Current temperature
  = Weather description
  = An icon representing the current weather
- the weather should be orginised in this priority order: 
  > Location (province, city) (non-functional component)
  > favorite locations
  > other locations

non-functional components:
- The application should be responsive and work well on both desktop and mobile devices.
- The button should have a hover effect to indicate it is clickable.
- the button should first expand the information about the location for the day and 
  then move to the location page based on the id of the location.
- The application should have a clean and modern design, using a consistent color scheme and typography.

additional features inported from modules:
- navigation bar: allows users to navigate between different pages of the application, 
such as the home page, location page, sign in page, and settings page.
- search bar: allows users to search for specific locations.

Component mapping:

- index.html: home page
  = page title
  = location cards: show the weather forcast for each location
   > location information
    * location api details
    * weather api details
    * react weather updates
   > favourate locations
   > Time and date
  = search bar
  = navigation bar

- Location.html: location page
  = page title
  = location information
    > weather forcast for the location
    > Time and date
    > weather api details
  = back button to return to the home page
  = search bar
  = navigation bar

- login.html: sign in page
  = page title
  = sign in form
    > username and password fields
    > sign in button
      * check if user exists and password is correct
      * if successful, move to the home page and show the user's saved locations
      * if unsuccessful, show an error message
    > forgot password link (non-functional component)
  = sign up form
    > username, email, and password fields
    > sign up button
      * check if the email is already taken
      * if successful, create a new user and move to the home page
      * if unsuccessful, show an error message
  = back button to return to the home page
  = navigation bar

- Settings.html: settings page
  = page title
  = account information (if logged in)
    > username and email fields
    > update button to save changes to the user information
  = appearance settings
    > units of measurement (Celsius or Fahrenheit)
    > color scheme (light or dark mode)
    > save button to save changes to the appearance settings
  = privacy settings (non-functional component)
  = help and support section
  = about the application section
  = back button to return to the home page

- navigation bar
  = links to the home page, location page, sign in page, and settings page
  = the sign in page link should not be shown if the user is already signed in

- Search bar
  = input field for searching for specific locations
  = search button to execute the search and show the results on the home page
*/

//This is the main entry point for the Weather Application.




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

  // Checks whether a user is already logged in.
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  // Loads weather from the API whenever the search term changes.
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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-6">
          {locations.map((weather) => (
            <WeatherCard key={weather.id} Location={weather} User={user} />
          ))}
        </div>
      )}
    </div>
  );
}
