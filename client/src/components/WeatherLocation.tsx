import type { Location } from '../data/weather';
import type { User } from '../data/weather';
import { toggleFavorite } from './utilities/toggleFavourate';
import { HourlyWeather } from './utilities/HourlyWeather';

interface LocationCardProps {
  Location: Location;
  User: User | null;
}


export default function LocationPage({ location }: { location: Location }, {User}: LocationCardProps) {
  const weather = location.DailyWeather;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">

      {/* Header */}
      <div className="bg-slate-700 text-white rounded-xl p-5 shadow-sm">
        <h1 className="text-2xl font-bold">
          {location.LocationName}, {location.CountryName}
        </h1>
        {/* Left box: Star + Province */}
            <div className="flex flex-col items-start border 
                              border-slate-700 
                              rounded-md px-2 py-1 bg-slate-700">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(location, User);
                  }}
                  className="text-3xl text-yellow-400 leading-none"
                >
                  {User?.favouratesIds?.includes(location.id) ? "★" : "☆"}
                </button>

                <span className="mt-1 text-3xl font-semibold text-slate-200 uppercase tracking-wide">
                  {location.ProvinceName}
                </span>
            </div>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-200">
          <span> {location.Latitude}, {location.Longitude}</span>
          <span> {weather.DateTime}</span>
        </div>
      </div>

      {/* Main Weather Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="flex items-center justify-between flex-wrap gap-4">

          {/* Temps */}
          <div>
            <p className="text-slate-500 text-sm">Temperature</p>
            <p className="text-3xl font-bold text-slate-900">
              {weather.TemperatureMax}°C / {weather.TemperatureMin}°C
            </p>
          </div>

          {/* Icons */}
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <img
                src={`public/images/${weather.WeatherCodeDay}.png`}
                className="w-10 h-10"
              />
              <span className="text-xs text-slate-500 mt-1">Day</span>
            </div>

            <div className="flex flex-col items-center">
              <img
                src={`public/images/${weather.WeatherCodeNight}.png`}
                className="w-10 h-10"
              />
              <span className="text-xs text-slate-500 mt-1">Night</span>
            </div>
          </div>
        </div>
      </div>

      {/* Extra Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white p-4 rounded-lg border text-center">
          <p className="text-xs text-slate-500">Rainfall</p>
          <p className="font-bold text-slate-900">{weather.Rainfall} mm</p>
        </div>

        <div className="bg-white p-4 rounded-lg border text-center">
          <p className="text-xs text-slate-500">Humidity</p>
          <p className="font-bold text-slate-900">{weather.Humidity}%</p>
        </div>

        <div className="bg-white p-4 rounded-lg border text-center">
          <p className="text-xs text-slate-500">Wind Speed</p>
          <p className="font-bold text-slate-900">{weather.windSpeed} km/h</p>
        </div>

        <div className="bg-white p-4 rounded-lg border text-center">
          <p className="text-xs text-slate-500">Sunset</p>
          <p className="font-bold text-slate-900">{weather.sundown}</p>
        </div>

      </div>

      {/* Hourly Forecast */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <h2 className="font-semibold text-slate-900 mb-3">
          Hourly Forecast
        </h2>

        <div className="flex overflow-x-auto space-x-4 pb-2">
            <HourlyWeather timeSlots={location.DailyWeather.HourlyWeather}/>
        </div>
      </div>

    </div>
  );
}