import "./error.scss";

const Error = ({ error }: { error: Error }) => {
  return <pre>{JSON.stringify(error, null, 2)}</pre>;
};

export default Error;
