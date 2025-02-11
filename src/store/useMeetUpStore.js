import { create } from 'zustand';

export const useMeetUpStore = create((set) => ({
  selectedCafe: '',
  selectedLocation: null,
  userLocation: null,

  setSelectedCafe: (cafeName) => set({ selectedCafe: cafeName }),
  setSelectedLocation: (loc) => set({ selectedLocation: loc }),
  setUserLocation: (loc) => set({ userLocation: loc }),
}));
