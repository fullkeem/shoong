import PhocaImg from '@/components/PhocaItem/PhocaImg';
import PhocaTitle from '@/components/PhocaItem/PhocaTitle';
import ArtistInfo from '@/components/PhocaItem/ArtistInfo';
import ArtistLogo from '@/components/PhocaItem/ArtistLogo';

export default function PhotoCardInfo({ photoCardData }) {
  const { cardImg, groupName, id, label, logoImage, memberName, title } =
    photoCardData;
  return (
    <div className="flexCenter mx-auto my-8 w-10/12 flex-col">
      <div className="flex w-full flex-col">
        <div className="flex items-center">
          <ArtistLogo
            logoImgSrc={`https://shoong.pockethost.io/api/files/photoCards/${id}/${logoImage}`}
            groupName={groupName}
            logoImgClass={'w-10 h-10 rounded-full object-cover'}
          />
          <ArtistInfo
            groupName={groupName}
            memberName={memberName}
            infoClass={'ml-2 flex flex-col text-16pxr font-bold text-gray-500'}
            groupClass={'leading-none'}
            memberClass={''}
          />
        </div>
        <PhocaTitle
          title={title}
          titleClass={'mt-1 self-start text-xl font-bold '}
        />
        <span className="mt-3 self-start rounded-2xl border border-neutral-800 px-4 py-1pxr text-sm">
          {label}
        </span>
      </div>
      <PhocaImg
        phocaImgSrc={`https://shoong.pockethost.io/api/files/photoCards/${id}/${cardImg}`}
        phocaImgAlt={`${title} 포토카드`}
        imgClass={'w-full mt-3'}
      />
    </div>
  );
}
