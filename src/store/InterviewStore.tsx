import { create } from "zustand";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface SessionPayload {
    user_id: string;
    user_name: string;
    role: string;
    difficulty: string;
}

export interface Question {
    id: string;
    text: string;
}

interface InterviewState {
    session: SessionPayload | null;
    question: Question | null;
    loading: boolean;
    submitting: boolean;

    startInterview: (payload: SessionPayload) => Promise<void>;
    submitAnswer: (answer: string) => Promise<void>;
}

export const useInterviewStore = create<InterviewState>((set, get) => ({
    session: null,
    question: null,
    loading: false,
    submitting: false,

    startInterview: async (payload) => {
        set({ loading: true });

        try {
            const res = await fetch(`${BASE_URL}/v1/interview/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to start interview");

            const data = await res.json();

            // If backend returns empty question
            if (!data.first_question || data.first_question.trim() === "") {
                toast.error("No questions available. Please try a different role or difficulty.");
                return;
            }

            set({
                session: payload,
                question: {
                    id: data.session_id,
                    text: data.first_question,
                },
            });
        } finally {
            set({ loading: false });
        }
    },

    submitAnswer: async (answer) => {
        const currentQ = get().question;
        const session = get().session;
        if (!currentQ || !session) return;

        set({ submitting: true });

        try {
            const res = await fetch(`${BASE_URL}/v1/questions/next`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    session_id: currentQ.id,
                    prev_question: currentQ.text,
                    prev_answer: answer,
                }),
            });

            const data = await res.json();

            if (!data.prev_question || data.prev_question.trim() === "") {
                toast.error("No more questions available.");
                return;
            }

            set({
                question: {
                    id: data.session_id,
                    text: data.prev_question,
                },
            });
        } finally {
            set({ submitting: false });
        }
    },

}));
