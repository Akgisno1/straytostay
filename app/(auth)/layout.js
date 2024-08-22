// import TopBar from "../../components/TopBar.jsx";

import React from "react";

export default function RootLayout({ children }) {
  return (
    <section>
      <div className="h-screen w-screen overflow-hidden ">{children}</div>
    </section>
  );
}
