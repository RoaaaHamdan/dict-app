import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    setIsMobile(window.innerWidth <= breakpoint);
  }, []);

  return isMobile;
};

export default useIsMobile;
