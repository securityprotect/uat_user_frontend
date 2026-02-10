import "../styles/globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "ParkPing",
  description: "Smart vehicle contact system"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
