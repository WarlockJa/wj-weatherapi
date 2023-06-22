// calculating percentage for the value realtive to the min and max with offset
const getLineSegmentPercent = ({
  min,
  max,
  x,
}: {
  min: number;
  max: number;
  x: number;
}) => {
  // adding offsets for a better graph presentation
  // return (100 - 10) - ((x - min) / (max - min)) * (100 - 30);
  return 90 - ((x - min) / (max - min)) * 70;
};

export default getLineSegmentPercent;
