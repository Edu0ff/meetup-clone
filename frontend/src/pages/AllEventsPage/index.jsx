import React from "react";
import "./style.css";
import ConfirmBox from "../../components/ConfirmBox";
import ScrollToTop from "../../components/ScrollToTop";

function AllEventsPage() {
  return (
    <main className="events-page">
      <p>All Events Page</p>
      <ConfirmBox />
      <ScrollToTop />
    </main>
  );
}

export default AllEventsPage;
