import { useLoaderData } from 'react-router';
import SearchBar from '@/components/SearchBar/SearchBar';
import MeetUpMap from '@/components/MeetUpMap/MeetUpMap';
import MeetUpItemContainer from '@/components/MeetUpItemContainer/MeetUpItemContainer';

export default function MeetUp() {
  const meetUpData = useLoaderData();

  return (
    <div className="relative top-55pxr h-screen-nav w-full">
      <div className="">
        <SearchBar
          name={'mapSearch'}
          placeholder={'장소,아티스트 이름'}
          bgStyle={'absolute top-2 left-5 z-20 bg-white py-3 shadow-meetUp '}
        />
        <MeetUpItemContainer
          meetUpData={meetUpData}
          containerStyle={'overflow-auto touch-pan-x draggable'}
        />
      </div>
      <div className="h-full w-full">
        <MeetUpMap meetUpData={meetUpData} />
      </div>
    </div>
  );
}
