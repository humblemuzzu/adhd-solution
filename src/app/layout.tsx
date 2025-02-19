import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TaskProvider } from "@/lib/task-context";
import { InboxProvider } from "@/lib/inbox-context";
import { RootLayout as AppLayout } from "@/components/layout/root-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FocusFlow Lite",
  description: "Stay focused, get more done.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TaskProvider>
            <InboxProvider>
              <AppLayout>{children}</AppLayout>
            </InboxProvider>
          </TaskProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
