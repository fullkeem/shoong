import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,
  modalMessage: '',

  setIsOpen: (value) =>
    set((state) => {
      if (typeof value === 'boolean') {
        return { isOpen: value };
      }
      return { isOpen: !state.isOpen };
    }),
  setModalMessage: (message) => set({ modalMessage: message }),
}));

export default useModalStore;
