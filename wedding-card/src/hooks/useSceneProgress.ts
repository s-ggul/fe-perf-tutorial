import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useScrollY } from "./useScrollY";

export function useSceneProgress<T extends Element>(
  ref: RefObject<T | null>,
  initialProgress: number = -10,
  height: number
): number {
  const sceneTopRef = useRef(0);
  // const [sceneTop, setSceneTop] = useState(0);
  const [prog, setProg] = useState(initialProgress);
  useScrollY(
    useCallback(
      (y) => {
        const raw = (y - sceneTopRef.current) / height;
        setProg(raw);
      },
      [height]
    )
  );

  useEffect(() => {
    if (!ref?.current) {
      // ref를 쓰기에 어쩔수없이 useEffect는 불가피하게 필요하다.
      // Dom을 업데이트하고 ref를 초기화 한다. 그 이후에 useEffect를 실행하기 때문에 그 앞에서 ref를 쓰고 싶다면 document.getElementById 같은 방법을 써야 한다.
      // ref가 null인 경우는 컴포넌트가 아직 렌더링되지 않았거나, ref가 올바르게 설정되지 않은 경우이다.

      return;
    }

    const measure = () => {
      const rect = ref.current!.getBoundingClientRect();
      sceneTopRef.current = rect.top + window.scrollY; // 그래서 sceneTop이 아닌 ref를 통한 값의 전달. -> ref로 하면 state변화가 아니여서 리렌더링이 일어나지 않는다.
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [ref]);

  return prog;
}
