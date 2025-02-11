import {
  createExchange,
  updateExchange,
  deleteExchange,
  fetchExchangeDetail,
  newExchangeToPhotoCard,
} from '@/api/exchange';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/** 교환 상세 가져오기 */
export function useExchangeQuery(photoCardId) {
  return useQuery({
    queryKey: ['exchangeDetail', photoCardId],
    queryFn: () => fetchExchangeDetail(photoCardId),
    enabled: !!photoCardId,
  });
}

/** 새 교환글 추가 */
export function useAddExchangeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ photoCardId, data, userId }) => {
      const newRecord = await createExchange(data);

      await newExchangeToPhotoCard(photoCardId, newRecord.id, userId);
      return newRecord;
    },
    onSuccess: (newRecord, variables) => {
      queryClient.invalidateQueries(['exchangeDetail', variables.photoCardId]);
    },
  });
}

/** 교환글 수정 */
export function useEditExchangeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ exchangeId, edited, photoCardId }) => {
      const updated = await updateExchange(exchangeId, edited);
      return { updated, photoCardId };
    },
    onSuccess: ({ updated, photoCardId }) => {
      queryClient.invalidateQueries(['exchangeDetail', photoCardId]);
    },
  });
}

/** 교환글 삭제 */
export function useRemoveExchangeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ exchangeId, photoCardId }) => {
      await deleteExchange(exchangeId);
      return { exchangeId, photoCardId };
    },
    onSuccess: ({ exchangeId, photoCardId }) => {
      queryClient.invalidateQueries(['exchangeDetail', photoCardId]);
    },
  });
}
