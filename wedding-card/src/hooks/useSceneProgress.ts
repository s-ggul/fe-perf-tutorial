import { type RefObject, useCallback, useEffect, useState } from "react";
import { useScrollY } from "./useScrollY";

export function useSceneProgress<T extends Element>(
  ref: RefObject<T | null>,
  initialProgress: number = -10,
  height: number
): number {
  const [sceneTop, setSceneTop] = useState(0);
  const [prog, setProg] = useState(initialProgress);
  useScrollY(
    useCallback(
      (y) => {
        const raw = (y - sceneTop) / height;
        setProg(raw);
      },
      [sceneTop, height]
    )
  );

  useEffect(() => {
    if (!ref?.current) {
      return;
    }

    const measure = () => {
      const rect = ref.current!.getBoundingClientRect();
      setSceneTop(rect.top + window.scrollY);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref]);

  return prog;
}
