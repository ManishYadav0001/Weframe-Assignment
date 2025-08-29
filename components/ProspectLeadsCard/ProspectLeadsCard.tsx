"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ProspectLeadsCard() {
  const leads = [
    {
      name: "Wade Warren",
      stage: "Initial Inquiry",
      img: "/girl.jpg",
    },
    {
      name: "Ava Wright",
      stage: "Initial Inquiry",
      img: "/youngman.jpg",
    },
    {
      name: "Cody Fisher",
      stage: "Initial Inquiry",
      img: "/girl2.jpg",
    },
  ]

  return (
    <Card className="w-full h-[300px] pb-2 rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">
          Prospect Leads
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {leads.map((lead, idx) => (
          <div
            key={idx}
            className="flex  items-center justify-between p-3 bg-gray-50 rounded-xl"
          >
            {/* Left section with avatar and name */}
            <div className="flex items-center gap-3">
              <img
                src={lead.img}
                alt={lead.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-sm font-medium">{lead.name}</span>
            </div>

            {/* Stage text */}
            <p className="text-xs text-gray-500">
              Stage: <span className="font-medium text-gray-700">{lead.stage}</span>
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}