import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@utils/theme/css/globalStyled.css";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
