import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import { SanityProduct } from "@/config/inventory"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import ProductCategories from "@/components/product-categories"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"

interface Props {
  searchParams: {
    date?: string
    price?: string
    color?: string
    category?: string
    size?: number
    search?: string
  }
}

export default async function Page({ searchParams }: Props) {
  const { date = "desc", price, color, category, size, search } = searchParams

  const priceOrder = price ? `| order(price ${price})` : ""
  const dateOrder = date ? `| order(_createdAt ${date})` : ""
  const order = `${priceOrder}${dateOrder}`

  const productFilter = `_type == "product"`
  const colorFilter = color ? `&& "${color}" in colors` : ""
  const categoryFilter = category
    ? `&& categories[]->title match "${category}"`
    : ""
  const sizeFilter = size ? `&& "${size}" in sizes` : ""
  const searchFilter = search ? `&& name match "${search}"` : ""
  const filter = `*[${productFilter}${colorFilter}${categoryFilter}${sizeFilter}${searchFilter}]`

  const products = await client.fetch<SanityProduct[]>(
    groq`${filter} ${order}{
      _id,
      _createdAt,
      name,
      sku,
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
