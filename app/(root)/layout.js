import "../globals.css";
import React from "react";
// import BottomBar from "../../components/BottomBar";
import LeftSidebar from "../../components/LeftSidebar";

import TopBar from "../../components/TopBar";

export default function RootLayout({ children }) {
  return (
    <>
      <main className="flex h-screen w-screen flex-row overflow-hidden">
        <LeftSidebar />
        <section className="flex size-full flex-col overflow-y-auto bg-card">
          <TopBar />
          {children}
        </section>
      </main>

      {/* <BottomBar /> */}
    </>
  );
}
