import Clusterer from './Clusterer';
import { useEffect, useState } from 'react';
import { useMeetUpStore } from '@/store/store';
import { Map, ZoomControl } from 'react-kakao-maps-sdk';

export default function MeetUpMap({ meetUpData, mapStyle }) {
  const [userLocation, setUserLocation] = useState(null);
  const selectedLocation = useMeetUpStore((state) => state.selectedLocation);
  const [mapCenter, setMapCenter] = useState({
    lat: 37.556944,
    lng: 126.923917,
  });
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);

  // 비동기적으로 Kakao Map SDK 로드
  useEffect(() => {
    const loadKakaoMapSDK = () => {
      return new Promise((resolve) => {
        const existingScript = document.getElementById('kakao-map-sdk');
        if (!existingScript) {
          const script = document.createElement('script');
          script.id = 'kakao-map-sdk';
          script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_API_KEY}&libraries=services,clusterer,drawing`;
          script.async = true;
          script.onload = resolve;
          document.head.appendChild(script);
        } else {
          setIsSdkLoaded(true);
          resolve();
        }
      });
    };

    loadKakaoMapSDK();
  }, []);

  useEffect(() => {
    if (userLocation) {
      // 사용자의 현재 위치로 지도 중심을 이동합니다.
      setMapCenter(userLocation);
    } else if (selectedLocation) {
      setMapCenter(selectedLocation);
    }
  }, [selectedLocation, setMapCenter, userLocation]);

  if (!isSdkLoaded) {
    return <div>Loading Map...</div>; // SDK가 로드될 때까지 로딩 메시지 표시
  }

  return (
    <Map
      center={mapCenter}
      isPanto={true}
      className="relative h-full w-full"
      level={8}
    >
      <ZoomControl />
      <Clusterer meetUpData={meetUpData} useMeetUpStore={useMeetUpStore} />
      {/* <UserLocation
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
      /> */}
    </Map>
  );
}
