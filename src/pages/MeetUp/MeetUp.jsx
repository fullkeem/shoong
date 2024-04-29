import MeetUpMobile from './MeetUpMobile';
import MeetUpDesktop from './MeetUpDesktop';
import { useLoaderData } from 'react-router';

export default function MeetUp() {
  const meetUpData = useLoaderData();

  return (
    <div className="relative top-56pxr h-screen-nav @container">
      <div className="@desktop:hidden block h-full w-full">
        <MeetUpMobile meetUpData={meetUpData} />
      </div>
      <div className="@desktop:block  @desktop:w-full @desktop:h-screen-meetUp hidden">
        <MeetUpDesktop meetUpData={meetUpData} />
      </div>
    </div>
  );
}
