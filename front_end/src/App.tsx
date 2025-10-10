import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RoundPage from "./pages/RoundPage";

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/round" element={<RoundPage />} />
      </Routes>
    </Router>
  )
}

export default App;