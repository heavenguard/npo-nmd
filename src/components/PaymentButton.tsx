"use client"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

interface PaypalButtonWrapperProps {
  total: number
  disabled: boolean
  formData: any
  login: any
  type: string
  currency: string
  description: string
}

export default function PaypalButtonWrapper({
  total,
  disabled,
  formData,
  login,
  type,
  currency,
  description,
}: PaypalButtonWrapperProps) {
  const [paypalLoading, setPaypalLoading] = useState(true)

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: currency,
    intent: "capture",
  }

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: description,
          amount: {
            value: total.toFixed(2),
            currency_code: currency,
          },
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING",
      },
    })
  }

  const onApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture()
      
      // Process successful payment
      const payload = {
        amount: total,
        currency: currency,
        product: type === "don" ? "Donation" : 
                type === "mission" ? "Mission contribution" : 
                type === "membership" ? "NMD Membership" : "Membership",
        paymentMethod: "paypal",
        paypalOrderId: data.orderID,
        paypalPayerId: data.payerID,
        currentUrl: typeof window !== "undefined" ? window.location.href : "",
        meta: {
          name: formData.name,
          email: formData.email,
          country: formData.country,
          profession: formData.profession,
          motivation: formData.motivation,
        },
      }

      const res = await fetch("/api/payments/paypal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        // Success - redirect or show success message
        window.location.href = `/payment/success?type=${type}&amount=${total}&currency=${currency}`
      } else {
        throw new Error("Payment processing failed")
      }
    } catch (error) {
      console.error("PayPal payment error:", error)
      // Handle error
    }
  }

  const onError = (err: any) => {
    console.error("PayPal error:", err)
    // Handle error
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      {paypalLoading && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        </div>
      )}
      <div className={paypalLoading ? "opacity-0" : "opacity-100"}>
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "blue",
            shape: "rect",
            label: "paypal",
            height: 48,
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          onInit={() => setPaypalLoading(false)}
          disabled={disabled}
        />
      </div>
      
      {disabled && (
        <Button
          className="w-full h-12 bg-gray-400 cursor-not-allowed"
          disabled
        >
          Complete required fields above
        </Button>
      )}
    </PayPalScriptProvider>
  )
}