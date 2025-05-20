import "bun/styles/globals.css";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Tests",
  description: "just some tests",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-neutral-900" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
