import SearchBar from '@/components/SearchBar/SearchBar';
import MeetUpMap from '@/components/MeetUpMap/MeetUpMap';
import MeetUpItemContainer from '@/components/MeetUpItemContainer/MeetUpItemContainer';

export default function MeetUpDesktop({ meetUpData }) {
  return (
    <div className="flex flex-row w-full h-full">
      <div className="relative flex flex-row justify-center w-1/4 h-full border-t-gray-50">
        <SearchBar
          name={'mapSearch'}
          placeholder={'장소,아티스트 이름'}
          bgStyle={'absolute top-2 mx-1 w-11/12 bg-white'}
        />
        <MeetUpItemContainer
          meetUpData={meetUpData}
          desktopStyle={'top-70pxr'}
        />
      </div>
      <div className="flex-grow">
        <MeetUpMap meetUpData={meetUpData} />
      </div>
    </div>
  );
}
