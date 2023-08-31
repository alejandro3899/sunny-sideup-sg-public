import localFont from "@next/font/local";
import Script from "next/script";

import "@/styles/globals.css";

const autautGrotesk = localFont({
  src: [
    { path: "../fonts/AutautGrotesk-Regular.otf", weight: "400" },
    { path: "../fonts/AutautGrotesk-Medium.otf", weight: "500" },
    { path: "../fonts/AutautGrotesk-Semibold.otf", weight: "600" },
  ],
  variable: "--font-autaut",
});
const monumentGrotesk = localFont({
  src: [
    { path: "../fonts/ABCMonumentGrotesk-Bold-Trial.woff2", weight: "700" },
  ],
  variable: "--font-monument",
});
const gaisyr = localFont({
  src: [{ path: "../fonts/ABCGaisyr-Book-Trial.woff2", weight: "400" }],
  variable: "--font-gaisyr",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={[
        autautGrotesk.variable,
        monumentGrotesk.variable,
        gaisyr.variable,
      ].join(" ")}
      suppressHydrationWarning={true}
    >
      <head />
      <body
        className="relative flex min-h-screen flex-col"
        suppressHydrationWarning={true}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7Y3MGNLB4C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-YWVNFXPEXF');
        `}
        </Script>
      </body>
    </html>
  );
}
