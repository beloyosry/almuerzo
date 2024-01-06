"use client"

import { useEffect } from "react"
import { CheckCheck, XCircle } from "lucide-react"
import { UseCart } from "./cart-provider"

export function CheckoutSession() {
  const { clearCart } = UseCart()

  const customerDetails = {
    name: sessionStorage.getItem("name"),
    address: sessionStorage.getItem("address"),
    phonNumber: sessionStorage.getItem("phoneNumber"),
  }

  useEffect(() => {
    if (customerDetails) {
      clearCart()
    }
  }, [customerDetails])

  if (
    !customerDetails ||
    !customerDetails.name ||
    !customerDetails.address ||
    !customerDetails.phonNumber
  ) {
    return (
      <>
        <XCircle className="mx-auto h-10 w-10 text-red-400" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-400 sm:text-5xl">
          لا توجد جلسة دفع !
        </h1>
      </>
    )
  }

  return (
    <>
      <CheckCheck className="mx-auto h-10 w-10 text-lime-500 dark:text-lime-400" />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-lime-500 dark:text-lime-400 sm:text-5xl">
        تم الطلب بنجاح!
      </h1>
      <h3 className="mt-8 text-2xl leading-7">
        شكرا لك, <span className="font-extrabold">{customerDetails.name}</span>!
      </h3>
      <p className="mt-8">
        سيتم التواصل معكم على الرقم{" "}
        <span className="mx-1 font-extrabold text-indigo-500">
          {customerDetails.phonNumber}
        </span>{" "}
        ليتم تأكيد الطلب ومراجعة البيانات. <br />
        سعداء بخدمتكم.
      </p>
    </>
  )
}
