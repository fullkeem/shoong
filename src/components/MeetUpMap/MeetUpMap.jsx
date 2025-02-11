import Clusterer from './Clusterer';
import { Map, ZoomControl } from 'react-kakao-maps-sdk';

export default function MeetUpMap({ meetUpData }) {
  return (
    <Map
      center={{ lat: 37.556944, lng: 126.923917 }}
      isPanto={true}
      className="relative h-full w-full"
      level={8}
    >
      <ZoomControl />
      <Clusterer meetUpData={meetUpData} />
    </Map>
  );
}
