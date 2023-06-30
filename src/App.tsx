import { useTranslation } from "react-i18next";
import "./app.scss";
import Error from "./components/Error";
import Loading from "./components/Loading";
import WeatherCard from "./components/WeatherCard";
import useFetch from "./hooks/useFetch";
import setTheme from "./utils/setTheme";

function App() {
  const { i18n } = useTranslation();
  const params = new URLSearchParams(window.location.search);
  const theme = params.get("theme");
  if (theme) setTheme(theme);
  const { isLoading, data, error } = useFetch(
    import.meta.env.VITE_PUBLIC_WEATHER_API.concat(`&lang=${i18n.language}`)
  );

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <main>
      <WeatherCard data={data!} />
    </main>
  );
}

export default App;
