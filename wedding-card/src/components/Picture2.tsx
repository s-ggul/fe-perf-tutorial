import React from "react";

interface PictureProps {
  // src: string;
  // webpSrc: string;
  fallbackSrc: string;
  sources: {
    [format in "webp" | "jpeg" | "jpg" | "png" | "avif"]?: {
      [originalWidth: number]: string;
    };
  };
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export function Picture2({
  fallbackSrc,
  sources,
  alt = "",
  style = {},
  className = "",
  onClick,
}: PictureProps) {
  return (
    <div style={style} className={className}>
      {/* 여러가지 이미지들에 대한 분기를 처리할 수 있음 */}
      {/* 아래 내용이 webp가 안되면 img 태그로 렌더링 해라 이다. */}
      <picture>
        {Object.entries(sources).map(([format, srcByDpr]) => (
          <source
            key={`${format}`}
            srcSet={Object.entries(srcByDpr)
              .map(([originalWidth, src]) => `${src} ${originalWidth}w`)
              .join(", ")}
            type={`image/${format}`}
          />
        ))}
        <img src={fallbackSrc} alt={alt} onClick={onClick} />
      </picture>
    </div>
  );
}
