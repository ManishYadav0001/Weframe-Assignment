import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UploadsHeader() {
  return (
    <div className="flex mx-4 p-4  items-center justify-between mb-4">
      {/* Left side - Title and subtitle */}
      <div>
        <h2 className="text-lg font-semibold">My Uploads</h2>
        <p className="text-sm text-gray-500">
          Documents that are uploaded by you.
        </p>
      </div>

      {/* Right side - Ellipsis menu button */}
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-5 rotate-90 w-5 text-gray-500" />
      </Button>
    </div>
  )
}