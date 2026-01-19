
import { useInterviewFormStore } from "../store/InterviewFormStore";
import { useInterviewStore } from "../store/InterviewStore";

export default function StartInterviewForm() {
    const startInterview = useInterviewStore((s) => s.startInterview);
    const { userName, role, difficulty, setUserName, setRole } = useInterviewFormStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            user_id: userName.trim().toLowerCase().replace(/\s+/g, "_"),
            user_name: userName.trim(),
            role: role.trim(),
            difficulty: difficulty,
        };

        await startInterview(payload);
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-4">Start Interview</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border rounded-lg"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="text-sm font-medium">Role</label>
                    <input
                        type="text"
                        className="w-full mt-1 p-2 border rounded-lg"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    />
                </div>


                <button
                    type="submit"
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg"
                >
                    Start Interview
                </button>
            </form>
        </div>
    );
}
