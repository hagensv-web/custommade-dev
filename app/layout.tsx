import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/core/Header";
import Footer from "@/components/core/footer/Footer";
import SidebarAd from "@/components/core/ad/SidebarAd";

export const metadata: Metadata = {
  title: {
    default: "CustomMade Games",
    template: "%s | CustomMade Games"
  },
  description: "Free games and game generators. No sign up required.",
  metadataBase: new URL("https://custommade.games"),
  other: {
    "google-site-verification": "AEBD389WngD937lWHS-pgY5RbAaPOHABFRBWM84bm7g"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Schoolbell&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2755508775935324"
     crossOrigin="anonymous"></script>
      </head>

      <body className="min-h-screen bg-neutral-100 text-black dark:bg-mist-900 dark:text-neutral-200">
      <div className="bg-violet-600/15">

      <Header />

      <div className="grid grid-cols-8">

        <div className="col-span-1 hidden lg:flex justify-center items-center p-3">
          <SidebarAd />
        </div>
          
        <main className="flex col-span-8 lg:col-span-6 pt-6 px-10 lg:px-2">
          {children}
        </main>

        <div className="col-span-1 hidden lg:flex justify-center items-center p-3">
          <SidebarAd />
        </div>
      </div>

      <Footer />

      </div>

      </body>
    </html>
  );
}
