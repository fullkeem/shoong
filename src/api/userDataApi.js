import pb from './pocketbase';

/**
 * 작성자 데이터를 가져오는 함수
 * @param {Array<string>} writerIds - 작성자 ID 배열
 * @returns {Promise<Array>} - 작성자 데이터 배열
 */

export const fetchUsersData = async (writerIds) => {
  try {
    pb.autoCancellation(false);
    const uniqueWriterIds = [...new Set(writerIds)]; // 중복 제거
    const users = await Promise.all(
      uniqueWriterIds.map((id) => pb.collection('users').getOne(id))
    );
    return users;
  } catch (error) {
    console.error('Error fetching users data:', error);
    throw error;
  }
};
