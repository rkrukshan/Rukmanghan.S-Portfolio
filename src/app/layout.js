// app/layout.js
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Rukmanghan.S",
  description:
    "Professional software engineer portfolio featuring full-stack web development with React, Node.js, Java Spring Boot, and cloud-native solutions. Specializing in responsive UI/UX, REST APIs, database design, and DevOps automation with Docker and CI/CD pipelines.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
