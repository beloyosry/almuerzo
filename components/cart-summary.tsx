"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { formatCurrencyString } from "use-shopping-cart"

import { Button } from "@/components/ui/button"
import { UseCart } from "./cart-provider"
import Link from "next/link"
import { product } from "@/sanity/schemas/product-schema"
import { Locations, Order, OrderItem, SanityProduct, User } from "@/config/inventory"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

interface Props {
  target: string
  home?: boolean
  checkout?: boolean
}

export function CartSummary({ target, home, checkout = false }: Props) {
  const { cartItems } = UseCart()
  const cartCount = cartItems?.length
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const [locations, setLocations] = useState<Locations[] | null>(null);
  const isDisabled = isLoading || cartCount! === 0

  const selectedLocation = sessionStorage.getItem("selectedLocation");
  const isShipping = sessionStorage.getItem("isShipping");
  const selectedLocationObject = locations?.find((location) => location.location === selectedLocation);
  const shippingValue = isShipping === "true" ? selectedLocationObject?.shippingPrice || 0 : 0
  const shippingAmount = cartCount! > 0 ? shippingValue : 0

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const fetchedLocations = await client.fetch<Locations[]>(groq`*[_type == "shipping"]`);
        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const user = {
    name: sessionStorage.getItem("name") || "",
    address: sessionStorage.getItem("address") || "",
    phone: sessionStorage.getItem("phoneNumber") || "",
  }


  if (!cartItems) {
    return null
  }

  // Calculate total price including weights
  const totalWeightPrice = Object.values(cartItems).reduce(
    (total, product) => {
      const productData: { price?: number } | undefined = product.product_data
      const productPrice: number =
        productData && typeof productData === "object"
          ? productData.price || 0
          : 0

      return total + (productPrice * Number(product.product_data?.quantity)) || 0
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
    setLoading(true);

    if (checkout) {
      try {
        // Prepare order data
        const orderData = {
          orderDate: new Date().toISOString(),
          items: cartItems.map((item, index) => ({
            _key: item._id + index,
            name: item.name,  // Assuming each cart item has a 'name' property
            price: (Number(item.product_data?.price) / 100) * (Number(item.product_data?.quantity)) || 0,  // Adjust as per your data structure
            quantity: item.product_data?.quantity || 0,
            weight: String(item.product_data?.size) || "",
          })) as OrderItem[],
          user: user as User,
          totalPrice: String(totalAmount / 100) + " EGP",
        };

        // Send the order data to the API route
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Order created successfully:", result.order);
          // Redirect to the next page or handle success as needed
          router.push(target);
        } else {
          console.error("Failed to create order:", response.statusText);
          // Handle error
        }
      } catch (error) {
        console.error("Error processing the order:", error);
        // Handle error
      }

    } else {
      await pause(3000)
      router.push(target)
    }

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
        {shippingValue !== 0 && (
          <>
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
          </>
        )}
      </dl>

      <div className="mt-6 flex w-full flex-col items-center justify-between">
        <Button onClick={onCheckout} className="w-full" disabled={isDisabled}>
          {isLoading ? "جاري المعالجة..." : checkout ? "تأكيد الطلب" : "التالي"}
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
        {home &&
          <Link href="/" className="mt-5 w-fit text-[12px] font-medium text-blue-600 underline">العودة للرئيسية</Link>
        }
      </div>
    </section>
  )
}
