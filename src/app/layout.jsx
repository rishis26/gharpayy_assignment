import "./globals.css";
import SessionProvider from "@/components/ui/SessionProvider";

export const metadata = {
  title: "Gharpayy CRM | Administrative Portal",
  description: "Secure lead and operations management for Gharpayy.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
