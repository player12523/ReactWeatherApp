import type { HourlyWeather as HourlyWeatherType } from '../../data/weather';
import WeatherIcon from './WeatherIcons';

interface Props {
  timeSlots: HourlyWeatherType[];
}

// Renders hourly forecast items in a horizontal list.
export function HourlyWeather({ timeSlots }: Props) {
  return (
    <div className="flex overflow-x-auto space-x-2 py-2">
      {timeSlots.map((slot) => (
        <div
          key={slot.id}
          className="flex-shrink-0 w-24 bg-slate-100 rounded-lg p-2 text-center"
        >
          <p className="text-xs text-slate-500">
            {slot.DateTime}
          </p>

          <WeatherIcon code={slot.WeatherCode} className="w-4 h-4 mx-auto my-1" />

          <p className="text-sm font-medium text-slate-900">
            {slot.Temperature}°C
          </p>

          <p className="text-sm text-slate-600">
            {slot.Rainfall}mm
          </p>
        </div>
      ))}
    </div>
  );
}
