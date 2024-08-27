import "./globals.css";
import "./scrollbar.css";
import { ThemeProvider } from "../context/ThemeProvider.jsx";
import { Toaster } from "../components/ui/toaster.jsx";
import { AuthContextProvider } from "../context/AuthContext.jsx";
export const metadata = {
  title: "StraytoStay",
  icons: {
    icon: "/straytostay.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthContextProvider>
            {children}
            <Toaster />
          </AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
