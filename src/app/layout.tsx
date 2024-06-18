"use client";

import { Inter } from "next/font/google";
import "@utils/theme/css/globalStyled.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useMemo } from "react";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 60000 * 60,
          refetchOnWindowFocus: false,
        },
        mutations: {
          onError: (error) => {
            console.error(error);
          },
        },
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <html>
        <Head>
          <title>Name of site</title>
        </Head>
        <body className={inter.className}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
