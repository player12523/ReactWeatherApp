export interface User {
  id: number;
  username: string;
  favouratesIds: number[];
}

export interface Location {
  id: number;
  LocationName: string;
  ProvinceName: string;
  CountryName: string;
  Latitude: number;
  Longitude: number;
  DailyWeather: DailyWeather;
}

export interface HourlyWeather {
  id: number;
  DateTime: string;
  WeatherCode: number;
  Temperature: number;
  Rainfall: number;
}

export interface DailyWeather {
  id: number;
  DateTime: string;
  Rainfall: number;
  WeatherCodeDay: number;
  WeatherCodeNight: number;
  TemperatureMax: number;
  TemperatureMin: number;
  Humidity: number;
  windSpeed: number;
  sundown: string;
  HourlyWeather: HourlyWeather[];
}

export async function fetchWeather(search = ''): Promise<Location[]> {
  const params = new URLSearchParams();
  if (search.trim()) params.set('search', search.trim());

  const response = await fetch(`/api/weather?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  return response.json();
}
