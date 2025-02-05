import pb from '../pocketbase';

/**
 * 교환 글 삭제
 * @param {string} exchangeId - 삭제할 교환 글의 ID
 */

export default async function deletedExchange(exchangeId) {
  try {
    await pb.collection('exchangeList').delete(exchangeId);
    return true;
  } catch (error) {
    console.error('Error deleting exchange: ', error);
    throw error;
  }
}
