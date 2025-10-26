import { fetchGenerations } from '@/lib';
import { Generation, NumberNull } from '@/types';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface GenerationState {
  isLoading: boolean;
  nextCursorId: NumberNull
  generations: Generation[];
  addGeneration: (generation: Generation) => void;
  clearGenerations: () => void;
}

export const useGenerationStore = create<GenerationState>()(
  persist(
    (set) => ({
      isLoading: false,
      nextCursorId: null,
      generations: [],
      addGeneration: (generation) => set((state) => ({
        generations: [...state.generations, generation]
      })),
      clearGenerations: () => set({ generations: [] }),
      fetchGenerations: async () => {
        set({ isLoading: true });
        const { nextCursorId } = useGenerationStore.getState();
        const result = await fetchGenerations({ cursorId: nextCursorId, pageSize: 5 });
        set({ generations: result.data, nextCursorId: result.nextCursorId, isLoading: false });
      }
    }),
    {
      name: 'generation-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
)