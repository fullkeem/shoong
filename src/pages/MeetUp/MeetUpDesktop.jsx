import SearchBar from '@/components/SearchBar/SearchBar';
import MeetUpMap from '@/components/MeetUpMap/MeetUpMap';
import MeetUpItemContainer from '@/components/MeetUpItemContainer/MeetUpItemContainer';

export default function MeetUpDesktop({ meetUpData }) {
  return (
    <>
      <div className="h-full flex-grow">
        <MeetUpMap meetUpData={meetUpData} />
      </div>
      <div className="relative flex h-full w-1/3 flex-col overflow-hidden border-t-gray-50 bg-white">
        <SearchBar
          name={'mapSearch'}
          placeholder={'장소,아티스트 이름'}
          bgStyle={'w-full rounded-none'}
        />
        <MeetUpItemContainer meetUpData={meetUpData} />
      </div>
    </>
  );
}
