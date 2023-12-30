"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { Button } from "@/components/ui/button"

export function CartSummary() {
  const { cartDetails, cartCount, redirectToCheckout } = useShoppingCart()
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const isDisabled = isLoading || cartCount! === 0
  const shippingValue = 50
  const shippingAmount = cartCount! > 0 ? shippingValue : 0

  if (!cartDetails) {
    return null
  }

  // Calculate total price including weights
  const totalWeightPrice = Object.values(cartDetails).reduce(
    (total, product) => {
      const productData: { price?: number } | undefined = product.product_data
      const productPrice: number =
        productData && typeof productData === "object"
          ? productData.price || 0
          : 0

      return total + productPrice * product.quantity
    },
    0
  )

  const totalAmount = totalWeightPrice + shippingAmount * 100

  const pause = (duration: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration)
    })
  }
  async function onCheckout() {
    setLoading(true)
    await pause(3000)
    router.push("/contact-form")
    setLoading(false)
  }

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-6 shadow-md dark:border-gray-900 dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        ملخص الطلب
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">المجموع الجزئي</dt>
          <dd className="text-sm font-medium">
            {formatCurrencyString({
              currency: "EGP",
              value: totalWeightPrice,
            })}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="flex items-center text-sm">
            <span>مصاريف الشحن</span>
          </dt>
          <dd className="text-sm font-medium">
            {formatCurrencyString({
              currency: "EGP",
              value: shippingAmount * 100,
            })}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
          <dt className="text-base font-medium">المجموع الكلي</dt>
          <dd className="text-base font-medium">
            {formatCurrencyString({
              currency: "EGP",
              value: totalAmount,
            })}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button onClick={onCheckout} className="w-full" disabled={isDisabled}>
          {isLoading ? "جاري المعالجة..." : "التالي"}
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </div>
    </section>
  )
}
