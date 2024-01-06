"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatCurrencyString } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { UseCart } from "./cart-provider"


interface Props {
  product: SanityProduct
}

export function ProductInfo({ product }: Props) {
  const { addItemToCart, updateQuantity } = UseCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const { toast } = useToast()

  const weights = [1 / 4, 1 / 3, 1 / 2, 1]
  const weight: number | undefined = weights.find(
    (w) => w === eval(selectedSize)
  )
  const weightPrice = weight ? weight * product.price * 100 : 0

  const product_data = {
    size: selectedSize as string,
    price: weightPrice as number,
    quantity: 1 as number
  }

  const isInCart = !!product_data?.size || !!product._id

  function addToCart() {
    const item = {
      ...product,
      product_data
    }

    // isInCart ? updateQuantity(item._id, item.product_data.quantity) : addItemToCart(item);
    addItemToCart(item)

    toast({
      title: `${item.name} (${getSizeName(selectedSize)} كيلو)`,
      description: "تمت الاضافة للسلة",
      action: (
        <Link href="/cart">
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            <span>إذهب للسلة</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      ),
    })
  }



  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">
          {formatCurrencyString({
            value: weightPrice,
            currency: product.currency,
          })}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <div className="mt-4">
        <p>
          الوزن (ك): <strong>{getSizeName(selectedSize)}</strong>
        </p>
        {product.sizes.map((size) => (
          <Button
            onClick={() => setSelectedSize(size)}
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            className="mr-2 mt-4"
          >
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            onClick={addToCart}
            type="button"
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            أضف لعربة الشراء
          </Button>
        </div>
      </form>
    </div>
  )
}
