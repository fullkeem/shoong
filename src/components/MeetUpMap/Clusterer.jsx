import { useEffect, useRef } from 'react';
import { useMap, MarkerClusterer } from 'react-kakao-maps-sdk';
import EventMarker from './EventMarker';

export default function Clusterer({ meetUpData }) {
  const mapRef = useRef();
  const map = useMap();

  useEffect(() => {
    if (map) {
      mapRef.current = map;
    }
  }, [map]);

  const onClusterclick = (_target, cluster) => {
    const map = mapRef.current;
    // 현재 지도 레벨에서 2레벨 확대한 레벨
    const level = map.getLevel() - 3;

    // 지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대
    map.setLevel(level, { anchor: cluster.getCenter() });
  };
  return (
    <MarkerClusterer
      averageCenter
      minLevel={8}
      disableClickZoom
      onClusterclick={onClusterclick}
    >
      <EventMarker meetUpData={meetUpData} />
    </MarkerClusterer>
  );
}
