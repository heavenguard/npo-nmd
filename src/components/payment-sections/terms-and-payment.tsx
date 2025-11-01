"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Smartphone, CreditCard, Loader2 } from "lucide-react";
import PaypalButtonWrapper from "../paypalButtonWrapper";
import type { FormDataState, LoadingState } from "../payment-types";

interface TermsAndPaymentProps {
  formData: FormDataState;
  handleChange: (key: keyof FormDataState) => (value: string | boolean | undefined) => void;
  getTranslation: (key: string, fallback: string) => string;
  isFormValid: boolean;
  loading: LoadingState;
  handleSubmit: (e?: React.FormEvent) => void;
  paymentMethod: "mobile" | "paypal";
  currency: string;
  formattedTotal: string;
  type: string;
  units: number;
  total: number;
}

export default function TermsAndPayment({
  formData,
  handleChange,
  getTranslation,
  isFormValid,
  loading,
  handleSubmit,
  paymentMethod,
  currency,
  formattedTotal,
  type,
  units,
  total,
}: TermsAndPaymentProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Terms and Conditions */}
      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-blue-50 rounded-xl sm:rounded-2xl border border-blue-200">
        <Checkbox
          id="terms"
          checked={formData.agreeTerms}
          onCheckedChange={(val) => handleChange("agreeTerms")(Boolean(val))}
          className="mt-0.5 sm:mt-1 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
        />
        <Label htmlFor="terms" className="text-xs sm:text-sm text-slate-700 cursor-pointer flex-1 leading-relaxed">
          {getTranslation("becomeMember.form.agreeTerms", "I agree to the NMD terms and conditions and understand that my payment will be processed securely. I acknowledge that this is a membership fee payment for NMD services and benefits.")}
        </Label>
      </div>

      {/* Payment Buttons */}
      <div className="space-y-3 sm:space-y-4">
        {/* Mobile Money Button */}
        {paymentMethod === "mobile" && currency === "XAF" && (
          <Button
            type="button"
            onClick={handleSubmit}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={!isFormValid || loading.isActive}
          >
            {loading.isActive ? (
              <span className="flex items-center gap-2 sm:gap-3">
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                <span className="text-sm sm:text-base">Processing...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">Pay {formattedTotal} with Mobile Money</span>
              </span>
            )}
          </Button>
        )}

        {/* PayPal Integration */}
        {(currency === "USD" || currency === "EUR" || currency === "XAF") && paymentMethod === "paypal" && (
          <div className="space-y-2 sm:space-y-3">
            <div className="text-center text-xs sm:text-sm text-slate-600 font-medium">
              Pay securely with PayPal
            </div>
            <PaypalButtonWrapper
              total={total}
              disabled={!isFormValid || loading.isActive}
              formData={formData}
              type={type}
              currency={currency}
              description={
                type === "don"
                  ? "General donation"
                  : type === "mission"
                  ? "Contribution to the mission"
                  : type === "student"
                  ? "Sponsorship for a student"
                  : "NMD Membership Fee"
              }
              onPaymentStart={() => {/* Handled in parent */}}
              onPaymentComplete={async (paymentData) => {
                // This will be handled by the parent component through callbacks
                console.log("PayPal payment completed:", paymentData);
              }}
              onPaymentError={(error) => {
                console.error("PayPal payment error:", error);
              }}
            />
          </div>
        )}
      </div>

      {/* Security Badge */}
      <div className="text-center space-y-2 sm:space-y-3">
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>256-bit SSL</span>
          </div>
          <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3" />
            <span>PCI DSS</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 px-4">
          Your payment information is securely processed and never stored
        </p>
      </div>
    </div>
  );
}