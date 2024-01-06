"use client"

import React from "react"
import { CheckoutSession } from "@/components/checkout-session"

export default function Page() {
  setTimeout(() => {
    window.location.href = "/"
    sessionStorage.clear()
  }, 10000)

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* Checkout session */}
        <CheckoutSession />
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            onClick={() => sessionStorage.clear()}
            href="/"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            العودة للرئيسية
          </a>
          <a href="#" className="text-sm font-semibold">
            تواصل معنا <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  )
}
