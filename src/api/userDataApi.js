// /api/userDataApi.js
import pb from './pocketbase';

/**
 * 작성자 데이터들을 가져오는 함수
 * @param {Array<string>} writerIds - 작성자 ID 배열 (예: ["rsj6pb36wux36w5","rnrex8l58qj58rh"])
 */
export const fetchUsersData = async (writerIds) => {
  try {
    pb.autoCancellation(false);
    const uniqueWriterIds = [...new Set(writerIds)];
    if (uniqueWriterIds.length === 0) return [];

    // 예: id = "rsj6pb36wux36w5" || id = "rnrex8l58qj58rh"
    const filterString = uniqueWriterIds
      .map((id) => `id = "${id}"`)
      .join(' || ');

    // 한 번에 유저 목록 불러오기
    const userList = await pb.collection('users').getFullList({
      filter: filterString,
    });

    return userList;
  } catch (error) {
    console.error('Error fetching users data:', error);
    throw error;
  }
};
