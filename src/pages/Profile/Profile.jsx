import CollectBook from '@/components/CollectBook/CollectBook';
import ProfileItemContainer from '@/components/ProfileItemContainer/ProfileItemContainer';
import NavigationTile from '@/components/NavigationTile/NavigationTile';
import ProfileFooter from '@/components/ProfileFooter/ProfileFooter';
import ProfileHeader from '@/components/ProfileTitle/ProfileHeader';
import ExchangeStatus from '@/components/ExchangeList/_components/ExchangeStatus';
import ProfileSetting from '../ProfileSetting/ProfileSetting';

export default function Profile() {
  return (
    <>
      {/* 데스크톱 화면 */}
      <div className="justify-center hidden mx-auto bg-white max-w-1280pxr desktop:flex desktop:gap-30pxr">
        <div className="hidden border-r w-310pxr border-neutral-300 pt-100pxr desktop:block">
          <ProfileSetting />
        </div>
        <div className="flex flex-col gap-5 pb-5 w-970pxr pt-60pxr">
          <ProfileHeader />
          <ProfileItemContainer title="콜렉트북">
            <CollectBook />
          </ProfileItemContainer>
          <ProfileItemContainer title="교환현황">
            <ExchangeStatus />
          </ProfileItemContainer>
          <div>
            <NavigationTile
              to="/"
              text="가이드"
              className="mt-10 border-t-4 border-b-2 border-gray-200 "
            />
            <NavigationTile
              to="/informUs"
              text="제보하기"
              className="border-b-4 border-gray-200 "
            />
          </div>
        </div>
      </div>

      {/* 모바일 화면 */}
      <div className="flex flex-col gap-5 pb-5 pt-60pxr desktop:hidden">
        <ProfileHeader />
        <ProfileItemContainer title="콜렉트북">
          <CollectBook />
        </ProfileItemContainer>
        <ProfileItemContainer title="교환현황">
          <ExchangeStatus />
        </ProfileItemContainer>
        <div>
          <NavigationTile
            to="/"
            text="가이드"
            className="mt-10 border-t-4 border-b-2 border-gray-200 "
          />
          <NavigationTile
            to="/informUs"
            text="제보하기"
            className="border-b-4 border-gray-200 "
          />
          <ProfileFooter />
        </div>
      </div>
    </>
  );
}
