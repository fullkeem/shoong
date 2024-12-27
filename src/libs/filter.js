import { Filter } from 'bad-words';
import { PROFANITY_WORDS } from './profanityWord';

const normalizeKoreanText = (text) => {
  return text.normalize('NFC').toLowerCase().replace(/\s+/g, '');
};

export default function containsProfanity(text) {
  const normalizedText = normalizeKoreanText(text);

  const filter = new Filter();
  filter.addWords(...PROFANITY_WORDS);

  if (filter.isProfane(normalizedText)) {
    return true;
  }

  // 정규 표현식 기반 필터링
  for (const word of PROFANITY_WORDS) {
    const regex = new RegExp(word, 'gi');
    if (regex.test(normalizedText)) {
      return true;
    }
  }

  return false;
}
