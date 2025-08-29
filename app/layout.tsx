import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "My Dashboard",
  description: "Internship assignment",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        {/* Yahan Navbar / Sidebar aa sakta hai */}
        {children}
      </body>
    </html>
  )
}