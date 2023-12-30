"use client"

import { CartProvider } from "use-shopping-cart"

import { Toaster } from "@/components/ui/toaster"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return (
    <CartProvider
      successUrl="http://localhost:3000/success"
      currency="EGP"
      shouldPersist
      cartMode="checkout-session"
      stripe="pk_test_51OQy51FKQL88RS06W15yKnW6XZiuF7mVvBsPCv298tN0wEvQSjtSbJTjmiJWpsXigkGkzVNkSNrnszZMzKw3uiU000QP7Wqz1N"
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        {children}
        {/* <TailwindIndicator /> */}
      </ThemeProvider>
    </CartProvider>
  )
}
