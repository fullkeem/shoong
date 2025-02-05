import pb from '../pocketbase';

/**
 * 교환글 생성(추가)
 * @param {Object} data - { writer, description, status, chatContent 등... }
 */

export default async function createExchange(data) {
  try {
    const newRecord = await pb.collection('exchangeList').create(data);
    return newRecord;
  } catch (error) {
    console.error('Error creating exchange: ', error);
    throw error;
  }
}
