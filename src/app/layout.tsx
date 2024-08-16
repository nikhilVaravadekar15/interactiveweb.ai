import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryClientProvider from "@/components/providers/ReactQueryClientProvider";

export const metadata: Metadata = {
  title: "Interactiveweb.ai",
  description: "Chat with any website",
  icons: {
    icon: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryClientProvider>
        <body className="h-screen w-screen">
          {children}
          <Toaster />
        </body>
      </ReactQueryClientProvider>
    </html>
  );
}
