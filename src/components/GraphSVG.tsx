import React from "react";
import "./graphsvg.scss";
import { format } from "date-fns";
import getLineSegmentPercent from "../utils/getLineSegmentPercent";
import { IGraphData } from "./WeatherCard";

interface IGraphSVGData extends IGraphData {
  isCelcius: boolean;
  callback: (value: number) => void;
  translateGraph: number;
  activeHour: number;
  graphType: number;
}

const STEP = 40; // space taken by an hour data on teh graph in px
const BLOCK_SIZE = 3; // number of hours in a merged display block (for better results should be odd)
const GRAPH_HEIGHT = 100; // height of the graph svg in px
const UNDER_GRAPH_OFFSET = 20; // additional space for the labels under the graph

const GraphSVG = (graphData: IGraphSVGData) => {
  // graph width in px
  const graphWidth = (graphData.result.length - 1) * STEP;
  // generating points data for svg graph
  const points = graphData.result
    .reduce(
      (result, item, index) =>
        result.concat(
          `\n${index * STEP},${getLineSegmentPercent({
            x: item.value[0],
            min: graphData.min,
            max: graphData.max,
          })}`
        ),
      `00,${GRAPH_HEIGHT}`
    )
    .concat(`\n${graphWidth},${GRAPH_HEIGHT}`);

  // aria-labels for graph temperature numbers
  const graphLabels = graphData.result.map((hour, index) => {
    const ariaLabel = `${hour.value}°${
      graphData.isCelcius ? "Celcius" : "Farenheit"
    } ${format(new Date(hour.time), "eeee do kk:00")}`;

    // generating svg elements for a middle hour of the BLOCK_SIZE
    // (e.g. BLOCK_SIZE = 5 generating for every 3rd hour)
    if ((index + Math.ceil(BLOCK_SIZE / 2)) % BLOCK_SIZE === 0) {
      return (
        <React.Fragment key={hour.time}>
          {/* on graph label */}
          <text
            className={graphData.activeHour === index ? "activeHour" : ""}
            aria-label={ariaLabel}
            style={{ font: "bold 13px arial", textAnchor: "middle" }}
            x={index * STEP}
            y={
              graphData.graphType === 4
                ? 12
                : // calculating offset based on min/max graph data
                  getLineSegmentPercent({
                    x: hour.value[0],
                    min: graphData.min,
                    max: graphData.max,
                  }) - 6
            }
            direction="ltr"
          >
            {graphData.graphType === 4
              ? graphData.isCelcius
                ? `${Math.floor(hour.value[0])} km/h`
                : `${Math.floor(hour.value[0])} mph`
              : Math.floor(hour.value[0])}
          </text>

          {/* wind arrow */}
          {graphData.graphType === 4 && (
            <g
              className="arrowWrapper"
              transform={`translate(${
                index * STEP - (BLOCK_SIZE / 2) * STEP
              }, 0)`}
            >
              <polyline
                className="windArrow"
                style={{ transform: `rotateZ(${hour.value[1]}deg)` }}
                points={`
                60,85
                63,50
                70,60
                60,35
                50,60
                57,50
                `}
              />
            </g>
          )}

          {/* under graph time label */}
          <text
            style={{ font: "bold 13px arial", textAnchor: "middle" }}
            x={index * STEP}
            y={GRAPH_HEIGHT + UNDER_GRAPH_OFFSET}
            direction="ltr"
          >
            {format(new Date(hour.time), "kk:00")}
          </text>

          {/* on click cover area */}
          <rect
            width={BLOCK_SIZE * STEP}
            height={GRAPH_HEIGHT}
            style={{
              opacity: 0,
              cursor: "pointer",
            }}
            onClick={() => {
              graphData.callback(index);
            }}
            x={index * STEP - (BLOCK_SIZE / 2) * STEP}
            y={0}
          ></rect>
        </React.Fragment>
      );
    }
  });

  return (
    <div className="weatherCard__graph">
      <svg
        viewBox={`0 0 ${graphWidth} ${GRAPH_HEIGHT + UNDER_GRAPH_OFFSET}`}
        className="svgGraph"
        style={{
          // translating graph on day card click
          transform: `translateX(${
            graphData.translateGraph * -1 * 0.8 * STEP - 1
          }px)`,
        }}
      >
        {graphData.graphType !== 4 && (
          <polyline
            className={
              graphData.graphType === 1
                ? "polyline--precip"
                : graphData.graphType === 2
                ? "polyline--humidity"
                : graphData.graphType === 4
                ? "polyline--wind"
                : ""
            }
            strokeWidth="2"
            points={points}
          />
        )}

        {graphLabels}
      </svg>
    </div>
  );
};

export default GraphSVG;
