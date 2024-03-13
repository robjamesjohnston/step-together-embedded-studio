const Iframe = (props) => {
  const { url, height } = props.node;
  return <iframe src={url} height={height} width="100%"></iframe>;
};

export default Iframe;
