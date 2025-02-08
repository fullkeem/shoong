import { useEffect } from 'react';

export default function useScrollOnSelect(itemId, isSelected) {
  useEffect(() => {
    if (!isSelected) return;
    const element = document.getElementById(itemId);
    if (!element) return;

    // 데스크 탑 환경일 때 true
    const isDesktop = window.matchMedia('(min-width: 1080px)').matches;

    element.scrollIntoView({
      behavior: 'smooth',
      // 데스크탑이면 세로 스크롤 중앙, 아니면 가깝게
      block: isDesktop ? 'center' : 'nearest',
      inline: 'center',
    });
  }, [isSelected, itemId]);
}
