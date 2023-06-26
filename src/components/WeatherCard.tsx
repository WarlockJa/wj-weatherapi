import React, { useEffect, useState } from "react";
import "./weathercard.scss";
import getGraphData from "../utils/getGraphData";
import GraphSVG from "./GraphSVG";
import WeatherCardHeader from "./WeatherCardHeader";
import WeatherCardFooter from "./WeatherCardFooter";

export interface IGraphData {
  result: { time: string; value: number[] }[];
  min: number;
  max: number;
}

const getGraphDataField = (value: number, isCelcius: boolean) => {
  switch (value) {
    case 0:
      return isCelcius ? ["temp_c"] : ["temp_f"];
    case 1:
      return isCelcius ? ["precip_mm"] : ["precip_in"];
    case 2:
      return ["humidity"];
    case 3:
      return ["uv"];
    case 4:
      return isCelcius
        ? ["wind_kph", "wind_degree"]
        : ["wind_mph", "wind_degree"];
    default:
      return ["temp_c"];
  }
};

const graphSelectorButtons = [
  "Temperature",
  "Precipitation",
  "Humidity",
  "UV",
  "Wind",
];

const WeatherCard = ({ data }: { data: IWeatherAPI_Data }) => {
  // switching between C and imperial units
  const [isCelcius, setIsCelcius] = useState(true);
  // active hour do display data
  const [activeHour, setActiveHour] = useState(new Date().getHours());
  // graph translateX value based on day card clicked
  const [translateGraph, setTranslateGraph] = useState(new Date().getHours());
  // graph data
  const [graphData, setGraphData] = useState<IGraphData>();
  const [graphType, setGraphType] = useState<number>(0);

  useEffect(() => {
    // graph data
    setGraphData(() =>
      getGraphData({
        data: data.forecast.forecastday,
        value: getGraphDataField(graphType, isCelcius),
      })
    );
  }, [graphType, isCelcius]);

  const graphSelectorContent = graphSelectorButtons.map((item, index) => (
    <React.Fragment key={item}>
      {index !== 0 && (
        <div className="weatherCard__graphSelector--divider"></div>
      )}
      <button
        className={
          graphType === index
            ? "weatherCard__graphSelector--button weatherCard__graphSelector--buttonActive"
            : "weatherCard__graphSelector--button"
        }
        onClick={() => setGraphType(index)}
      >
        {item}
      </button>
    </React.Fragment>
  ));

  return (
    <div className="weatherCard">
      <WeatherCardHeader
        activeHour={activeHour}
        isCelcius={isCelcius}
        setIsCelcius={setIsCelcius}
        data={data}
      />

      <div className="weatherCard__graphSelector">{graphSelectorContent}</div>

      {graphData && (
        <GraphSVG
          isCelcius
          callback={setActiveHour}
          result={graphData.result}
          min={graphData.min}
          max={graphData.max}
          translateGraph={translateGraph}
          activeHour={activeHour}
          graphType={graphType}
        />
      )}

      <WeatherCardFooter
        activeHour={activeHour}
        data={data}
        isCelcius={isCelcius}
        setActiveHour={setActiveHour}
        setTranslateGraph={setTranslateGraph}
      />
    </div>
  );
};

export default WeatherCard;
