import { useEffect, useState } from "react";

interface IWeatherAPI_LocalData {
  data: IWeatherAPI_Data;
  timestamp: number;
  url: string;
}

export default function useFetch(url: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IWeatherAPI_Data | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const localStorage_wj_weatherapi = localStorage.getItem("wj_weatherapi");
    const weatherapiLocalData: IWeatherAPI_LocalData =
      localStorage_wj_weatherapi
        ? JSON.parse(localStorage_wj_weatherapi)
        : undefined;

    // forming initial state if there is data and it is not older than 1 hour
    if (
      !weatherapiLocalData ||
      !weatherapiLocalData.timestamp ||
      !weatherapiLocalData.url ||
      weatherapiLocalData.url !== url ||
      weatherapiLocalData.timestamp + 6 * 60 * 1000 < Date.now()
    ) {
      console.log("fetching new weather data");
      fetch(url, {
        method: "GET",
        headers: {
          key: import.meta.env.VITE_PUBLIC_WEATHER_API_KEY!,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          localStorage.setItem(
            "wj_weatherapi",
            JSON.stringify({ timestamp: Date.now(), data: result, url })
          );
        })
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    } else {
      setData(weatherapiLocalData.data);
      setIsLoading(false);
    }
  }, [url]);

  return { data, isLoading, error };
}
