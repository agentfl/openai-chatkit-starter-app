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
        {/* Load ChatKit library */}
        <Script
          src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
          strategy="beforeInteractive"
        />

        {/* Initialize ChatKit configuration */}
        <Script id="chatkit-init" strategy="afterInteractive">{`
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
              background: "transparent",
              border: "none",
              boxShadow: "none",
              borderRadius: "0",
            },
          };
        `}</Script>

        {/* Override ChatKit container background */}
        <Script id="chatkit-remove-gray" strategy="afterInteractive">{`
          function removeChatkitGray() {
            const host = document.querySelector('[data-chatkit-root]');
            if (!host) return;
            host.style.background = "transparent";
            host.style.boxShadow = "none";
            host.style.border = "none";
            host.style.borderRadius = "0";
            host.style.padding = "0";
          }

          // Wait for chatkit to initialize
          const observer = new MutationObserver(() => removeChatkitGray());
          observer.observe(document.body, { childList: true, subtree: true });
          window.addEventListener("load", removeChatkitGray);
        `}</Script>

        <style>{`
          html, body {
            background: white !important;
            overflow: hidden;
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
            backgroundColor: "white",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
