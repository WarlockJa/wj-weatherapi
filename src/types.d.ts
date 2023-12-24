interface IGetLocalStorageProps {
  url: string;
  lang: string;
}

interface IWeatherAPI_LocalData {
  data: IWeatherAPI_Data;
  timestamp: number;
  url: string;
  lang: string;
  geolocation?: {
    latitude: number;
    longitude: number;
    altitude?: null;
    accuracy?: number;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
  };
}

interface IFetchProps {
  url: string;
  lang: string;
}
