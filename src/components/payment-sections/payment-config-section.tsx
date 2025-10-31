"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DollarSign, Globe, CreditCard, Phone } from "lucide-react";
import type { FormDataState, PaymentMethod } from "../payment-types";

interface PaymentConfigSectionProps {
  formData: FormDataState;
  handleChange: (key: keyof FormDataState) => (value: string | boolean | undefined) => void;
  getTranslation: (key: string, fallback: string) => string;
  availablePaymentMethods: PaymentMethod[];
  type: string;
  units: number;
  setUnits: (units: number) => void;
}

export default function PaymentConfigSection({
  formData,
  handleChange,
  getTranslation,
  availablePaymentMethods,
  type,
  units,
  setUnits,
}: PaymentConfigSectionProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-slate-200">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
          <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 truncate">Payment Configuration</h3>
          <p className="text-xs sm:text-sm text-slate-500 truncate">Choose your preferred payment method</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
        {/* Currency */}
        <div className="space-y-2 sm:space-y-3">
          <Label htmlFor="currency" className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1 sm:gap-2">
            <Globe className="h-3 w-3 sm:h-4 sm:w-4" />
            {getTranslation("becomeMember.form.currency", "Currency")}
            <span className="text-red-500">*</span>
          </Label>
          <Select onValueChange={(val) => handleChange("currency")(val)} value={formData.currency}>
            <SelectTrigger id="currency" className="h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder={getTranslation("becomeMember.form.currencyPlaceholder", "Select currency")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="XAF" className="text-sm sm:text-base">XAF - Central African Franc</SelectItem>
              <SelectItem value="USD" className="text-sm sm:text-base">USD - US Dollar</SelectItem>
              <SelectItem value="EUR" className="text-sm sm:text-base">EUR - Euro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Payment Method */}
        <div className="space-y-2 sm:space-y-3">
          <Label htmlFor="paymentMethod" className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1 sm:gap-2">
            Payment Method
            <span className="text-red-500">*</span>
          </Label>
          <Select onValueChange={(val: "mobile" | "paypal") => handleChange("paymentMethod")(val)} value={formData.paymentMethod}>
            <SelectTrigger id="paymentMethod" className="h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {availablePaymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <SelectItem key={method.value} value={method.value} className="text-sm sm:text-base">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-800 text-xs sm:text-sm truncate">{method.label}</div>
                        <div className="text-xs text-slate-500 truncate">{method.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Number of Units (except for donations) */}
        {type !== "don" && (
          <div className="space-y-2 sm:space-y-3 xs:col-span-2 sm:col-span-1">
            <Label htmlFor="units" className="text-xs sm:text-sm font-semibold text-slate-700">
              Number of Units
            </Label>
            <Input
              id="units"
              type="number"
              min={1}
              step={1}
              value={units}
              onChange={(e) => {
                const v = Number(e.target.value);
                setUnits(Number.isFinite(v) && v > 0 ? Math.floor(v) : 1);
              }}
              className="h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
        )}

        {/* Voting Option */}
        <div className="space-y-2 sm:space-y-3 xs:col-span-2 sm:col-span-1">
          <Label htmlFor="voting" className="text-xs sm:text-sm font-semibold text-slate-700">
            {getTranslation("becomeMember.form.voting", "I want to participate in voting")}
          </Label>
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="voting"
              checked={formData.voting}
              onChange={(e) => handleChange("voting")(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="voting" className="text-sm text-slate-700">
              Yes, I want to vote in organization matters
            </label>
          </div>
        </div>

        {/* Yearly Membership Option */}
        {type === "membership" && (
          <div className="space-y-2 sm:space-y-3 xs:col-span-2">
            <Label htmlFor="payYearlyMembership" className="text-xs sm:text-sm font-semibold text-slate-700">
              {getTranslation("becomeMember.form.yearlyMembership", "Pay yearly membership for discount")}
            </Label>
            <div className="flex items-center space-x-2 pt-2">
              <input
                type="checkbox"
                id="payYearlyMembership"
                checked={formData.payYearlyMembership || false}
                onChange={(e) => handleChange("payYearlyMembership")(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="payYearlyMembership" className="text-sm text-slate-700">
                Get 20% discount with yearly payment
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}