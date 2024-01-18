"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import { SanityProduct } from "@/config/inventory"
import { siteConfig } from "@/config/site"
import { FetchingError } from "@/lib/exceptions"
import { cn } from "@/lib/utils"
import ProductCategories from "@/components/product-categories"
import { ProductGrid } from "@/components/product-grid"

export default function Page() {
  const [products, setProducts] = useState<SanityProduct[]>([])
  const [error, setError] = useState<any | unknown>(null)

  const category = useSearchParams().get("category")
  const search = useSearchParams().get("search")

  useEffect(() => {
    const fetchData = async () => {
      const productFilter = `_type == "product"`
      const categoryFilter = category
        ? `&& categories[]->title match "${category}"`
        : ""
      const searchFilter = search ? `&& name match "${search}"` : ""
      const filter = `*[${productFilter}${categoryFilter}${searchFilter}]`

      try {
        const result = await client.fetch<SanityProduct[]>(
          groq`${filter} {
            _id,
            _createdAt,
            name,
            images,
            currency,
            categories[]->{
              _id,
              title,
            },
            price,
            description,
            "slug": slug.current
          }`
        )

        setProducts(result)
      } catch (error) {
        setError(error)
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [category, search])

  if (error !== null) {
    throw new FetchingError()
  }

  return (
    <div>
      <div className="px-4 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">
          {siteConfig.name}
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-base" dir="ltr">
          {siteConfig.description}
        </p>
      </div>
      {/* Product Categories */}
      <ProductCategories />
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-7 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products.length} منتجات
            </h1>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6 ">
            <h2 id="products-heading" className="sr-only">
              المنتجات
            </h2>
            <div
              className={cn(
                "grid grid-cols-1 gap-x-8 gap-y-10",
                products.length > 0
                  ? "lg:grid-cols-3"
                  : "lg:grid-cols-[1fr_3fr]"
              )}
            >
              {/* Product grid */}
              <ProductGrid products={products} />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
