import pb from '@/api/pocketbase';
import { isLogin } from '@/store/store';
import { useState, useEffect } from 'react';
import containsProfanity from '@/libs/filter';
import useUserListStore from '@/store/userListStore';
import { createExchange, updateExchange, deleteExchange } from '@/api/exchange';

/**
 * 교환글 CRUD를 담당하는 커스텀 훅
 * @param {object} photoCardData - PocketBase에서 가져온 포토카드 데이터
 */

export function useExchangeDetail(photoCardData) {
  const [exchangeListData, setExchangeListData] = useState(
    photoCardData?.expend?.exchangeList || []
  );

  const { fetchUsers, users } = useUserListStore();

  // 로그인 여부, 로그인 유저 정보
  const { init: loginStatus } = isLogin();
  const userInfo = localStorage.getItem('auth');
  const loggedInUser = userInfo ? JSON.parse(userInfo) : null;

  // 교환글의 작성자 목록으로부터 유저 정보 가져오기
  useEffect(() => {
    const writerIds = exchangeListData
      .map((data) => data?.writer)
      .filter(Boolean);
    if (writerIds.length > 0) {
      fetchUsers(writerIds);
    }
  }, [exchangeListData, fetchUsers]);

  /**
   * 교환글 추가
   * @param {string} comment - 사용자가 입력한 교환 글 내용
   */
  const addExchange = async (comment) => {
    if (!loggedInUser) {
      throw new Error('로그인이 필요한 서비스입니다.');
    }
    if (containsProfanity(comment)) {
      throw new Error('비속어가 포함된 글은 작성할 수 업습니다.');
    }
    if (!comment.trim()) {
      throw new Error('교환 글 내용을 입력해주세요.');
    }

    const data = {
      writer: loggedInUser.user.id,
      description: comment,
      status: '교환대기중',
      chatContent: null,
    };

    try {
      //? exchangeList에 새 레코드 생싱
      const newRecord = await createExchange(data);

      //? photoCards & user 컬렉션에 새 exchange ID 연결
      if (newRecord) {
        await pb.collection('photoCards').update(photoCardData.id, {
          'exchangeList+': newRecord.id,
        });
        await pb.collection('users').update(loggedInUser.user.id, {
          'exchangeStatus+': newRecord.id,
        });
      }

      setExchangeListData((prev) => [...prev, newRecord]);
      return newRecord;
    } catch (error) {
      throw new Error('데이터를 저장하는 데 실패했습니다.');
    }
  };

  /**
   * 교환글 수정
   * @param {string} exchangeId - 수정할 교환글 ID
   * @param {string} newDescription - 수정할 내용
   */
  const editExchange = async (exchangeId, newDescription) => {
    if (containsProfanity(newDescription)) {
      throw new Error('비속어가 포함된 글은 작성할 수 없습니다');
    }

    try {
      const updated = await updateExchange(exchangeId, {
        description: newDescription,
      });

      setExchangeListData((prev) =>
        prev.map((item) =>
          item.id === exchangeId
            ? { ...item, description: updated.description }
            : item
        )
      );
      return updated;
    } catch (error) {
      throw new Error('교환 글 수정에 실패했습니다.');
    }
  };

  /**
   * 교환글 삭제
   * @param {string} exchangeId - 삭제할 교환글 ID
   */
  const removeExchange = async (exchangeId) => {
    try {
      await deleteExchange(exchangeId);
      setExchangeListData((prev) =>
        prev.filter((item) => item.id !== exchangeId)
      );
    } catch (error) {
      throw new Error('교환 글 삭제에 실패했습니다.');
    }
  };

  return {
    addExchange,
    editExchange,
    removeExchange,
    exchangeListData,
    setExchangeListData,
    loginUser: loggedInUser,
    loginStatus,
    users,
  };
}
