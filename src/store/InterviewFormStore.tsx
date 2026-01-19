import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FormState {
  userName: string;
  role: string;
  difficulty: string;

  setUserName: (v: string) => void;
  setRole: (v: string) => void;
}

export const useInterviewFormStore = create<FormState>()(
  persist(
    (set) => ({
      userName: "",
      role: "",
      difficulty: "medium",

      setUserName: (v) => set({ userName: v }),
      setRole: (v) => set({ role: v }),
    }),
    {
      name: "interview-form",
    }
  )
);
