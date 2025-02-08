import pb from '@/api/pocketbase';
import { useQuery } from '@tanstack/react-query';

export function useMeetUpList() {
  return useQuery({
    queryKey: ['meetUps'],
    queryFn: () => pb.collection('meetUps').getFullList(),
  });
}
