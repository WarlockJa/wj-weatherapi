import "./weathercard.scss";

const WeatherCard = ({ data }: { data: IWeatherAPI_Data }) => {
  const weatherCard__header = data.forecast.forecastday.map((day) => (
    <div key={day.date} className="weatherCard__header__item">
      <div>{day.day.avgtemp_c}</div>
      <div>
        <img src={day.day.condition.icon} alt="weather" />
      </div>
    </div>
  ));

  return (
    <div className="weatherCard">
      <div className="weatherCard__header">{weatherCard__header}</div>
    </div>
  );
};

export default WeatherCard;
