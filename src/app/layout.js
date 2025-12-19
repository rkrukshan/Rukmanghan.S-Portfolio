// app/layout.js
import Navbar from "./components/Navbar";
import "./globals.css";
// ✅ Updated path to ensure it points to your components directory

export const metadata = {
  title: "My Portfolio",
  description: "Built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {" "}
        {/* Added standard Next.js body classing if needed */}
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
