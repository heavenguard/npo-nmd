"use client";

import React from "react";
import { CreditCard, Shield, BadgeCheck, Zap, Crown } from "lucide-react";
import type { FormDataState } from "../payment-types";

interface AmountDisplayProps {
  formattedTotal: string;
  equivalentAmounts: {
    XAF: number;
    USD: number;
    EUR: number;
  };
  formData: FormDataState;
  units: number;
}

export default function AmountDisplay({
  formattedTotal,
  equivalentAmounts,
  formData,
  units,
}: AmountDisplayProps) {
  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-4 sm:p-6 lg:p-8 text-white shadow-xl">
      <div className="absolute top-0 right-0 w-32 h-32 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-2xl sm:blur-3xl -mr-16 sm:-mr-32 -mt-16 sm:-mt-32" />
      <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-blue-400/20 rounded-full blur-2xl sm:blur-3xl -ml-12 sm:-ml-24 -mb-12 sm:-mb-24" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
              <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Total Amount</h3>
              <p className="text-blue-100 text-xs sm:text-sm">Secure SSL encrypted</p>
            </div>
          </div>
          <Shield className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-200" />
        </div>

        <div className="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border border-white/20">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-center">{formattedTotal}</p>
          <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-blue-100 justify-center">
            {formData.currency !== "XAF" && (
              <span className="bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                ≈ {new Intl.NumberFormat(undefined, { style: "currency", currency: "XAF", maximumFractionDigits: 0 }).format(equivalentAmounts.XAF)}
              </span>
            )}
            <span className="bg-white/10 px-2 sm:px-3 py-1 rounded-full">
              for {units} {units === 1 ? "unit" : "units"}
            </span>
            {formData.currency !== "USD" && formData.currency !== "XAF" && (
              <span className="bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                ≈ {new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(equivalentAmounts.USD)}
              </span>
            )}
            {formData.currency !== "EUR" && formData.currency !== "XAF" && (
              <span className="bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                ≈ {new Intl.NumberFormat(undefined, { style: "currency", currency: "EUR" }).format(equivalentAmounts.EUR)}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/5 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <BadgeCheck className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-blue-200" />
            <span className="truncate">Instant Portal Access</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/5 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-blue-200" />
            <span className="truncate">Digital Member Card</span>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm bg-white/5 p-2 sm:p-3 rounded-lg sm:rounded-xl">
            <Crown className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0 text-blue-200" />
            <span className="truncate">Exclusive Courses</span>
          </div>
        </div>
      </div>
    </div>
  );
}