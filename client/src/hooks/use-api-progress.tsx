import { create } from "zustand";

interface APIProgressStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  progress: number;
  setProgress: (progress: number) => void;
  incrementProgress: () => void;
  progressText: string;
  setProgressText: (progressText: string) => void;
}

export const useAPIProgressStore = create<APIProgressStore>((set) => ({
  loading: false,
  progress: 0,
  setLoading: (loading: boolean) => set({ loading }),
  setProgress: (progress: number) => set({ progress }),
  incrementProgress: () =>
    set((state) => ({
      progress: state.progress < 90 ? state.progress + 10 : state.progress,
    })),
  progressText: "",
  setProgressText: (progressText: string) => set({ progressText }),
}));
