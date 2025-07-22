import { useEffect, useRef, useState } from "react";

export function useScrollY(callback: (y: number) => void): number {
  const [scrollY, setScrollY] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          tickingRef.current = false;
          setScrollY(y);
          callback(y);
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [callback]);

  return scrollY;
}
