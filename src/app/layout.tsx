import type { Metadata } from "next";
import { Assistant } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Maxi Pública - Inventario de Autos",
  description: "Sistema de gestión de inventario de autos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={assistant.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}