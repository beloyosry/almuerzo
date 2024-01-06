"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"
import { formatCurrencyString } from "use-shopping-cart"
import { shimmer, toBase64 } from "@/lib/image"
import { getWeightName } from "@/lib/utils"
import { UseCart } from "@/components/cart-provider"
import { CartSummary } from "@/components/cart-summary"

function Summary() {
  const { cartItems } = UseCart()
  const [name, setName] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [phonNumber, setPhoneNumber] = useState<string>("")

  useEffect(() => {
    if (cartItems) {
      setName(sessionStorage.getItem("name") || "")
      setAddress(sessionStorage.getItem("address") || "")
      setPhoneNumber(sessionStorage.getItem("phoneNumber") || "")

    }
  }, [])

  if (!cartItems || !name || !address || !phonNumber) {
    return
  }
  return (
    <div className="px-4 py-14 2xl:container md:px-6 2xl:mx-auto 2xl:px-20">
      <div className="jusitfy-center mt-10 flex w-full flex-col items-stretch  space-y-4 md:space-y-6 xl:flex-row xl:space-x-8 xl:space-y-0">
        <div className="flex  w-full flex-col items-start justify-start space-y-4  md:space-y-6 xl:space-y-8">
          <div className="flex h-[680px] w-full flex-col items-start justify-start overflow-y-auto bg-gray-50 p-4 dark:bg-transparent md:p-6 xl:p-8">
            <p className="xl:leading-5s text-lg font-semibold leading-6  text-gray-800 dark:text-gray-200 md:text-xl">
              مراجعة الطلب
            </p>
            {cartItems.map((product) => (
              <div
                key={product.id}
                className="mt-4 flex w-full flex-col items-start justify-start gap-5 md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8 "
              >
                <div className="w-full pb-4 md:w-40 md:pb-8">
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
                <div className="flex w-full flex-col items-start justify-between space-y-4 border-b border-gray-200  pb-8 md:flex-row md:space-y-0">
                  <div className="flex w-full flex-col items-start justify-start space-y-8">
                    <h3 className="text-xl font-semibold leading-6 text-gray-800  dark:text-gray-200 xl:text-2xl">
                      {product.name}
                    </h3>
                    <div className="flex flex-col items-start justify-start space-y-2">
                      <p className="text-sm leading-none text-gray-800 dark:text-gray-400">
                        <span className="text-gray-800 dark:text-gray-200">
                          الوزن:{" "}
                        </span>
                        {getWeightName(product.product_data?.weight || "")} ك
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full items-start justify-between space-x-8">
                    <p className="text-base leading-6 text-gray-800 dark:text-gray-200 xl:text-lg">
                      {product.product_data?.quantity}
                    </p>
                    <p className="text-base font-semibold leading-6 text-gray-800 dark:text-gray-200 xl:text-lg">
                      {formatCurrencyString({
                        value: product.product_data?.price || 0,
                        currency: product.currency,
                      })}
                    </p>
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
              </div>
            ))}
          </div>
        </div>

        {/* Customer */}
        <div className="flex w-full flex-col items-center justify-between bg-gray-50 px-4 py-6 dark:bg-transparent  md:items-start md:p-6 xl:w-96 xl:p-8 ">
          <h3 className="text-xl font-semibold leading-5 text-gray-800 dark:text-gray-200">
            العميل
          </h3>
          <div className="flex  h-full w-full flex-col items-stretch justify-start md:flex-row md:space-x-6 lg:space-x-8 xl:flex-col xl:space-x-0 ">
            <div className="flex w-full  items-center justify-center space-x-4 border-b border-gray-200 py-4 md:justify-start">
              <p className="cursor-pointer text-sm leading-5 text-gray-800 dark:text-gray-400">
                {name}
              </p>
            </div>
            <div className="mt-6 flex w-full  flex-col items-stretch justify-between md:mt-0 xl:h-full">
              <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:items-start md:justify-start md:space-x-6 md:space-y-0 lg:space-x-8 xl:flex-col  xl:space-x-0 xl:space-y-12 ">
                <div className="flex flex-col items-center  justify-center space-y-4 md:items-start md:justify-start xl:mt-8">
                  <p className="text-center text-base font-semibold leading-4 text-gray-800 dark:text-gray-200 md:text-left">
                    عنوان الشحن
                  </p>
                  <p className="w-48 text-right text-sm leading-5 text-gray-600 dark:text-gray-400 md:text-right lg:w-full xl:w-48">
                    {address}
                  </p>
                </div>
                <div className="flex flex-col items-center  justify-center space-y-4 md:items-start md:justify-start xl:mt-8">
                  <p className="text-center text-base font-semibold leading-4 text-gray-800 dark:text-gray-200 md:text-left">
                    رقم الهاتف
                  </p>
                  <p className="w-48 text-right text-sm leading-5 text-gray-600 dark:text-gray-400 md:text-right lg:w-full xl:w-48">
                    {phonNumber}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <CartSummary target="/success" home={true} checkout={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary
