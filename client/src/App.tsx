import WeatherCard from './components/WeatherCard';
import type { Location } from './types/weather';
 
const testWeather: Location = {
  id: 1,
  LocationName: 'London',
  ProvinceName: 'Greater London',
  CountryName: 'United Kingdom',
  Latitude: 51.5074,
  Longitude: -0.1278,
  DailyWeather: {
    id: 1,
    DateTime: '2023-10-01',
    Rainfall: 5,
    WeatherCodeDay: 3,
    WeatherCodeNight: 1,
    TemperatureMax: 20,
    TemperatureMin: 10,
    Humidity: 65,
    windSpeed: 10,
    sundown: '18:30',
    HourlyWeather: [
      { id:1, DateTime: '2023-10-01 08:00', WeatherCode: 3, Temperature: 15, Rainfall: 0 },
      { id:2, DateTime: '2023-10-01 12:00', WeatherCode: 2, Temperature: 18, Rainfall: 2 },
      { id:3, DateTime: '2023-10-01 16:00', WeatherCode: 1, Temperature: 16, Rainfall: 3 },
      { id:4, DateTime: '2023-10-01 20:00', WeatherCode: 4, Temperature: 12, Rainfall: 5 }
    ]
  }
};
 
function App() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">WeatherApp</h1>
      <WeatherCard 
      Location={testWeather} User={null}/>
    </main>
  );
}
 
export default App;
