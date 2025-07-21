import { useRef } from "react";
import { useSceneProgress } from "../hooks/useSceneProgress";

interface SceneProps {
  height: number;
  children?: (progress: number) => React.ReactNode;
  className?: string;
}

export function Scene({ height, className, children }: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSceneProgress(ref, height); // 스크롤이 얼마나 내려와 있는지에 대한 비율을 계산

  return (
    <div
      ref={ref}
      className={`relative ${className ?? ""}`}
      style={{
        height,
      }}
    >
      <div className="max-w-[500px] m-auto h-full">{children?.(progress)}</div>
    </div>
  );
}
