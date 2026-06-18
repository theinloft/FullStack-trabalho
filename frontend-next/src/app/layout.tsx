import type { Metadata } from "next";
import "./globals.css";
import Menu from "@/components/Menu/Menu";

export const metadata: Metadata = {
  title: "SHRED_LAB",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
