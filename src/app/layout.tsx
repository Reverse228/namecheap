"use client";

import { Rubik } from "next/font/google";
import "@utils/theme/css/globalStyled.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useMemo } from "react";
import Head from "next/head";

const rubik = Rubik({ subsets: ["latin"] });

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
        <body className={rubik.className}>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
