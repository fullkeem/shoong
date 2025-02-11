import pb from '../pocketbase';

/**
 * 연관 collections 업데이트
 * @param {string} photoCardId - 교환글 작성한 포토카드 Id
 * @param {string} newRecordId - 교환 글 내용 Id
 * @param {string} userId - 교환 글 작성한 유저 Id
 */

export default async function newExchangeToPhotoCard(
  photoCardId,
  newRecordId,
  userId
) {
  // photoCard에 새 exchangeList+ 연결
  await pb.collection('photoCards').update(photoCardId, {
    'exchangeList+': newRecordId,
  });

  // user 컬렉션에도 새 exchange id 연결
  await pb.collection('users').update(userId, {
    'exchangeStatus+': newRecordId,
  });
}
