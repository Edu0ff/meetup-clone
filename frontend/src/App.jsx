import { Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import AllEventsPage from "./pages/AllEventsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import EventPage from "./pages/EventPage";
import NotFoundPage from "./pages/NotFoundPage";
import PostEventPage from "./pages/PostEventPage";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user/:nickname" element={<ProfilePage />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route element={<PrivateRoutes />}>
          <Route path="/profile/:nickname" element={<ProfilePage />} />
          <Route path="/postEvent" element={<PostEventPage />} />
        </Route> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
