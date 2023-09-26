import "@/styles/globals.css";

import { Favicon, Image, Setting } from "@/types/cms";
import { getGlob } from "@/utils/api";
import clsx from "clsx";
import localFont from "@next/font/local";
import Script from "next/script";

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

export async function generateMetadata() {
  const { siteTitle, siteDescription } = await getGlob<Setting>(
    "/settings",
    {},
    {
      next: { tags: ["settings"] },
    }
  );

  return {
    title: siteTitle,
    description: siteDescription,
    openGraph: {
      siteName: siteTitle || "Sunny Side Up",
      type: "website",
      title: siteTitle,
      description: siteDescription,
    },
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const { favicon } = await getGlob<Favicon>(
    "/favicon",
    {},
    { next: { tags: ["favicon"] } }
  );
  const faviconUrl = (favicon as Image)?.imagekit?.url;

  return (
    <html
      lang="en"
      className={clsx(
        autautGrotesk.variable,
        monumentGrotesk.variable,
        gaisyr.variable
      )}
      suppressHydrationWarning={true}
    >
      <head>
        <meta name="color-scheme" content="light only" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        {faviconUrl && (
          <link rel="icon" type="image/x-icon" href={faviconUrl} sizes="any" />
        )}
      </head>
      <body
        className="relative flex min-h-[100svh] flex-col"
        suppressHydrationWarning={true}
      >
        {children}
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.1/TweenMax.min.js" />
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
