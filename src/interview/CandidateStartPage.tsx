import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function CandidateStartPage() {
    const { interview_id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleStart = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/candidate/${interview_id}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                }),
            }
        );

        const data = await res.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        // redirect candidate to interview screen
        navigate(`/candidate/${data.candidate_id}/interview`);
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Start Interview</h2>

            <form onSubmit={handleStart} className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                        className="w-full mt-1 p-2 border rounded-lg"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                        className="w-full mt-1 p-2 border rounded-lg"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg">
                    Start Interview
                </button>
            </form>
        </div>
    );
}
