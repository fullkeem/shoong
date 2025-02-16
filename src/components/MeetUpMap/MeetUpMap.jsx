import { useState, useEffect } from 'react';
import { Map, ZoomControl } from 'react-kakao-maps-sdk';

import Clusterer from './Clusterer';
import { useMeetUpStore } from '@/store/useMeetUpStore';

export default function MeetUpMap({ meetUpData }) {
  const { selectedLocation } = useMeetUpStore();
  const [mapCenter, setMapCenter] = useState({
    lat: 37.556944,
    lng: 126.923917,
  });

  // selectedLocation이 바뀌면 지도 중심 이동
  useEffect(() => {
    if (selectedLocation) {
      setMapCenter(selectedLocation);
    }
  }, [selectedLocation]);

  return (
    <Map
      center={mapCenter}
      isPanto
      className="relative h-full w-full"
      level={8}
    >
      <ZoomControl />
      <Clusterer meetUpData={meetUpData} />
    </Map>
  );
}
