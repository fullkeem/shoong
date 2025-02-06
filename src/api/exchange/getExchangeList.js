import pb from '../pocketbase';

/**
 * 교환 글 목록 조회 (예: 전체, 조건부 필터 등)
 * @param {Object} query - { filter, sort, ... }
 */
export default async function getExchangeList(query = {}) {
  try {
    const records = await pb.collection('exchangeList').getFullList({
      sort: query.sort || '-created',
      filter: query.filter || '',
    });
    return records;
  } catch (error) {
    console.error('Error getting exchange list:', error);
    throw error;
  }
}
