import { Filter } from 'bad-words';
import { PROFANITY_WORDS } from './profanityWord';

// 비속어 필터 객체를 함수 외부에서 초기화하여 재사용
const filter = new Filter();
filter.addWords(...PROFANITY_WORDS);

//한글 비속어 필터링을 위한 정규 표현식 생성
const koreanProfanityRegex = new RegExp(PROFANITY_WORDS.join('|'), 'gi');

const normalizeKoreanText = (text) => {
  return text.normalize('NFC').toLowerCase().replace(/\s+/g, '');
};

export default function containsProfanity(text) {
  const normalizedText = normalizeKoreanText(text);

  // 기본 필터를 통한 비속어 검사
  if (filter.isProfane(normalizedText)) {
    return true;
  }

  // 한글 비속어에 대한 정규 표현식 검사
  if (koreanProfanityRegex.test(normalizedText)) {
    return true;
  }

  return false;
}
