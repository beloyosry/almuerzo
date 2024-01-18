"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { urlForImage } from "@/sanity/lib/image"
import { groq } from "next-sanity"

import { Category } from "@/config/inventory"

const ProductCategories = () => {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [checkedCategories, setCheckedCategories] = useState<string>("all")

  useEffect(() => {
    const getCategories = async () => {
      const result = await client.fetch<Category[]>(
        groq`*[_type == "categories"]`
      )
      setCategories(result)
    }
    getCategories()

    // Function to determine the initial active category
    const determineActiveCategory = () => {
      const urlCategory = searchParams.get("category")
      const storedCategory = localStorage.getItem("checkedCategory")
      return urlCategory || storedCategory || "all"
    }

    // Set the active category
    setCheckedCategories(determineActiveCategory())
  }, [pathName, searchParams])

  const handleCategoryClick = (categoryTitle: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("category", categoryTitle)
    router.replace(`/?${params.toString()}`)
    setCheckedCategories(categoryTitle)
    localStorage.setItem("checkedCategory", categoryTitle)
  }

  return (
    <div className="mx-auto mt-20 flex w-full flex-wrap  justify-center gap-6 text-center md:w-1/2 md:gap-10">
      {categories.map((category, index) => (
        <div key={index}>
          <img
            src={urlForImage(category.images).url()}
            onClick={() => handleCategoryClick(category.title)}
            alt={category.title}
            className={`h-[50px] w-[50px] transform cursor-pointer overflow-x-auto rounded-full border-2 border-gray-200 bg-gray-100 ${
              checkedCategories === category.title
                ? "brightness-100"
                : " brightness-[60%]"
            } object-cover object-center transition-all duration-500 ease-in-out hover:scale-125 hover:brightness-100 dark:border-gray-800 md:h-[100px] md:w-[100px]`}
          />
          <p className="mt-3 max-w-min md:max-w-none">{category.title}</p>
        </div>
      ))}
      <div>
        <img
          src="/products/1.jpg"
          onClick={() => {
            router.replace("/")
            localStorage.removeItem("checkedCategory")
            setCheckedCategories("all")
            localStorage.setItem("checkedCategory", "all")
          }}
          alt="all-categories"
          className={`h-[50px] w-[50px] transform cursor-pointer overflow-x-auto rounded-full border-2 border-gray-200 bg-gray-100 object-cover object-center transition-all duration-500 ease-in-out hover:scale-125 hover:brightness-100 dark:border-gray-800 md:h-[100px] md:w-[100px] ${
            checkedCategories === "all" ? "brightness-100" : "brightness-[60%]"
          } `}
        />
        <p className="mt-3">الكل</p>
      </div>
    </div>
  )
}

export default ProductCategories
