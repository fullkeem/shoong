import pb from '@/api/pocketbase';

const useExchangeApi = () => {
  /**
   * 교환 글 삭제
   * @param {string} exchangeId - 삭제할 교환 글의 ID
   */
  const deleteExchange = async (exchangeId) => {
    try {
      await pb.collection('exchangeList').delete(exchangeId);
      return true;
    } catch (error) {
      console.error('Error deleting exchange:', error);
      throw error;
    }
  };

  /**
   * 교환 글 수정
   * @param {string} exchangeId - 수정할 교환 글의 ID
   * @param {object} data - 수정된 교환 글 내용
   */
  const updateExchange = async (exchangeId, data) => {
    try {
      const updatedData = await pb
        .collection('exchangeList')
        .update(exchangeId, data);
      return updatedData;
    } catch (error) {
      console.error('Error updating exchange:', error);
      throw error;
    }
  };

  return { deleteExchange, updateExchange };
};

export default useExchangeApi;
