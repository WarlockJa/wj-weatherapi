// reading localStorage for stored WeatherAPI data to avoid frequent API calls
// returning undefined if data not found, outdated, or Geolocation is different

import { useEffect } from "react";
import { useGeolocation } from "@context/GeolocationProvider";
import { useLocalDataUpdate } from "@/context/LocalDataProvider";

const coordinatesEqual = ({
  latitude1,
  longitude1,
  latitude2,
  longitude2,
}: {
  latitude1: number;
  longitude1: number;
  latitude2: number;
  longitude2: number;
}) => {
  // lowering coordinates precision for comparison
  const getToPrecision100 = (value: number) => {
    return Math.floor(value * 100);
  };

  if (getToPrecision100(latitude1) !== getToPrecision100(latitude2))
    return false;
  if (getToPrecision100(longitude1) !== getToPrecision100(longitude2))
    return false;
  return true;
};

export default function useGetLocalData({ url, lang }: IGetLocalStorageProps) {
  const geo = useGeolocation();
  const updateLocalData = useLocalDataUpdate();

  useEffect(() => {
    // reading localStorage for data
    const localStorage_wj_weatherapi = localStorage.getItem("wj_weatherapi");
    const weatherapiLocalData: IWeatherAPI_LocalData =
      localStorage_wj_weatherapi
        ? JSON.parse(localStorage_wj_weatherapi)
        : undefined;

    // data validation
    updateLocalData(null);
    // no local data
    if (!weatherapiLocalData) return;
    // no local data timestamp
    if (!weatherapiLocalData.timestamp) return;
    // local data url is different
    if (weatherapiLocalData.url !== url) return;
    // local data language is different (translation is partially fetched from the API)
    if (weatherapiLocalData.lang !== lang) return;
    // local data is more than 1 hour old
    if (weatherapiLocalData.timestamp + 60 * 60 * 1000 < Date.now()) return;
    // geolocation data is fetched from the hook but not present in stored data
    if (geo && !weatherapiLocalData.geolocation) return;
    // stored geolocation data is different from newly fetched
    if (
      geo &&
      weatherapiLocalData.geolocation &&
      !coordinatesEqual({
        latitude1: geo.latitude,
        longitude1: geo.longitude,
        latitude2: weatherapiLocalData.geolocation.latitude,
        longitude2: weatherapiLocalData.geolocation.longitude,
      })
    )
      return;

    // allow scenario where geo data is undefined but present in localStorage
    // as it is likely due to geolocation access authorization delay by the user
    updateLocalData(weatherapiLocalData);
  }, [geo]);
}
