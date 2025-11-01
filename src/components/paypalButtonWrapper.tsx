"use client"

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/functions/firebase"
import { setToCollection } from "@/functions/add-to-collection"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/functions/firebase"

interface PaypalButtonWrapperProps {
  total: number
  disabled: boolean
  formData: any
  type: string
  currency: string
  description: string
  onPaymentStart: () => void
  onPaymentComplete: (paymentData: any) => void
  onPaymentError: (error: string) => void
}

export default function PaypalButtonWrapper({
  total,
  disabled,
  formData,
  type,
  currency,
  description,
  onPaymentStart,
  onPaymentComplete,
  onPaymentError,
}: PaypalButtonWrapperProps) {
  const [paypalLoading, setPaypalLoading] = useState(true)

  const paypalOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
    currency: "USD",
    intent: "capture",
  }

  // Create user account for PayPal payments
  const createUserAccount = async (userData: any) => {
    try {
      // Create user in Firebase Auth with provided password
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      );
      
      const firebaseUser = userCredential.user;
      
      // Prepare user data for Firestore
      const userFirestoreData = {
        id: firebaseUser.uid,
        email: userData.email,
        name: userData.name,
        profession: userData.profession,
        country: userData.country,
        phoneNumber: userData.phoneNumber,
        membershipType: type,
        paymentMethod: "paypal",
        units: userData.units,
        totalAmount: userData.amount,
        currency: userData.currency,
        depositId: userData.depositId,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: null,
        emailVerified: false,
        profileCompleted: false,
        role: "member",
        subscriptionStatus: "active",
        paymentStatus: "completed",
        transactionHistory: [
          {
            depositId: userData.depositId,
            amount: userData.amount,
            currency: userData.currency,
            type: type,
            status: "completed",
            date: new Date().toISOString(),
            paymentMethod: "paypal"
          }
        ]
      };

      // Add user to Firestore
      await setToCollection("users", firebaseUser.uid, userFirestoreData);
      
      return { success: true, user: firebaseUser };

    } catch (error: any) {
      console.error("Error creating user account:", error);
      throw error;
    }
  };

  // Create transaction record
  const createTransactionRecord = async (depositId: string, status: string = "COMPLETED") => {
    try {
      const transactionData = {
        depositId,
        amount: total,
        currency: currency,
        status,
        type,
        units: formData.units || 1,
        customer: {
          name: formData.name,
          email: formData.email,
          country: formData.country,
          profession: formData.profession,
          phoneNumber: formData.phoneNumber,
        },
        paymentMethod: "paypal",
        metadata: [
          { fieldName: "productType", fieldValue: type },
          { fieldName: "customerEmail", fieldValue: formData.email, isPII: true },
          { fieldName: "customerId", fieldValue: formData.email, isPII: true },
          { fieldName: "units", fieldValue: (formData.units || 1).toString() },
        ],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await setDoc(doc(collection(db, "transactions"), depositId), transactionData);
      return depositId;
    } catch (error) {
      console.error("Error creating transaction record:", error);
      throw error;
    }
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          description: description,
          amount: {
            value: total.toFixed(2),
            currency_code: "USD",
          },
        },
      ],
    })
  }

  const onApprove = async (data: any, actions: any) => {
    try {
      onPaymentStart();
      const details = await actions.order.capture();
      
      // Create transaction record first
      await createTransactionRecord(data.orderID, "COMPLETED");
      
      // Then create user account
      await createUserAccount({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        profession: formData.profession,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
        paymentMethod: "paypal",
        units: formData.units || 1,
        amount: total,
        currency: currency,
        depositId: data.orderID,
        type: type
      });
      
      onPaymentComplete(details);
      
    } catch (error: any) {
      console.error("PayPal payment error:", error);
      onPaymentError(error.message || "Payment processing failed");
    }
  }

  const onError = (err: any) => {
    console.error("PayPal error:", err)
    onPaymentError(err.message || "Payment failed");
  }

  const onInit = () => {
    setPaypalLoading(false);
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
          onInit={onInit}
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