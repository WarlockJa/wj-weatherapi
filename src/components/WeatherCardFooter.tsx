import { format } from "date-fns";
import "./weathercardfooter.scss";

interface IWeatherCardFooterProps {
  data: IWeatherAPI_Data;
  activeHour: number;
  setActiveHour: (value: number) => void;
  setTranslateGraph: (value: number) => void;
  isCelcius: boolean;
}

const WeatherCardFooter = ({
  data,
  activeHour,
  setActiveHour,
  setTranslateGraph,
  isCelcius,
}: IWeatherCardFooterProps) => {
  const weatherCard__forecastDays = data.forecast.forecastday.map(
    (day, index) => (
      <button
        key={day.date}
        onClick={() => {
          setActiveHour(index * 24);
          setTranslateGraph(index === 0 ? new Date().getHours() : index * 24);
        }}
        className={
          Math.floor(activeHour / 24) === index
            ? "weatherCard__footer__item weatherCard__footer__item--selected"
            : "weatherCard__footer__item"
        }
      >
        <p className="item--dotw">{format(new Date(day.date), "eee")}</p>
        <img
          src={
            index === 0
              ? day.hour[new Date().getHours()].condition.icon
              : day.day.condition.icon
          }
          alt={
            index === 0
              ? day.hour[new Date().getHours()].condition.text
              : day.day.condition.text
          }
        />
        <div className="footer__item--avgTempWrapper">
          {isCelcius
            ? `${Math.floor(day.day.maxtemp_c)}°`
            : `${Math.floor(day.day.maxtemp_f)}°`}{" "}
          <span>
            {isCelcius
              ? `${Math.floor(day.day.mintemp_c)}°`
              : `${Math.floor(day.day.mintemp_f)}°`}
          </span>
        </div>
      </button>
    )
  );

  return <div className="weatherCard__footer">{weatherCard__forecastDays}</div>;
};

export default WeatherCardFooter;
