import pb from '../pocketbase';

/**
 * 교환 글 삭제
 * @param {string} exchangeId - 삭제할 교환 글의 ID
 */

export default async function deletedExchange(exchangeId) {
  return await pb.collection('exchangeList').delete(exchangeId);
}
