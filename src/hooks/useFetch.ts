import { useEffect, useState } from "react";
import { useGeolocation } from "@context/GeolocationProvider";
import { useLocalData } from "@/context/LocalDataProvider";

export default function useFetch({ url, lang }: IFetchProps) {
  const [data, setData] = useState<IWeatherAPI_Data | undefined | null>();
  const [error, setError] = useState(null);
  const geo = useGeolocation();
  const localData = useLocalData();

  // TODO add timestamp refetch?
  useEffect(() => {
    // found valid local data, or localStorage is being read, no API call necessary
    if (localData || localData === undefined) {
      setData(localData?.data);
      return;
    }

    // flag to cancel fetch by IP if geolocation request is in progress
    // necessary because geolocation data may be delayed
    let cancelFetch = false;
    if (!geo) {
      // no geolocation data, fetching weather by the IP
      console.log("fetching IP weather data");
      fetch(`${url}forecast.json?q=auto:ip&days=3&lang=${lang}`, {
        method: "GET",
        headers: {
          key: import.meta.env.VITE_PUBLIC_WEATHER_API_KEY!,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (cancelFetch) return;
          setData(result);
          const newLocalStorageData: IWeatherAPI_LocalData = {
            timestamp: Date.now(),
            data: result,
            url,
            lang,
          };
          localStorage.setItem(
            "wj_weatherapi",
            JSON.stringify(newLocalStorageData)
          );
        })
        .catch((error) => setError(error));
    } else {
      console.log("fetching geolocation weather data");
      // raising flag to cancel possible weather data by IP request
      cancelFetch = true;
      fetch(
        `${url}forecast.json?q=${geo.latitude.toString()},${geo.longitude.toString()}&days=3&lang=${lang}`,
        {
          method: "GET",
          headers: {
            key: import.meta.env.VITE_PUBLIC_WEATHER_API_KEY!,
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          const newLocalStorageData: IWeatherAPI_LocalData = {
            timestamp: Date.now(),
            data: result,
            url,
            lang,
            geolocation: {
              latitude: geo.latitude,
              longitude: geo.longitude,
              accuracy: geo.accuracy,
            },
          };

          localStorage.setItem(
            "wj_weatherapi",
            JSON.stringify(newLocalStorageData)
          );
        })
        .catch((error) => setError(error));
    }
  }, [url, lang, geo, localData]);

  return { data, error };
}
