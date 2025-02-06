import SearchBar from '@/components/SearchBar/SearchBar';
import MeetUpMap from '@/components/MeetUpMap/MeetUpMap';
import MeetUpItemContainer from '@/components/MeetUpItemContainer/MeetUpItemContainer';

export default function MeetUpMobile({ meetUpData }) {
  return (
    <>
      <div className="flex flex-row">
        <SearchBar
          name={'mapSearch'}
          placeholder={'장소,아티스트 이름'}
          bgStyle={
            'absolute top-3 left-3 z-20 bg-white py-3 w-1/2 border border-gray-100 shadow-meetUp '
          }
        />
        <MeetUpItemContainer
          meetUpData={meetUpData}
          mapStyle={'overflow-auto touch-pan-x draggable h-full'}
        />
      </div>
      <div className="flex-grow w-full h-full">
        <MeetUpMap meetUpData={meetUpData} />
      </div>
    </>
  );
}
