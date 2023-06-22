const getAverageValue = ({
  day,
  value,
}: {
  day: IWeatherAPI_Day;
  value: string;
}) => {
  return (day.hour.reduce((sum, hour) => sum + hour[value], 0) / 24).toFixed(2);
};

export default getAverageValue;
