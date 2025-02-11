import pb from '../pocketbase';

/**
 * 교환 글 수정
 * @param {string} exchangeId - 수정할 교환 글의 ID
 * @param {object} data - 수정된 교환 글 내용
 */

export default async function updateExchange(exchangeId, data) {
  return await pb.collection('exchangeList').update(exchangeId, data);
}
