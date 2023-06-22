interface IWeatherAPI_Hour {
  [time_epoch: string]: number; // 1687122000
  time: string; // "2023-06-19 00:00"
  temp_c: number;
  temp_f: number;
  is_day: number; // 1 | 0
  condition: {
    // https://www.weatherapi.com/docs/weather_conditions.json
    text: string; // "Patchy rain possible"
    icon: string; // "//cdn.weatherapi.com/weather/64x64/night/176.png"
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string; // "NNE"
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number; // 1 | 0
  chance_of_rain: number;
  will_it_snow: number; // 1 | 0
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

interface IWeatherAPI_Day {
  date: string; // "2023-06-19"
  date_epoch: number; // 1687132800
  day: {
    maxtemp_c: number; // max/min temeprature covers 24 hours range
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number; // 0 | 1
    daily_chance_of_rain: number;
    daily_will_it_snow: number; // 0 | 1
    daily_chance_of_snow: number;
    condition: {
      text: string; // "Moderate rain";
      icon: string; // "//cdn.weatherapi.com/weather/64x64/day/302.png";
      code: number; // weather code
    };
    uv: number;
  };
  astro: {
    sunrise: string; // "05:38 AM"
    sunset: string; // "08:19 PM"
    moonrise: string;
    moonset: string;
    moon_phase: string; // "Waxing Crescent"
    moon_illumination: string; // "1" percent
    is_moon_up?: number; // not described in the docs always 0
    is_sun_up?: number; // not described in the docs always 0
  };
  hour: IWeatherAPI_Hour[];
}

interface IWeatherAPI_Data {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string; // "Europe/Istanbul"
    localtime_epoch: number;
    localtime: string;
  };
  current: {
    last_updated_epoch: number; // 1687180500
    last_updated: string; // "2023-06-19 16:15"
    temp_c: number;
    temp_f: number;
    is_day: number; // 1 | 0
    condition: {
      text: string;
      icon: string; // icon "//cdn.weatherapi.com/weather/64x64/day/116.png";
      code: number; // https://www.weatherapi.com/docs/weather_conditions.json
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string; // "SW"
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
  };
  forecast: {
    forecastday: IWeatherAPI_Day[];
  };
}
