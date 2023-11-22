import { Ubuntu } from "next/font/google";
import "./globals.css";

const inter = Ubuntu({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "BMI Calculator",
  description:
    "A simple and efficient tool to calculate your Body Mass Index (BMI).",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html data-theme="lemonade" lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </>
  );
}
