const getGraphData = ({
  data,
  value,
}: {
  data: IWeatherAPI_Day[];
  value: string;
}) => {
  let min: number = 100,
    max: number = -100;
  const result: { time: string; value: number }[] = data
    .map((day) =>
      day.hour.map((hour) => {
        if (min > hour[value]) min = hour[value];
        if (max < hour[value]) max = hour[value];
        return { time: hour.time, value: hour[value] };
      })
    )
    .flat();
  return { result, min, max };
};

export default getGraphData;
