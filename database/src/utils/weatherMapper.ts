function firstDailyWeather(location: any) {
  return Array.isArray(location.dailyWeather) ? location.dailyWeather[0] : location.dailyWeather;
}

export function mapHourlyWeather(hourly: any) {
  return {
    id: hourly.id,
    DateTime: hourly.dateTime,
    WeatherCode: hourly.weatherCode,
    Temperature: hourly.temperature,
    Rainfall: hourly.rainfall,
  };
}

export function mapDailyWeather(daily: any) {
  return {
    id: daily.id,
    DateTime: daily.dateTime,
    Rainfall: daily.rainfall,
    WeatherCodeDay: daily.weatherCodeDay,
    WeatherCodeNight: daily.weatherCodeNight,
    TemperatureMax: daily.temperatureMax,
    TemperatureMin: daily.temperatureMin,
    Humidity: daily.humidity,
    windSpeed: daily.windSpeed,
    sundown: daily.sundown,
    HourlyWeather: (daily.hourlyWeather ?? []).map(mapHourlyWeather),
  };
}

export function mapLocation(location: any) {
  const daily = firstDailyWeather(location);

  return {
    id: location.id,
    LocationName: location.locationName,
    ProvinceName: location.provinceName,
    CountryName: location.countryName,
    Latitude: location.latitude,
    Longitude: location.longitude,
    DailyWeather: daily ? mapDailyWeather(daily) : null,
  };
}

export function mapUser(user: any) {
  return {
    id: user.id,
    username: user.username,
    favouratesIds: (user.favourites ?? []).map((favourite: any) => favourite.locationId),
  };
}
