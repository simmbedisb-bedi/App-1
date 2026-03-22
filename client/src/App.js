import React, { useState } from "react";
import BottomNav    from "./components/BottomNav";
import Dashboard    from "./pages/Dashboard";
import WeeklyPage   from "./pages/WeeklyPage";
import HistoryPage  from "./pages/HistoryPage";
import BadgesPage   from "./pages/BadgesPage";
import SettingsPage from "./pages/SettingsPage";

const PAGES = {
  dashboard: Dashboard,
  weekly:    WeeklyPage,
  history:   HistoryPage,
  badges:    BadgesPage,
  settings:  SettingsPage,
};

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const Page = PAGES[activePage] || Dashboard;

  return (
    <>
      <Page />
      <BottomNav active={activePage} onChange={setActivePage} />
    </>
  );
}
