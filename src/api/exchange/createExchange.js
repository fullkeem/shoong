import pb from '../pocketbase';

/**
 * 교환글 생성(추가)
 * @param {Object} data - { writer, description, status, chatContent 등... }
 */

export default async function createExchange(data) {
  return await pb.collection('exchangeList').create(data);
}
