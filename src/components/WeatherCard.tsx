import { useState } from "react";
import "./weathercard.scss";
import { format } from "date-fns";
import getGraphData from "../utils/getGraphData";
import GraphSVG from "./GraphSVG";

const WeatherCard = ({ data }: { data: IWeatherAPI_Data }) => {
  // switching between C and imperial units
  const [isCelcius, setIsCelcius] = useState(true);
  // active hour do display data
  const [activeHour, setActiveHour] = useState(0);
  // graph translateX value based on day card clicked
  const [translateGraph, setTranslateGraph] = useState(new Date().getHours());

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

  // graph data
  const graphData = getGraphData({
    data: data.forecast.forecastday,
    value: isCelcius ? "temp_c" : "temp_f",
  });

  return (
    <div className="weatherCard">
      <div className="weatherCard__header">
        <div className="weatherCard__header__today">
          <div className="today__temperatureWarpper">
            <div className="today--iconWrapper">
              <img src={data.current.condition.icon} alt="condition" />
            </div>
            <div className="today--temperature">
              {isCelcius
                ? data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                    activeHour % 24
                  ].temp_c
                : data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                    activeHour % 24
                  ].temp_f}
            </div>
            <button
              className="today__CeFaSwitch"
              title="Celcius/Farenheit"
              onClick={() => setIsCelcius(!isCelcius)}
            >
              <div className="today__CeFaSwitch--foreground today__CeFaSwitch--item">
                {isCelcius ? "°C" : "°F"}
              </div>
              <div className="today__CeFaSwitch--background today__CeFaSwitch--item">
                {isCelcius ? "°F" : "°C"}
              </div>
            </button>
          </div>
          <div className="today__additionalInfoWrapper">
            <p>
              Precipitation:{" "}
              {isCelcius
                ? data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                    activeHour % 24
                  ].precip_mm
                : data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                    activeHour % 24
                  ].precip_in}
              %
            </p>
            <p>
              Humidity:{" "}
              {
                data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                  activeHour % 24
                ].humidity
              }
              %
            </p>
            <p>
              Wind:{" "}
              {isCelcius
                ? `${
                    data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                      activeHour % 24
                    ].wind_kph
                  } km/h`
                : `${
                    data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                      activeHour % 24
                    ].wind_mph
                  } mph`}
            </p>
          </div>
        </div>
        <div className="weatherCard__header__date">
          <h1 className="weatherCard__header__date--header">Weather</h1>
          <p>
            {format(
              new Date(
                data.forecast.forecastday[Math.floor(activeHour / 24)].date
              ),
              "eeee"
            )}
          </p>
          <p>
            {
              data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                activeHour % 24
              ].condition.text
            }
          </p>
        </div>
      </div>

      <GraphSVG
        isCelcius
        callback={setActiveHour}
        result={graphData.result}
        min={graphData.min}
        max={graphData.max}
        translateGraph={translateGraph}
        activeHour={activeHour}
      />

      <div className="weatherCard__footer">{weatherCard__forecastDays}</div>
    </div>
  );
};

export default WeatherCard;
