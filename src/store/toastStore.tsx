import { create } from 'zustand';

interface ToastState {
  isOpen: boolean;
  message: string;
  duration: number;
  showToast: (message: string, duration?: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  isOpen: false,
  message: '',
  duration: 1000, // 기본 시간 1초
  showToast: (message, duration = 3000) => set({ isOpen: true, message, duration }),
  hideToast: () => set({ isOpen: false }),
}));
