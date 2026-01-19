import { useEffect, useState } from "react";
import { useInterviewStore } from "../store/InterviewStore";

export default function InterviewRoom() {
    const { question, submitting, submitAnswer } = useInterviewStore();

    const [answer, setAnswer] = useState("");

    // Speak question
    useEffect(() => {
        if (!question?.text) return;
        const u = new SpeechSynthesisUtterance(question.text);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
    }, [question]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await submitAnswer(answer);
        setAnswer("");
    };

    if (!question) return null;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-xl font-bold mb-4">Interview Room</h2>

            <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <p className="text-sm text-gray-500">Current Question</p>
                <p className="font-semibold">{question.text}</p>
            </div>

            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full p-3 border rounded-lg"
                    rows={5}
                    placeholder="Your answer..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />

                <button
                    type="submit"
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                    {submitting ? "Submitting..." : "Submit & Next"}
                </button>
            </form>
        </div>
    );
}
