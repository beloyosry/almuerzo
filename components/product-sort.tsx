"use client"

import { useRouter } from "next/navigation"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const sortOptions = [
  { name: "الأجدد", value: "/?date=desc" },
  { name: "السعر، من الأقل للأكثر", value: "/?price=asc" },
  { name: "السعر، من الأكثر للأقل", value: "/?price=desc" },
]

export function ProductSort() {
  const router = useRouter()
  return (
    <div className="flex items-center">
      <Select onValueChange={(value) => router.replace(value)}>
        <SelectTrigger className="sm:w-[180px]" dir="rtl">
          <SelectValue placeholder="الفرز ب" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.name} value={option.value} dir="rtl">
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
