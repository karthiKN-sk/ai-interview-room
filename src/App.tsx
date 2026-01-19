
// import StartInterviewForm from "./room/StartInterviewForm";
// import InterviewRoom from "./room/InterviewRoom";
// import { useInterviewStore } from "./store/InterviewStore";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import CandidateStartPage from "./interview/CandidateStartPage";
import CandidateInterviewPage from "./interview/CandidateInterviewPage";

function App() {
  // const question = useInterviewStore((s) => s.question);

  // return (
  //   <div className="min-h-screen bg-gray-50 p-4">
  //     {!question ? <StartInterviewForm /> : <InterviewRoom />}
  //   </div>
  // );


  return (
    <BrowserRouter>
      <Routes>
        {/* Candidate enters interview link */}
        <Route path="/candidate/:interview_id" element={<CandidateStartPage />} />

        {/* After registration → candidate interview flow */}
        <Route
          path="/candidate/:candidate_id/interview"
          element={<CandidateInterviewPage />}
        />
      </Routes>
    </BrowserRouter>
  );

}

export default App
