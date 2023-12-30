"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, Input, Typography } from "@material-tailwind/react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function ContactForm() {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false)
  const isDisabled = isLoading
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const pause = (duration: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration)
    })
  }

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    setLoading(true)

    await pause(3000)
    sessionStorage.setItem("name", name)
    sessionStorage.setItem("address", address)
    sessionStorage.setItem("phoneNumber", phoneNumber)

    router.push("/contact-form/summary")
    setLoading(false)
  }
  return (
    <form
      className="mx-auto !mt-[5%] w-full max-w-sm"
      onSubmit={(e) => {
        handleRegister(e)
      }}
    >
      <h1 className="mb-6 text-center text-3xl">بيانات العميل</h1>
      <h2 className="mb-6 text-center text-sm">
        مرحبا! يسعدنا تعاملكم معنا
        <br /> من فضلك قم بتسجيل بياناتك
      </h2>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="mb-1 block pr-4 font-bold text-gray-500 dark:text-gray-200 md:mb-0 md:text-right"
            htmlFor="inline-full-name"
          >
            الإسم
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full appearance-none  rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="إسمك الثلاثي"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="mb-1 block pr-4 font-bold text-gray-500 dark:text-gray-200 md:mb-0 md:text-right"
            htmlFor="inline-full-name"
          >
            العنوان
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full appearance-none  rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-purple-500"
            id="inline-full-name"
            type="text"
            placeholder="العنوان التفصيلي"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="mb-1 block pr-4 font-bold text-gray-500 dark:text-gray-200 md:mb-0 md:text-right"
            htmlFor="inline-full-name"
          >
            رقم الهاتف
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full appearance-none  rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-purple-500"
            id="inline-full-name"
            type="tel"
            placeholder="0123456789"
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mt-6">
        <Button type="submit" className="w-full" disabled={isDisabled}>
          {isLoading ? "جاري الإنتقال للمراجعة..." : "أرسل"}
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        </Button>
      </div>
    </form>
  )
}
