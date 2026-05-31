import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />

        <div className="flex">
          <Sidebar />

          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}