import { useLoaderData } from 'react-router';
import MeetupCarousel from '../Carousel/ MeetupCarousel';
import CommentContainer from '../Comment/CommentContainer';
import DetailHeader from '../DetailHeader/DetailHeader';
import HashTagItem from '../HashTagItem/HashTagItem';
import MeetUpDetailItem from '../MeetUpDetailItem/MeetUpDetailItem';
import MeetUpDetailItemContainer from '../MeetUpDetailItemContainer/MeetUpDetailItemContainer';
import MeetUpDetailMap from '../MeetUpDetailMap/MeetUpDetailMap';

export default function MeetUpDetail() {
  const {
    id,
    lat,
    lng,
    date,
    source,
    address,
    comments,
    cafeName,
    eventImg,
    basicGift,
    desertGift,
    eventTitle,
    firstHashtag,
    priorityGift,
    secondHashtag,
  } = useLoaderData();

  return (
    <div className="pb-10 pt-50pxr @container">
      {/* 태그를 proprs로 전달하는 법은?? */}
      {/* <MeetUpItem info={data} /> */}
      <DetailHeader title="자세히" isBottomSheet={undefined} />
      <MeetupCarousel />
      <div className="mt-6 grid grid-cols-1 gap-2 @desktop:grid-cols-2 @desktop:grid-rows-2">
        <div className="bg-white shadow mx-20pxr mb-20pxr min-h-120pxr min-w-320pxr rounded-xl px-20pxr py-15pxr">
          <h3 className="text-base font-extrabold leading-snug mb-4pxr text-primary">
            {eventTitle}
          </h3>
          <h4 className="text-sm font-extrabold leading-tight text-gray-500 mb-10pxr">
            {cafeName}
          </h4>

          <MeetUpDetailItem title="주소" content={address} />
          <MeetUpDetailItem title="트위터" content={source} />
          <MeetUpDetailItem title="영업기간" content={date} />
        </div>

        <div className="flex flex-col bg-white shadow mx-20pxr rounded-xl">
          <MeetUpDetailItemContainer
            title="GIFT"
            content={
              <>
                <MeetUpDetailItem title="기본특전" content={basicGift} />
                <MeetUpDetailItem title="선착특전" content={priorityGift} />
                <MeetUpDetailItem title="쿠키특전" content={desertGift} />
              </>
            }
          />
          <MeetUpDetailItemContainer
            title="EVENT"
            content={
              <MeetUpDetailItem
                title="해쉬태그"
                content={
                  <ul className="flex flex-col">
                    <HashTagItem data={firstHashtag} />
                    <HashTagItem data={secondHashtag} />
                  </ul>
                }
              />
            }
          />
        </div>

        <div className="flex flex-col mt-6 shadow mx-20pxr h-300pxr rounded-xl">
          <MeetUpDetailMap lat={lat} lng={lng} cafeName={cafeName} />
        </div>

        <CommentContainer id={id} commentList={comments} />
      </div>
    </div>
  );
}
