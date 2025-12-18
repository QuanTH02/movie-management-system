import type { Metadata } from "next";
import "./globals.css";

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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        />
        <link rel="stylesheet" href="/static/home.css" />
        <link rel="stylesheet" href="/static/login.css" />
        <link rel="stylesheet" href="/static/lib-bootstrap/bootstrap.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
