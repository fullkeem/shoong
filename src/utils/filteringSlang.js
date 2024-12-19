function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function createSlangRegax(slangWords) {
  // 비속어 하나하나를 정규식에서 안전하게 처리하기 위해 이스케이프
  const escapeWords = slangWords.map(escapeRegex);

  // 이스케이프된 단어들을 OR(|)로 연결하여 하나의 정규식 패턴을 만듦
  const pattern = escapeWords.join('|');

  // i 플래그를 사용해 대소문자를 구분하지 않도록 함함
  return new RegExp(pattern, 'i');
  // 새로운 정규식 객체로 해당 패턴에 들어있는 단어가 하나로 있으면 매칭칭
}
