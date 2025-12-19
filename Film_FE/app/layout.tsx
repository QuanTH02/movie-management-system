import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/app/components/common/Footer";
import { ToastProvider } from "@/app/components/common/Toast";

export const metadata: Metadata = {
  title: "HYF Movie",
  description: "Movie Management System",
  icons: {
    icon: "/media/title_img.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className="bg-dark-bg">
        <ToastProvider>
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
