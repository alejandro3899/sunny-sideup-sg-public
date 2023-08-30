import { useEffect, useState } from "react";

const useWindowDimensions = function () {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleSetSize = function () {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleSetSize();

    window.addEventListener("resize", handleSetSize);

    return () => {
      window.removeEventListener("resize", handleSetSize);
    };
  }, []);

  return { ...size };
};

export default useWindowDimensions;
