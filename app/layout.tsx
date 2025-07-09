import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "StraytoStay",
  description: "Adopt a friend, save a life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
