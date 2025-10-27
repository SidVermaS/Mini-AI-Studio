import { fetchGenerations } from '@/lib';
import { Generation, NumberNull, PromiseVoidFn, VoidFn } from '@/types';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface GenerationState {
  isLoading: boolean;
  nextCursorId: NumberNull;
  generations: Generation[];
  hasMore: boolean;
  addGeneration: (generation: Generation) => void;
  clearGenerations: VoidFn;
  fetchMoreGenerations: PromiseVoidFn;
}

export const useGenerationStore = create<GenerationState>()(
  persist(
    (set, get) => ({
      isLoading: false,
      nextCursorId: null,
      generations: [],
      hasMore: true,
      addGeneration: (generation) => set((state) => ({
        generations: [generation, ...state.generations]
      })),
      clearGenerations: () => set({ generations: [], nextCursorId: null, hasMore: true }),
      fetchMoreGenerations: async () => {
        const { nextCursorId, isLoading, hasMore, generations } = get();
        if (isLoading || !hasMore || nextCursorId === null) return;

        set({ isLoading: true });
        try {
          const result = await fetchGenerations({ cursorId: nextCursorId, pageSize: 5 });
          set({ 
            generations: [...generations, ...result.data], 
            nextCursorId: result.nextCursorId,
            hasMore: result.nextCursorId !== null,
            isLoading: false 
          });
        } catch (error) {
          console.error('Failed to fetch more generations:', error);
          set({ isLoading: false });
        }
      }
    }),
    {
      name: 'generation-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)