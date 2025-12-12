import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { CartProvider } from "../context/CartContext";
import { Header } from "@/components/Header";
import "@mantine/core/styles.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iPhone 17 Pro - Apple",
  description: "Experience the new iPhone 17 Pro. Titanium design, A19 Pro chip, and more.",
};

const theme = createTheme({
  fontFamily: inter.style.fontFamily,
  headings: { fontFamily: inter.style.fontFamily },
  primaryColor: 'dark',
  colors: {
    dark: ['#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40', '#2C2E33', '#25262B', '#1A1B1E', '#141517', '#101113'],
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'xl',
      }
    }
  }
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
