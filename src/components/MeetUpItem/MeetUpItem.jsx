import { Link } from 'react-router-dom';
import { useMeetUpStore } from '@/store/useMeetUpStore';
import { FaSquareArrowUpRight } from 'react-icons/fa6';
import useScrollOnSelect from '@/hooks/useScrollOnSelect';

const getStyles = (isSelected) => {
  return {
    bgColor: isSelected ? 'bg-primary' : 'bg-white',
    titleColor: isSelected ? 'text-white' : 'text-primary',
    textColor: isSelected ? 'text-gray-100' : 'text-gray-500',
  };
};

export default function MeetUpItem({ info }) {
  // 카페 이름 저장 함수
  const { selectedCafe, setSelectedCafe, setSelectedLocation } =
    useMeetUpStore();

  const isSelected = info.cafeName === selectedCafe;
  useScrollOnSelect(info.id, isSelected);

  const handleSelectItem = () => {
    setSelectedCafe(info.cafeName);
    setSelectedLocation({ lat: info.lat, lng: info.lng });
  };

  const { bgColor, titleColor, textColor } = getStyles(isSelected);

  return (
    <li
      id={info.id}
      className={`min-h-120pxr w-300pxr rounded-xl @desktop:mx-auto @desktop:w-11/12 @desktop:content-center  ${bgColor} snap-center px-20pxr py-15pxr shadow-meetUp`}
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
