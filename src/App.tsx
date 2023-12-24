import { useTranslation } from "react-i18next";
import "@/app.scss";
import Error from "@components/Error";
import Loading from "@components/Loading";
import WeatherCard from "@components/WeatherCard";
import useFetch from "@hooks/useFetch";
import setTheme from "@utils/setTheme";
import useGetLocalData from "@hooks/useGetLocalData";
import useGeoLocation from "@hooks/useGeoLocation";

function App() {
  const { i18n } = useTranslation();
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme");

  // dark/light theme
  if (theme) setTheme(theme);

  // requesting geolocation data access from user
  useGeoLocation();

  // reading and validating localStorage data
  useGetLocalData({
    url: import.meta.env.VITE_PUBLIC_WEATHER_API,
    lang: i18n.language,
  });
  // fetching weather data
  const { data, error } = useFetch({
    url: import.meta.env.VITE_PUBLIC_WEATHER_API,
    lang: i18n.language,
  });

  if (!data) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <main>
      <WeatherCard data={data} />
    </main>
  );
}

export default App;
