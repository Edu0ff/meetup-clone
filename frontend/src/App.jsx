import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Toaster } from "sonner";
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
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiePage from "./pages/CookiePage";

function App() {
  return (
    <div className="app">
      <Toaster position="top-left" richColors /> <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user/:nickname" element={<ProfilePage />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/cookie" element={<CookiePage />} />
        <Route path="/postevent" element={<PostEventPage />} />
        {/* PRIVADA postevent,/profile/:nickname"  */}
        {/* <Route element={<PrivateRoutes />}>          
        </Route> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
