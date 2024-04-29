import { searchStore } from '@/store/store';
import MeetUpItem from '../MeetUpItem/MeetUpItem';

export default function MeetUpItemContainer({ meetUpData }) {
  const { search } = searchStore();
  const searchText = search?.toLowerCase();
  const searchResult = searchText
    ? meetUpData.filter((data) => {
        const lowerdData = JSON.stringify(data).toLowerCase();
        return lowerdData.includes(searchText);
      })
    : meetUpData;

  return (
    <ul className="draggable absolute bottom-3 z-20 flex w-full touch-pan-x snap-both gap-4 overflow-auto rounded-xl desktop:bottom-0 desktop:flex-col">
      {searchResult.map((item) => {
        return <MeetUpItem key={item.id} info={item} />;
      })}
    </ul>
  );
}
