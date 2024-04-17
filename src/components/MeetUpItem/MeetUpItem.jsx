import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMeetUpStore } from '@/store/store';
import { FaSquareArrowUpRight } from 'react-icons/fa6';
import { useRef } from 'react';

export default function MeetUpItem({ info }) {
  // 카페 이름 저장 함수
  const selectedCafe = useMeetUpStore((state) => state.selectedCafe);
  const setSelectedLocation = useMeetUpStore(
    (state) => state.setSelectedLocation
  );

  // 클릭 이벤트 핸들러 안에서 선택된 마커의 위치를 업데이트
  const handleSelectItem = (cluster) => {
    // 위도와 경도를 전역 상태로 업데이트
    setSelectedLocation({ lat: info.lat, lng: info.lng });
    useMeetUpStore.setState({ selectedCafe: info.cafeName });
  };

  useEffect(() => {
    if (info.cafeName === selectedCafe) {
      document.getElementById(info.id).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [selectedCafe, info.cafeName, info.id]);

  const isSelected = info.cafeName === selectedCafe;
  const bgColor = isSelected ? 'bg-primary' : 'bg-white';
  const titleColor = isSelected ? 'text-white' : 'text-primary';
  const textColor = isSelected ? 'text-gray-100' : 'text-gray-500';

  return (
    <li
      id={info.id}
      className={`min-h-120pxr min-w-300pxr max-w-full rounded-xl ${bgColor} snap-center px-20pxr py-15pxr shadow-meetUp`}
      onClick={handleSelectItem}
    >
      <Link to={`/meetupDetail/${info.id}`}>
        <div
          className={`mb-4pxr flex items-center justify-between text-base font-extrabold leading-snug ${titleColor}`}
        >
          <h3 className="w-220pxr truncate">{info.eventTitle}</h3>
          <FaSquareArrowUpRight />
        </div>
      </Link>
      <h4
        className={`mb-10pxr text-sm font-extrabold leading-tight ${textColor}`}
      >
        {info.cafeName}
      </h4>
      <p className={`mb-7pxr text-xs font-semibold leading-none ${textColor}`}>
        {info.address}
      </p>
      <p className={`text-xs font-semibold leading-none ${textColor}`}>
        {info.date}
      </p>
    </li>
  );
}
