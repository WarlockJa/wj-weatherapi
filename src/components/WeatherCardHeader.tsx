import { format } from "date-fns";
import "./weathercardheader.scss";
import { useTranslation } from "react-i18next";
import { enUS, ru } from "date-fns/locale";

interface IWeatherCardHeaderProps {
  data: IWeatherAPI_Data;
  isCelcius: boolean;
  setIsCelcius: (value: boolean) => void;
  activeHour: number;
}

const WeatherCardHeader = ({
  data,
  isCelcius,
  activeHour,
  setIsCelcius,
}: IWeatherCardHeaderProps) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="weatherCard__header">
      <div className="weatherCard__header__today">
        <div className="today__temperatureWarpper">
          <div className="today--iconWrapper">
            <img
              src={
                // if active hour is 0, which can happen only after clicking on the day icon
                // show current hour data for the current day and average data for the forecast
                // if not show data for the active hour
                activeHour % 24 !== 0
                  ? data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                      activeHour % 24
                    ].condition.icon
                  : Math.floor(activeHour / 24) === 0
                  ? data.forecast.forecastday[0].hour[new Date().getHours()]
                      .condition.icon
                  : data.forecast.forecastday[Math.floor(activeHour / 24)].day
                      .condition.icon
              }
              alt="condition"
            />
          </div>
          <div className="today--temperature">
            {
              // if active hour is 0, which can happen only after clicking on the day icon
              // show current hour data for the current day and average data for the forecast
              // if not show data for the active hour with added differentiation between C and F
              activeHour % 24 !== 0
                ? isCelcius
                  ? data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                      activeHour % 24
                    ].temp_c
                  : data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                      activeHour % 24
                    ].temp_f
                : Math.floor(activeHour / 24) === 0
                ? isCelcius
                  ? data.forecast.forecastday[0].hour[new Date().getHours()]
                      .temp_c
                  : data.forecast.forecastday[0].hour[new Date().getHours()]
                      .temp_f
                : isCelcius
                ? data.forecast.forecastday[Math.floor(activeHour / 24)].day
                    .maxtemp_c
                : data.forecast.forecastday[Math.floor(activeHour / 24)].day
                    .maxtemp_f
            }
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
            {t("header_precipitation")}:{" "}
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
            {t("header_humidity")}:{" "}
            {
              data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                activeHour % 24
              ].humidity
            }
            %
          </p>
          <p>
            {t("header_wind")}:{" "}
            {isCelcius
              ? `${
                  data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                    activeHour % 24
                  ].wind_kph
                } ${t("km/h")}`
              : `${
                  data.forecast.forecastday[Math.floor(activeHour / 24)].hour[
                    activeHour % 24
                  ].wind_mph
                } ${t("mph")}`}
          </p>
        </div>
      </div>
      <div className="weatherCard__header__date">
        <h1 className="weatherCard__header__date--header">
          {t("header_weather")}
        </h1>
        <p>
          {format(
            new Date(
              data.forecast.forecastday[Math.floor(activeHour / 24)].date
            ),
            "eeee",
            { locale: i18n.language === "ru" ? ru : enUS }
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
  );
};

export default WeatherCardHeader;
