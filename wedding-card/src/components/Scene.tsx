import { useRef } from "react";
import { useSceneProgress } from "../hooks/useSceneProgress";

interface SceneProps {
  height: number;
  children?: (progress: number) => React.ReactNode;
  className?: string;
  initialProgress?: number; // 초기 progress 값
}

export function Scene({
  height,
  className,
  children,
  initialProgress,
}: SceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSceneProgress(ref, initialProgress, height); // 스크롤이 얼마나 내려와 있는지에 대한 비율을 계산

  return (
    <div
      ref={ref}
      className={`relative ${className ?? ""}`}
      style={{
        height,
      }}
    >
      <div className="max-w-[500px] m-auto h-full">
        {-0.5 <= progress && progress < 1 ? children?.(progress) : null}
      </div>
    </div>
  );
}
