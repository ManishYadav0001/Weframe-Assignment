"use client"

import Image from "next/image"
import { Settings } from "lucide-react"

export default function Header() {
  return (
    <header className="w-full h-14 py-6  flex items-center justify-between border-b border-blue-800">
      {/* Left side */}
      <div className="text-white text-lg font-semibold">
       
      </div>

      {/* Right side */}
      <div className="flex  pr-10 items-center gap-4">
        {/* Settings button */}
        <button className="p-2 rounded-lg bg-white hover:bg-gray-200 transition">
          <Settings className="w-5 h-5 text-gray-800" />
        </button>

        {/* Profile image */}
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="/profile.avif"
            alt="User"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  )
}