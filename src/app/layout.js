import "./globals.css";
import SessionProvider from "@/components/ui/SessionProvider";

export const metadata = {
  title: "Gharpayy CRM | Administrative Portal",
  description: "Secure lead and operations management for Gharpayy.",
  icons: {
    icon: "https://gharpayy.com/img/logo/gharpayy_logo2.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://gharpayy.com/img/logo/gharpayy_logo2.png"
        />
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
