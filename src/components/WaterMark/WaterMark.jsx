import { useEffect } from 'react';
import { useState } from 'react';
import waterMark from '/shoong_watermark.webp';

export default function WaterMark() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = '/shoong_watermark.webp';
  }, []);

  return (
    <>
      {isLoaded && (
        <div className="absolute top-0 size-full opacity-30">
          <img
            src={waterMark}
            alt="워터마크"
            aria-hidden="true"
            className="h-full w-full"
            loading="lazy"
            srcSet=""
          />
        </div>
      )}
    </>
  );
}
