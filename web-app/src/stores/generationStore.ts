import { Generation } from '@/types';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface GenerationState {
  generations: Generation[];
  addGeneration: (generation: Generation) => void;
  clearGenerations: () => void;
}

export const useGenerationStore = create<GenerationState>()(
  persist(
    (set) => ({
      generations: [],
      addGeneration: (generation) => set((state) => ({
        generations: [...state.generations, generation]
      })),
      clearGenerations: () => set({ generations: [] }),
    }),
    {
      name: 'generation-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
)