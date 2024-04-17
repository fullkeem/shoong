import UserLocation from './UserLocation';
import { useEffect, useState } from 'react';
import { useMeetUpStore } from '@/store/store';
import { Map, ZoomControl } from 'react-kakao-maps-sdk';
import Clusterer from './Clusterer';

export default function MeetUpMap({ meetUpData }) {
  const [userLocation, setUserLocation] = useState(null);
  const selectedLocation = useMeetUpStore((state) => state.selectedLocation);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.556944,
    lng: 126.923917,
  });

  useEffect(() => {
    if (selectedLocation) {
      setMapCenter(selectedLocation);
    }
  }, [selectedLocation]);

  return (
    <Map
      center={mapCenter}
      isPanto={true}
      className="relative h-full w-full"
      level={8}
    >
      <ZoomControl />
      <Clusterer meetUpData={meetUpData} useMeetUpStore={useMeetUpStore} />
      {userLocation && (
        <UserLocation
          position={userLocation}
          setMapCenter={setMapCenter}
          setUserLocation={setUserLocation}
          image={{
            src: '/icons/marker.svg',
            size: { width: 40, height: 40 },
            options: {
              alt: '내 위치',
            },
          }}
        />
      )}
    </Map>
  );
}
