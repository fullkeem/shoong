import WaterMark from '../WaterMark/WaterMark';

export default function PhocaImg({
  phocaImgSrc,
  phocaImgAlt,
  imgClass,
  children,
}) {
  return (
    <div className={`${imgClass} relative`}>
      <img
        src={phocaImgSrc}
        alt={phocaImgAlt}
        className="object-cover w-full h-full rounded-xl"
        loading="lazy"
      />
      <div className="absolute bottom-2 right-4">{children}</div>
      <WaterMark />
    </div>
  );
}
