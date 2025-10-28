import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentKit demo",
  description: "Demo of ChatKit with hosted workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="beforeInteractive"
        />
        <Script id="chatkit-init" strategy="afterInteractive">
  {`
    window.chatkitConfig = {
      style: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80vw",
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }
    };
  `}
</Script>
            <style>{`
    html, body {
      background-color: white !important;
    }
  `}</style>
            </head>
      <body className="antialiased">
        <main
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
