import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aging Residence",
  description: "A platform dedicated to helping seniors find the best living communities that meet their needs and preferences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
<Script async src="https://www.googletagmanager.com/gtag/js?id=G-XC4HV01N8M"></Script>
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XC4HV01N8M');
  `}
</Script>
    </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
