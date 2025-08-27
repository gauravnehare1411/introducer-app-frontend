import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useMortgageStore = create(
    persist(
      (set, get) => ({
        mortgagedata: {},
        updateMortgage: (mortgagedata) => set({ mortgagedata: mortgagedata }),
      }),
      {
        name: 'submittedData',
      },
    ),
  )
  
  export default useMortgageStore;