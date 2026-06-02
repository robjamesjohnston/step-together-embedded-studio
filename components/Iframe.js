const Iframe = ({ props }) => {
  const { url, height, title } = props;

  if (!url) {
    console.warn("Iframe: url prop is required");
    return null;
  }

  try {
    const urlObj = new URL(url);
    if (!["https:", "http:"].includes(urlObj.protocol)) {
      console.warn(`Iframe: Invalid protocol "${urlObj.protocol}". Only http and https allowed.`);
      return null;
    }
  } catch {
    console.warn("Iframe: Invalid URL provided");
    return null;
  }

  const safeHeight = Number.isInteger(parseInt(height)) ? parseInt(height) : 400;
  const iframeTitle = title || "Embedded content";

  return (
    <iframe
      src={url}
      height={safeHeight}
      width="100%"
      title={iframeTitle}
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      referrerPolicy="no-referrer"
      style={{ border: "none" }}
    />
  );
};

export default Iframe;
