"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UseCart } from "@/components/cart-provider"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"
import { Locations } from "@/config/inventory"

export default function ContactForm() {
  const router = useRouter()
  const { cartItems } = UseCart()
  const [isLoading, setLoading] = useState(false)
  const isDisabled = isLoading
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [nameSession, setNameSession] = useState("")
  const [addressSession, setAddressSession] = useState("")
  const [phoneNumberSession, setPhoneNumberSession] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isShipping, setIsShipping] = useState(false);
  console.log("selectedLocation", selectedLocation);

  const [locations, setLocations] = useState<Locations[] | null>(null);
  console.log("locations", locations);


  const pause = (duration: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, duration)
    })
  }

  const handleRegister = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    setLoading(true)
    if (cartItems.length === 0) {
      router.push("/cart")
    } else {
      await pause(3000)
      sessionStorage.setItem("name", name)
      sessionStorage.setItem("address", address)
      sessionStorage.setItem("phoneNumber", phoneNumber)
      router.push("/contact-form/summary")
    }
    setLoading(false)
  }


  useEffect(() => {
    const customerDetails = {
      name: sessionStorage.getItem("name") || "",
      address: sessionStorage.getItem("address") || "",
      phonNumber: sessionStorage.getItem("phoneNumber") || "",
    }
    if (customerDetails) {
      setNameSession(customerDetails?.name)
      setAddressSession(customerDetails.address)
      setPhoneNumberSession(customerDetails.phonNumber)
    }
  }, [])

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
            defaultValue={nameSession}
            required
          />
        </div>
      </div>
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="mb-1 block pr-4 font-bold text-gray-500 dark:text-gray-200 md:mb-0 md:text-right"
            htmlFor="inline-address"
          >
            العنوان
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full appearance-none  rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-purple-500"
            id="inline-address"
            type="text"
            placeholder="العنوان التفصيلي"
            onChange={(e) => setAddress(e.target.value)}
            defaultValue={addressSession}
            required
          />
        </div>
      </div>
      <div className="my-5">
        <input type="checkbox" name="shipping" id="shipping" onChange={() => {
          setIsShipping(!isShipping);
          sessionStorage.setItem("isShipping", String(!isShipping));
        }}
        />
        <label htmlFor="shipping" className="mr-5">طلب التوصيل</label>
      </div>
      {
        isShipping && (
          <div className="mb-6 md:flex md:items-center">
            <div className="md:w-1/3">
              <label
                className="mb-1 block pr-4 font-bold text-gray-500 dark:text-gray-200 md:mb-0 md:text-right"
                htmlFor="inline-location"
              >
                المحافظة
              </label>
            </div>
            <div className="md:w-2/3">
              <select
                className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-purple-500"
                id="inline-location"
                placeholder="المنطقة"
                onChange={(e) => {
                  const selectedLocationValue = e.target.value;
                  console.log("selectedLocationValue", selectedLocationValue);

                  setSelectedLocation(selectedLocationValue);
                  sessionStorage.setItem("selectedLocation", selectedLocationValue);
                }}
                required
              >
                <option>اختر المنطقة...</option>
                {locations?.map((location) => (

                  <option key={location._id} value={location.location}>
                    {location.location}
                  </option>

                ))}
              </select>
            </div>
          </div>)
      }
      <div className="mb-6 md:flex md:items-center">
        <div className="md:w-1/3">
          <label
            className="mb-1 block pr-4 font-bold text-gray-500 dark:text-gray-200 md:mb-0 md:text-right"
            htmlFor="inline-phone-number"
          >
            رقم الهاتف
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="w-full appearance-none  rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-purple-500"
            id="inline-phone-number"
            type="tel"
            placeholder="0123456789"
            onChange={(e) => setPhoneNumber(e.target.value)}
            defaultValue={phoneNumberSession}
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

