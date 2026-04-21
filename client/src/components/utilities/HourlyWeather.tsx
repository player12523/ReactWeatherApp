import type { HourlyWeather as HourlyWeatherType } from '../../data/weather';

interface Props {
  timeSlots: HourlyWeatherType[];
}

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

          <img
            src={`public/images/${slot.WeatherCode}.png`}
            alt="WeatherIcon"
            className="w-4 h-4 mx-auto my-1"
          />

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