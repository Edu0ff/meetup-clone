import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Landing page</h1>
      {/* <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<AllEventsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/user/:nickname" element={<ProfilePage />} />
        <Route path="/event/:id" element={<EventCard />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/profile/:nickname" element={<ProfilePage />} />
          <Route path="/addEvent" element={<AddEvent />} />
        </Route>
      </Routes>
      <Footer /> */}
    </div>
  );
}

export default App;
