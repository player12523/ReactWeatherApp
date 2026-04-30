import { useState, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Location, User } from '../data/weather';
import { toggleFavorite } from './utilities/toggleFavourate';
import { HourlyWeather } from './utilities/HourlyWeather';
import { goToLocation } from './utilities/navigation';
import WeatherIcon from './utilities/WeatherIcons';

interface LocationCardProps {
  Location: Location;
  User: User | null;
}

export default function LocationCard({ Location, User }: LocationCardProps) {
  const navigate = useNavigate();
  const [favouriteIds, setFavouriteIds] = useState<number[]>(User?.favouratesIds ?? []);
  const isFavourite = favouriteIds.includes(Location.id);

  async function handleFavouriteClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    const result = await toggleFavorite(Location, User);
    if (!result) return;

    setFavouriteIds((current) =>
      result.isFavourite
        ? [...new Set([...current, Location.id])]
        : current.filter((id) => id !== Location.id),
    );
  }

  return (
    <div
      key={Location.id}
      onClick={() => goToLocation(navigate, Location.id)}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all cursor-pointer w-full"
    >
      <div className="bg-slate-700 rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
        <dl className="flex items-start justify-between gap-4 p-3">
          <div className="flex flex-col items-start border border-slate-700 rounded-md px-2 py-1 bg-slate-700">
            <button
              type="button"
              onClick={handleFavouriteClick}
              className="text-3xl text-yellow-400 leading-none"
              aria-label={isFavourite ? 'Remove favourite' : 'Add favourite'}
            >
              {isFavourite ? '★' : '☆'}
            </button>

            <span className="mt-1 text-2xl font-semibold text-slate-200 uppercase tracking-wide">
              {Location.ProvinceName}
            </span>
          </div>

          <div className="flex flex-col bg-slate-600/50 rounded-lg px-3 py-2 text-xs text-slate-200 min-w-[140px]">
            <div className="flex justify-between">
              <span>Rainfall</span>
              <span>{Location.DailyWeather.Rainfall}mm</span>
            </div>

            <div className="flex justify-around items-center mt-2 gap-3">
              <div className="flex text-sm flex-col items-center">
                Morning
                <WeatherIcon code={Location.DailyWeather.WeatherCodeDay} className="w-6 h-6 mt-1" />
                <span className="mt-1">
                  {Location.DailyWeather.TemperatureMax}°C
                </span>
              </div>

              <div className="flex text-sm flex-col items-center">
                Evening
                <WeatherIcon code={Location.DailyWeather.WeatherCodeNight} className="w-6 h-6 mt-1" />
                <span className="mt-1">
                  {Location.DailyWeather.TemperatureMin}°C
                </span>
              </div>
            </div>
          </div>
        </dl>

        <div className="p-4 sm:p-5 bg-white">
          <h2 className="font-bold text-slate-900 text-lg leading-snug">
            {Location.LocationName}, {Location.CountryName}
          </h2>

          <p className="text-slate-600 text-sm mt-1">
            {Location.DailyWeather.DateTime}
          </p>

          <dl className="mt-3 space-y-1 text-sm text-slate-700">
            <div className="time-scroll flex overflow-x-auto space-x-2 py-2">
              <HourlyWeather timeSlots={Location.DailyWeather.HourlyWeather} />
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
