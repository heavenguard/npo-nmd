"use client";

import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "sonner";
import { setToCollection } from "@/functions/add-to-collection";
import { addToSubCollection } from "@/functions/add-to-a-sub-collection";
import { nanoid } from "nanoid";

interface PaypalButtonWrapperProps {
  total: number;
  disabled: boolean;
  formData: any;
  login: any;
  type?: string;
  description?: string;
}

export default function PaypalButtonWrapper({
  total,
  disabled,
  formData,
  login,
  type,
  description,
}: PaypalButtonWrapperProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paypalError, setPaypalError] = useState("");
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
            currency_code: "USD",
          },
          description: "Farm Market Order",
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    setIsProcessing(true);
    try {
      const order = await actions.order.get();
      console.log("Payment successful", order);

      const payerName = order.payer?.name?.given_name || "";
      const payerEmail = order.payer?.email_address || "";

      const paymentData = {
        name: payerName,
        email: payerEmail,
        amount: total.toFixed(2),
        orderID: data.orderID,
      };

      console.log("Sending to API:", paymentData);

      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error response:", errorText);
        throw new Error("Payment processing failed");
      }
      try {
        const response = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            displayName: formData.name,
          }),
        });

        const data = await response.json();
        console.log(data);
        console.log(formData);

        // Save password in localStorage
        const password = data.password;

        await setToCollection("users", data.userId, {
          uid: data.userId,
          idNumber: `NMD-ASSO-${nanoid(6)}`,
          ...formData,
        });

        await addToSubCollection(
          {
            amount: total,
            type: type
              ? type
              : formData.payYearlyMembership
              ? "Inscription & Membership payment"
              : "Inscription payment",
            status: "completed",
            description: description
              ? description
              : formData.payYearlyMembership
              ? "Paid for registration and yearly membership"
              : "Paid for registration",
          },
          "users",
          data.userId,
          "donations"
        );

        toast.success("New user has been added successfully");
        await setToCollection("transactions", data.orderId, {
          transactionId: data.orderId,
          userId: data.userId,
          amount: total,
          currency: "XAF",
          status: "completed",
          paymentMethod: "paypal",
          type: type
            ? type
            : formData.payYearlyMembership
            ? "membership"
            : "inscription",
          description: description
            ? description
            : formData.payYearlyMembership
            ? "Inscription and Membership"
            : "Inscription only",
        });

        console.log(password);
        console.log(formData.email);
        await login(formData.email, data.password);
      } catch (error) {
        toast.error("Failed to create user. Please try again.");
      }

      toast.success("Membership activated successfully!");

      const result = await response.json();
      console.log("API response:", result);
      alert("Payment processed successfully!");
    } catch (error) {
      console.error("Payment failed:", error);
      setPaypalError("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onError = (err: any) => {
    console.error("PayPal error:", err);
    setPaypalError("An error occurred with PayPal. Please try again.");
  };

  return (
    <div>
      {isProcessing && (
        <div className="mb-4 text-center">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mr-2"></div>
          <span>Processing your payment...</span>
        </div>
      )}

      {paypalError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
          {paypalError}
        </div>
      )}

      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
          currency: "USD",
          intent: "capture",
        }}
      >
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          style={{ layout: "vertical" }}
          disabled={disabled || isProcessing}
        />
      </PayPalScriptProvider>
    </div>
  );
}
