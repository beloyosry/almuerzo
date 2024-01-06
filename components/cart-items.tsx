"use client"

import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/sanity/lib/image"
import { Clock, X } from "lucide-react"
import { formatCurrencyString } from "use-shopping-cart"
import { shimmer, toBase64 } from "@/lib/image"
import { getWeightName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { CartItemsEmpty } from "@/components/cart-items-empty"
import { SanityProduct } from "@/config/inventory"
import { UseCart } from "@/components/cart-provider"

export function CartItems() {
  const { removeFromCart, updateQuantity, cartItems } = UseCart()
  const { toast } = useToast()

  function removeCartItem(product: SanityProduct) {
    removeFromCart(product);

    toast({
      title: `${product.name} تم الحذف`,
      description: "تم الحذف من السلة",
      variant: "destructive",
    })
  }

  if (cartItems.length === 0) return <CartItemsEmpty />


  return (
    <ul
      role="list"
      className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-500 dark:border-gray-500"
    >
      {cartItems.map((product: SanityProduct, productIdx: number) => (
        <li key={productIdx} className="flex py-6 sm:py-10">
          <div className="shrink-0">
            <Image
              src={urlForImage(product.images[0]).url()}
              alt={product.name}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(200, 200)
              )}`}
              className="h-24 w-24 rounded-md border-2 border-gray-200 object-cover object-center dark:border-gray-800 sm:h-48 sm:w-48"
            />
          </div>

          <div className="mr-4 flex flex-1 flex-col justify-between sm:mr-6">
            <div className="relative justify-between border-b border-b-gray-400 pb-3 pl-9 sm:flex sm:gap-x-6 sm:pl-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    <Link
                      href={`/products/${product.slug}`}
                      className="font-medium"
                    >
                      {product.name}
                    </Link>
                  </h3>
                </div>
                <p className="mt-1 text-sm font-medium">
                  {formatCurrencyString({
                    value: product.product_data?.price || 0,
                    currency: product.currency,
                  })}
                </p>
                <p className="mt-1 text-sm font-medium">
                  الوزن (ك): {/* @ts-ignore */}
                  <strong>{getWeightName(product.product_data?.weight)}</strong>
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:pl-9">
                <label htmlFor={`quantity-${productIdx}`} className="sr-only">
                  الكمية, {product.name}
                </label>
                <Input
                  id={`quantity-${productIdx}`}
                  name={`quantity-${productIdx}`}
                  type="number"
                  className="w-16"
                  min={1}
                  max={10}
                  value={product.product_data?.quantity}
                  onChange={(event) => {
                    const newQuantity = Number(event.target.value);
                    updateQuantity(product._id, product.product_data?.weight || "", newQuantity);
                  }}
                />
                <div className="absolute left-0 top-0">
                  <Button
                    variant="ghost"
                    type="button"
                    className="-ml-2 inline-flex p-2"
                    onClick={() => removeCartItem(product)}
                  >
                    <span className="sr-only">حذف</span>
                    <X className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>
            <div>
              الإجمالي:{" "}
              {formatCurrencyString({
                value: (() => {
                  const productData = product.product_data;
                  const productPrice = productData?.price || 0;
                  const productQuantity = productData?.quantity || 0;

                  return productPrice * productQuantity;
                })(),
                currency: product.currency,
              })}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
