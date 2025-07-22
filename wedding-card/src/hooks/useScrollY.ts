import { useEffect, useState } from "react";

export function useScrollY(callback: (y: number) => void): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      callback?.(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [callback]);

  return scrollY;
}
