import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMDB Proxy API",
  description: "Backend proxy para The Movie Database API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
