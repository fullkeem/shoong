import { create } from 'zustand';
import { fetchUsersData } from '@/api/userDataApi';

const useUserListStore = create((set) => ({
  users: {}, // 작성자 데이터를 ID별로 저장
  fetchUsers: async (writerIds) => {
    try {
      const users = await fetchUsersData(writerIds);
      const usersMap = Object.fromEntries(users.map((user) => [user.id, user]));
      set((state) => ({
        users: { ...state.users, ...usersMap },
      }));
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  },
}));

export default useUserListStore;
