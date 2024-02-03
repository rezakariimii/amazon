import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { Providers } from "./GlobalRedux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Amazon Shop",
  description: "shopping website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            {children}
            <footer className="footer footer-center p-4 bg-base-300 text-base-content">
              <p>Copyright &copy; 2024 | Developer : Reza karimi</p>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
