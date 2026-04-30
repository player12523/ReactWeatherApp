type WeatherIconMap = {
  [key: number]: string;
};

// Maps database weather codes to local SVG files.
const weatherIcons: WeatherIconMap = {
  0: 'sunny.svg',
  1: 'partly cloudy.svg',
  2: 'cloudy.svg',
  3: 'raining.svg',
  4: 'snowy.svg',
  5: 'thunderstorm.svg',
  6: 'hail.svg',
  7: 'Tornado.svg',
};

type WeatherIconProps = {
  code: number;
  className?: string;
};

export default function WeatherIcon({ code, className = 'w-6 h-6' }: WeatherIconProps) {
  const icon = weatherIcons[code] || 'cloudy.svg';

  return (
    <img
      src={`/weather/${icon}`}
      className={className}
      alt="weather icon"
    />
  );
}
