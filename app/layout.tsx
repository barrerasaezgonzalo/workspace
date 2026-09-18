import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TaskProvider } from "./providers/TaskProvider";
import { AuthProvider } from "./providers/AuthProvider";
import "./globals.css";
import { NoteProvider } from "./providers/NoteProvider";
import { SearchProvider } from "./providers/SearchProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Workspace",
  description: "Gestiona tus tareas y proyectos de forma simple y organizada.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <SearchProvider>
            <TaskProvider>
              <NoteProvider>{children}</NoteProvider>
            </TaskProvider>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
