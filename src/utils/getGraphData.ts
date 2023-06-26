const getGraphData = ({
  data,
  value,
}: {
  data: IWeatherAPI_Day[];
  value: string[];
}) => {
  let min: number = 100,
    max: number = -100;
  const result: { time: string; value: number[] }[] = data
    .map((day) =>
      day.hour.map((hour) => {
        if (min > hour[value[0]]) min = hour[value[0]];
        if (max < hour[value[0]]) max = hour[value[0]];
        const values = value.map((item) => hour[item]);
        return { time: hour.time, value: values };
      })
    )
    .flat();
  return { result, min, max };
};

export default getGraphData;
