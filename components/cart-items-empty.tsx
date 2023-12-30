"use client"

import Link from "next/link"
import { Plus, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export function CartItemsEmpty() {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-800">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
        <XCircle className="h-10 w-10 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">لم يتم إضافة منتجات حتى الآن</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          أضف منتجات إلى عربة تسوقك.
        </p>
        <Link href="/">
          <Button size="sm" className="relative">
            أضف منتجات
            <Plus className="mr-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
