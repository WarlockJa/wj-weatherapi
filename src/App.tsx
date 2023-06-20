import "./app.scss";
import Error from "./components/Error";
import Loading from "./components/Loading";
import WeatherCard from "./components/WeatherCard";
import useFetch from "./hooks/useFetch";

function App() {
  const { isLoading, data, error } = useFetch(
    import.meta.env.VITE_PUBLIC_WEATHER_API
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
