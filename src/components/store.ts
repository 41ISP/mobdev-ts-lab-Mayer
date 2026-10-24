import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nanoid } from 'nanoid'
import type { IPayment, INewPayment } from '/workspaces/mobdev-ts-lab-Mayer/src/types.ts'

interface IPaymentsState {
  items: IPayment[]
  addPayment: (data: INewPayment) => void
  removePayment: (id: string) => void
  togglePaid: (id: string) => void
}

export const usePaymentsStore = create<IPaymentsState>()(
  persist(
    (set) => ({
      items: [],
      addPayment: (data) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...data,
              id: nanoid(),
              paid: false,
            },
          ],
        })),
      removePayment: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      togglePaid: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, paid: !item.paid } : item
          ),
        })),
    }),
    {
      name: 'payments-storage', // ключ в localStorage
    }
  )
)