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
    <article
      key={Location.id}
      onClick={() => goToLocation(navigate, Location.id)}
      className="weather-card w-full min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md cursor-pointer"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 bg-slate-700 p-4 text-slate-100">
        <div className="min-w-0 flex flex-col items-start">
          <button
            type="button"
            onClick={handleFavouriteClick}
            className="text-3xl text-yellow-400 leading-none"
            aria-label={isFavourite ? 'Remove favourite' : 'Add favourite'}
          >
            {isFavourite ? '★' : '☆'}
          </button>

          <span className="province-title mt-2 max-w-full font-semibold uppercase tracking-wide leading-tight">
            {Location.ProvinceName}
          </span>
        </div>

        <div className="w-[clamp(7.75rem,34vw,10rem)] shrink-0 rounded-lg bg-slate-600/50 px-3 py-2 text-xs text-slate-100">
          <div className="flex justify-between gap-2">
            <span>Rainfall</span>
            <span className="whitespace-nowrap">{Location.DailyWeather.Rainfall}mm</span>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 text-center">
            <div className="min-w-0 flex flex-col items-center text-sm">
              <span className="text-xs sm:text-sm">Morning</span>
              <WeatherIcon code={Location.DailyWeather.WeatherCodeDay} className="w-6 h-6 mt-1" />
              <span className="mt-1 whitespace-nowrap">
                {Location.DailyWeather.TemperatureMax}°C
              </span>
            </div>

            <div className="min-w-0 flex flex-col items-center text-sm">
              <span className="text-xs sm:text-sm">Evening</span>
              <WeatherIcon code={Location.DailyWeather.WeatherCodeNight} className="w-6 h-6 mt-1" />
              <span className="mt-1 whitespace-nowrap">
                {Location.DailyWeather.TemperatureMin}°C
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 bg-white">
        <h2 className="font-bold text-slate-900 text-lg leading-snug break-words">
          {Location.LocationName}, {Location.CountryName}
        </h2>

        <p className="text-slate-600 text-sm mt-1">
          {Location.DailyWeather.DateTime}
        </p>

        <div className="mt-3 min-w-0 overflow-hidden">
          <HourlyWeather timeSlots={Location.DailyWeather.HourlyWeather} />
        </div>
      </div>
    </article>
  );
}
