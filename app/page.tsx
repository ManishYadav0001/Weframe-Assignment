"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Click here to see the Dashboard ( <span className="text-blue-400">Hopefully you like it :D</span> )</h1>

      <Button onClick={() => router.push("/dashboard")}>
        Go to Dashboard
      </Button>
    </div>
  )
}