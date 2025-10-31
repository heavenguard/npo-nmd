"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent } from "./ui/card";
import { useTranslations } from "@/lib/useTranslations";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/functions/firebase";
import { setToCollection } from "@/functions/add-to-collection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/functions/firebase";

// Components
import PersonalInfoSection from "./payment-sections/personal-info-section";
import PaymentConfigSection from "./payment-sections/payment-config-section";
import AmountDisplay from "./payment-sections/amount-display";
import TermsAndPayment from "./payment-sections/terms-and-payment";
import LoadingOverlay from "./payment-sections/loading-overlay";

// Types and Constants
import { PAWAPAY_SUPPORTED_COUNTRIES, CONVERSION_RATES } from "./payment-types";
import type { PaymentDialogProps, FormDataState, LoadingState } from "./payment-types";
import { CreditCard, Phone, Rocket } from "lucide-react";

export default function PaymentDialog({
  open,
  setOpen,
  dialogTitle,
  dialogDescription,
  amount,
  type,
  currency = "XAF",
}: PaymentDialogProps) {
  const t = useTranslations();
  const { user } = useAuth();

  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    password: "",
    voting: false,
    country: "",
    currency: currency ?? "XAF",
    profession: "",
    motivation: "",
    agreeTerms: false,
    payYearlyMembership: false,
    phoneNumber: "",
    mobileOperator: "",
    paymentMethod: "mobile",
  });

  const [units, setUnits] = useState<number>(1);
  const [depositId, setDepositId] = useState<string | null>(null);
  const [loading, setLoading] = useState<LoadingState>({
    isActive: false,
    step: null,
    message: "",
  });

  // Get current country info for payment method determination
  const currentCountryInfo = useMemo(() => {
    return PAWAPAY_SUPPORTED_COUNTRIES.find(country => 
      formData.country.toLowerCase().includes(country.name.toLowerCase()) || 
      formData.country === country.code
    );
  }, [formData.country]);

  // Determine available payment methods
  const availablePaymentMethods = useMemo(() => {
    const methods: Array<{ value: "mobile" | "paypal"; label: string; icon: React.ElementType; description: string }> = [];
    
    // Mobile Money - only for PawaPay supported countries with XAF currency
    if (currentCountryInfo && formData.currency === "XAF") {
      methods.push({
        value: "mobile",
        label: "Mobile Money",
        icon: Phone,
        description: `Pay with ${currentCountryInfo.mobileOperators.join(" or ")}`
      });
    }
    
    // PayPal - available for all currencies, but optimized for USD/EUR
    methods.push({
      value: "paypal",
      label: "Credit Card & PayPal",
      icon: CreditCard,
      description: "Secure payment with any card"
    });
    
    return methods;
  }, [currentCountryInfo, formData.currency]);

  // Auto-select payment method based on availability
  useEffect(() => {
    if (availablePaymentMethods.length > 0 && !availablePaymentMethods.find(m => m.value === formData.paymentMethod)) {
      setFormData(prev => ({
        ...prev,
        paymentMethod: availablePaymentMethods[0].value
      }));
    }
  }, [availablePaymentMethods, formData.paymentMethod]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem("pendingFormData") : null;
      if (raw) {
        const parsed = JSON.parse(raw);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
      const savedDeposit = typeof window !== "undefined" ? localStorage.getItem("depositId") : null;
      if (savedDeposit) setDepositId(savedDeposit);
    } catch {
      // ignore JSON parse error
    }
  }, []);

  // Calculate total with proper currency conversion
  const total = useMemo(() => {
    const safeUnits = Math.max(1, Math.floor(Number(units) || 1));
    const baseAmount = amount * safeUnits;
    
    const conversionRate = CONVERSION_RATES[formData.currency as keyof typeof CONVERSION_RATES] || 1;
    return baseAmount * conversionRate;
  }, [amount, units, formData.currency]);

  const formattedTotal = useMemo(() => {
    try {
      const currencyCode = formData.currency;
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        maximumFractionDigits: currencyCode === "XAF" ? 0 : 2,
      }).format(total);
    } catch {
      return `${total.toFixed(2)} ${formData.currency}`;
    }
  }, [total, formData.currency]);

  const equivalentAmounts = useMemo(() => {
    const baseAmount = amount * Math.max(1, Math.floor(Number(units) || 1));
    return {
      XAF: baseAmount,
      USD: baseAmount * CONVERSION_RATES.USD,
      EUR: baseAmount * CONVERSION_RATES.EUR,
    };
  }, [amount, units]);

  const isFormValid =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.password.length >= 6 &&
    formData.country.trim().length > 0 &&
    formData.currency.trim().length > 0 &&
    formData.profession.trim().length > 0 &&
    formData.agreeTerms &&
    (formData.paymentMethod !== "mobile" || 
     (formData.phoneNumber && formData.phoneNumber.trim().length > 0 && formData.mobileOperator));

  const handleChange =
    (key: keyof FormDataState) =>
    (value: string | boolean | undefined) =>
      setFormData((s) => ({ ...s, [key]: value as any }));

  // Set loading state
  const setLoadingState = (isActive: boolean, step: LoadingState["step"] = null, message: string = "") => {
    setLoading({ isActive, step, message });
  };

  // Create user account in Firebase Auth and Firestore
  const createUserAccount = async (userData: any) => {
    try {
      setLoadingState(true, "account_creation", "Creating your account...");
      
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
        paymentMethod: userData.paymentMethod,
        mobileOperator: userData.mobileOperator,
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
            paymentMethod: userData.paymentMethod
          }
        ]
      };

      // Add user to Firestore
      const result = await setToCollection("users", firebaseUser.uid, userFirestoreData);
      
      if (!result) {
        throw new Error("Failed to create user profile in database");
      }

      setLoadingState(true, "complete", "Account created successfully!");
      
      // Success
      toast.success("Account created successfully! You can now log in with your credentials.");
      
      // Close the dialog after a delay to show success message
      setTimeout(() => {
        setOpen(false);
        setLoadingState(false, null, "");
        // Clear form data
        setFormData({
          name: "",
          email: "",
          password: "",
          voting: false,
          country: "",
          currency: currency ?? "XAF",
          profession: "",
          motivation: "",
          agreeTerms: false,
          payYearlyMembership: false,
          phoneNumber: "",
          mobileOperator: "",
          paymentMethod: "mobile",
        });
      }, 3000);

      return { success: true, user: firebaseUser };

    } catch (error: any) {
      console.error("Error creating user account:", error);
      
      // Handle specific error cases
      if (error.code === 'auth/email-already-in-use') {
        throw new Error("This email is already registered. Please use a different email or try logging in.");
      } else if (error.code === 'auth/invalid-email') {
        throw new Error("The email address is not valid.");
      } else if (error.code === 'auth/weak-password') {
        throw new Error("Password should be at least 6 characters.");
      } else {
        throw new Error("Failed to create user account. Please try again.");
      }
    }
  };

  // Create transaction record in Firebase
  const createTransactionRecord = async (depositId: string, status: string = "SUBMITTED") => {
    try {
      const transactionData = {
        depositId,
        amount: Math.round(total),
        currency: formData.currency,
        status,
        type,
        units,
        customer: {
          name: formData.name,
          email: formData.email,
          country: formData.country,
          profession: formData.profession,
          phoneNumber: formData.phoneNumber,
        },
        paymentMethod: formData.paymentMethod,
        mobileOperator: formData.mobileOperator,
        metadata: [
          { fieldName: "productType", fieldValue: type },
          { fieldName: "customerEmail", fieldValue: formData.email, isPII: true },
          { fieldName: "customerId", fieldValue: user?.email || formData.email, isPII: true },
          { fieldName: "units", fieldValue: units.toString() },
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

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault?.();

    if (!isFormValid) {
      toast.error("Please complete all required fields.");
      return;
    }

    setLoadingState(true, "payment", "Initiating payment...");
    
    try {
      // Generate deposit ID
      const generateDepositId = () => uuidv4();
      const depositId = generateDepositId();
      
      // Create transaction record in Firebase first
      await createTransactionRecord(depositId, "SUBMITTED");

      // Prepare payload according to your expected structure
      const payload = {
        depositId,
        amount: "1",
        currency: "XAF",
        correspondent: formData.mobileOperator === "MTN" ? "MTN_MOMO_CMR" : "ORANGE_CMR",
        payer: { 
          address: { 
            value: `${getCountryCode(formData.country)}${formData.phoneNumber!.replace(/\D/g, '')}` 
          }, 
          type: "MSISDN" 
        },
        customerTimestamp: new Date().toISOString(),
        statementDescription: `${getProductDescription(type)}`,
        country: formData.country,
        preAuthorisationCode: "PMxQYqfDx",
        metadata: [
          { fieldName: "productType", fieldValue: type },
          { fieldName: "customerId", fieldValue: user?.email || formData.email, isPII: true },
          { fieldName: "customerName", fieldValue: formData.name, isPII: true },
          { fieldName: "customerEmail", fieldValue: formData.email, isPII: true },
          { fieldName: "units", fieldValue: units.toString() },
          { fieldName: "paymentMethod", fieldValue: formData.paymentMethod },
        ],
      };

      setLoadingState(true, "payment", "Processing payment...");

      const res = await fetch("/api/deposits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Payment initialization failed");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("depositId", depositId);
        localStorage.setItem("pendingFormData", JSON.stringify(formData));
        localStorage.setItem(
          "datas",
          JSON.stringify({
            description: getProductDescription(type),
            amount: total,
            type,
            currency: formData.currency,
            units,
            paymentMethod: formData.paymentMethod,
          })
        );
      }

      setDepositId(depositId);
      
      // Start polling for transaction status
      startTransactionPolling(depositId);

    } catch (err: any) {
      console.error("Payment error:", err);
      setLoadingState(false, null, "");
      toast.error(err?.message ?? "Unexpected error during payment initialization");
    }
  };

  // Poll for transaction status and update Firebase
  const startTransactionPolling = (depositId: string) => {
    let intervalId: NodeJS.Timeout;
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes (5 seconds * 60)

    const checkTransactionStatus = async () => {
      if (attempts >= maxAttempts) {
        clearInterval(intervalId);
        setLoadingState(false, null, "");
        toast.error("Payment timeout. Please check your mobile device and try again.");
        return;
      }

      attempts++;
      
      try {
        setLoadingState(true, "payment", "Waiting for payment confirmation...");

        const res = await fetch(`/api/check-deposit-status?id=${depositId}`);
        const data = await res.json();

        if (res.ok && Array.isArray(data) && data.length > 0) {
          const transaction = data[0];
          
          if (transaction.status === "COMPLETED" || transaction.status === "FAILED") {
            clearInterval(intervalId);
            
            // Update transaction record in Firebase
            await updateTransactionStatus(depositId, transaction.status, transaction);
            
            if (transaction.status === "COMPLETED") {
              setLoadingState(true, "account_creation", "Payment completed! Creating your account...");
              
              // Create user account after successful payment
              try {
                await createUserAccount({
                  email: formData.email,
                  password: formData.password,
                  name: formData.name,
                  profession: formData.profession,
                  country: formData.country,
                  phoneNumber: formData.phoneNumber,
                  paymentMethod: formData.paymentMethod,
                  mobileOperator: formData.mobileOperator,
                  units: units,
                  amount: total,
                  currency: formData.currency,
                  depositId: depositId,
                  type: type
                });
                
              } catch (error: any) {
                setLoadingState(false, null, "");
                toast.error(`Payment successful but account creation failed: ${error.message}`);
              }
              
            } else {
              setLoadingState(false, null, "");
              toast.error("Payment failed. Please try again.");
            }
          }
        }
      } catch (error) {
        console.error("Error checking transaction status:", error);
        // Don't stop loading here - let the timeout handle it
      }
    };

    // Check every 5 seconds
    intervalId = setInterval(checkTransactionStatus, 5000);
  };

  // Update transaction status in Firebase
  const updateTransactionStatus = async (depositId: string, status: string, transactionData: any) => {
    try {
      const transactionRef = doc(db, "transactions", depositId);
      await setDoc(transactionRef, {
        status,
        updatedAt: serverTimestamp(),
        completedAt: status === "COMPLETED" ? serverTimestamp() : null,
        failedAt: status === "FAILED" ? serverTimestamp() : null,
        transactionData: transactionData,
      }, { merge: true });
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

  const handleDialogOpenChange = (nextOpen: boolean) => {
    if (loading.isActive && nextOpen === false) {
      // Prevent closing while loading
      toast.info("Please wait while we process your payment...");
      return;
    }
    setOpen(nextOpen);
    if (!nextOpen) {
      setLoadingState(false, null, "");
    }
  };

  const getTranslation = (key: string, fallback: string) => {
    try {
      const translated = t(key as any);
      return translated || fallback;
    } catch {
      return fallback;
    }
  };

  const getProductDescription = (type: string) => {
    switch (type) {
      case "don": return "General donation";
      case "mission": return "Mission contribution";
      case "student": return "Student sponsorship";
      case "membership": return "NMD Membership";
      default: return "NMD Membership";
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogOpenChange}>
        <DialogContent className="max-h-[95dvh] sm:max-w-[95vw] lg:max-w-4xl h-full sm:h-auto overflow-y-auto bg-white border-0 p-0 sm:rounded-lg">
          <style jsx global>{`
            .dialog-scrollbar::-webkit-scrollbar {
              width: 4px;
            }
            .dialog-scrollbar::-webkit-scrollbar-track {
              background: #f1f5f9;
              border-radius: 2px;
            }
            .dialog-scrollbar::-webkit-scrollbar-thumb {
              background: #cbd5e1;
              border-radius: 2px;
            }
            .dialog-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #94a3b8;
            }
            
            @media (max-width: 640px) {
              .dialog-scrollbar::-webkit-scrollbar {
                width: 3px;
              }
            }
          `}</style>
          
          {/* Header - Mobile Optimized */}
          <DialogHeader className="space-y-3 sm:space-y-4 pb-4 sm:pb-6 border-b border-slate-200 px-4 sm:px-8 pt-4 sm:pt-8 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-blue-500 flex items-center justify-center shadow-lg">
                <Rocket className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
            </div>
            <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-slate-800 leading-tight">
              {dialogTitle}
            </DialogTitle>
            {dialogDescription && (
              <DialogDescription className="text-sm sm:text-base lg:text-lg text-slate-600 text-center font-medium leading-relaxed">
                {dialogDescription}
              </DialogDescription>
            )}
          </DialogHeader>

          {/* Main Content - Mobile Optimized */}
          <div className="flex-1 dialog-scrollbar">
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <div className="space-y-6 sm:space-y-8">
                  {/* Personal Information Section */}
                  <PersonalInfoSection
                    formData={formData}
                    handleChange={handleChange}
                    getTranslation={getTranslation}
                    currentCountryInfo={currentCountryInfo}
                    paymentMethod={formData.paymentMethod}
                  />

                  {/* Payment Configuration Section */}
                  <PaymentConfigSection
                    formData={formData}
                    handleChange={handleChange}
                    getTranslation={getTranslation}
                    availablePaymentMethods={availablePaymentMethods as any}
                    type={type}
                    units={units}
                    setUnits={setUnits}
                  />

                  {/* Amount Display */}
                  <AmountDisplay
                    formattedTotal={formattedTotal}
                    equivalentAmounts={equivalentAmounts}
                    formData={formData}
                    units={units}
                  />

                  {/* Terms and Payment Section */}
                  <TermsAndPayment
                    formData={formData}
                    handleChange={handleChange}
                    getTranslation={getTranslation}
                    isFormValid={isFormValid as any}
                    loading={loading}
                    handleSubmit={handleSubmit}
                    paymentMethod={formData.paymentMethod}
                    currency={formData.currency}
                    formattedTotal={formattedTotal}
                    type={type}
                    units={units}
                    total={total}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>

      {/* Loading Overlay */}
      <LoadingOverlay loading={loading} />
    </>
  );
}

// Helper functions
function getCountryFlag(countryCode: string): string {
  const flagMap: { [key: string]: string } = {
    "CMR": "🇨🇲",
    "GHA": "🇬🇭",
    "KEN": "🇰🇪",
    "NGA": "🇳🇬",
    "UGA": "🇺🇬",
    "TZA": "🇹🇿",
    "RWA": "🇷🇼",
    "ZMB": "🇿🇲",
  };
  return flagMap[countryCode] || "🌍";
}

function getCountryCode(countryCode: string): string {
  const countryCodes: { [key: string]: string } = {
    "CMR": "237",
    "GHA": "233",
    "KEN": "254",
    "NGA": "234",
    "UGA": "256",
    "TZA": "255",
    "RWA": "250",
    "ZMB": "260"
  };
  return countryCodes[countryCode] || "237";
}