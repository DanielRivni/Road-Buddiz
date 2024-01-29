import SignUpPage from "./pages/SignUpPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Profile from "./pages/ClientProfile.jsx";
import RequestsPage from "./pages/RequestsPage.jsx";
// import OpenRequestPage from './pages/OpenRequestPage.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VolunteerTaskPage from "./pages/VolunteerTaskPage.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/RequestsPage" element={<RequestsPage />} />
          <Route path="/VolunteerTaskPage" element={<VolunteerTaskPage />} />
          {/* <Route path="/OpenRequestPage" element={<OpenRequestPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
