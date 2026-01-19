import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CandidateInterviewPage() {
    const { candidate_id } = useParams();
    const navigate = useNavigate();

    const [question, setQuestion] = useState("");
    const [, setQuestionType] = useState("");
    const [index, setIndex] = useState(0);
    const [total, setTotal] = useState(0);

    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(true);
    const [finished, setFinished] = useState(false);

    // Fetch question from backend
    const fetchQuestion = async () => {
        setLoading(true);

        const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/candidate/${candidate_id}/question`
        );
        const data = await res.json();
        console.log("Fetched question:", data);

        if (data.finished) {
            setFinished(true);
        } else {
            // FIX ✔ extract actual text
            setQuestion(data.question.question);
            setQuestionType(data.question.type);
            setIndex(data.index);
            setTotal(data.total);
        }

        setLoading(false);
    };

    // Submit answer
    const submitAnswer = async () => {
        if (!answer.trim()) {
            alert("Please type your answer.");
            return;
        }

        setLoading(true);

        await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/candidate/${candidate_id}/answer`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answer }),
            }
        );

        setAnswer(""); // Reset input
        fetchQuestion(); // Load next question
    };

    // Load first question
    useEffect(() => { const load = async () => { await fetchQuestion(); }; load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Loading UI
    if (loading)
        return (
            <div className="flex flex-col items-center justify-center h-screen space-y-3">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                <p className="text-gray-600">Next Question Loading...</p>
            </div>
        );

    // Finished UI
    if (finished) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                    Interview Completed!
                </h2>

                <p className="text-gray-700 text-lg">
                    Thank you for your time.
                    HR will get back to you with the results.
                </p>

                <button
                    onClick={() => navigate("/")}
                    className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                    Return Home
                </button>
            </div>
        );
    }

    // Main UI
    return (
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-white shadow rounded-xl">
            <h2 className="text-xl font-bold mb-4">
                Question {index + 1} / {total}
            </h2>

            {/* <p className="text-sm text-gray-500 mb-2">{questionType}</p> */}

            <p className="text-lg font-medium mb-6 text-gray-800 rounded-lg p-4 bg-gray-50">
                {question}
            </p>

            <textarea
                className="w-full border rounded-lg p-3 mb-4"
                rows={5}
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
            />

            <button
                onClick={submitAnswer}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
            >
                Submit Answer
            </button>
        </div>
    );
}
