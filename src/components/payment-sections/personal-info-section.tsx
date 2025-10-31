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
import { User, Phone, Smartphone, Lock } from "lucide-react";
import type { FormDataState, CountryInfo } from "../payment-types";

interface PersonalInfoSectionProps {
  formData: FormDataState;
  handleChange: (key: keyof FormDataState) => (value: string | boolean | undefined) => void;
  getTranslation: (key: string, fallback: string) => string;
  currentCountryInfo: CountryInfo | undefined;
  paymentMethod: "mobile" | "paypal";
}

export default function PersonalInfoSection({
  formData,
  handleChange,
  getTranslation,
  currentCountryInfo,
  paymentMethod,
}: PersonalInfoSectionProps) {
  const getCountryFlag = (countryCode: string): string => {
    const flagMap: { [key: string]: string } = {
      "CMR": "🇨🇲", "GHA": "🇬🇭", "KEN": "🇰🇪", "NGA": "🇳🇬",
      "UGA": "🇺🇬", "TZA": "🇹🇿", "RWA": "🇷🇼", "ZMB": "🇿🇲",
    };
    return flagMap[countryCode] || "🌍";
  };

  const getCountryCode = (countryCode: string): string => {
    const countryCodes: { [key: string]: string } = {
      "CMR": "237", "GHA": "233", "KEN": "254", "NGA": "234",
      "UGA": "256", "TZA": "255", "RWA": "250", "ZMB": "260"
    };
    return countryCodes[countryCode] || "237";
  };

  const PAWAPAY_SUPPORTED_COUNTRIES = [
    { code: "CMR", name: "Cameroon", currency: "XAF", mobileOperators: ["MTN", "ORANGE"] },
    { code: "GHA", name: "Ghana", currency: "GHS", mobileOperators: ["MTN", "VODAFONE", "AIRTELTIGO"] },
    { code: "KEN", name: "Kenya", currency: "KES", mobileOperators: ["MPESA", "AIRTEL"] },
    { code: "NGA", name: "Nigeria", currency: "NGN", mobileOperators: ["MTN", "AIRTEL", "GLO", "9MOBILE"] },
    { code: "UGA", name: "Uganda", currency: "UGX", mobileOperators: ["MTN", "AIRTEL"] },
    { code: "TZA", name: "Tanzania", currency: "TZS", mobileOperators: ["VODACOM", "AIRTEL", "TIGO"] },
    { code: "RWA", name: "Rwanda", currency: "RWF", mobileOperators: ["MTN", "AIRTEL"] },
    { code: "ZMB", name: "Zambia", currency: "ZMW", mobileOperators: ["MTN", "AIRTEL"] },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center gap-2 sm:gap-3 pb-3 sm:pb-4 border-b border-slate-200">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
          <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 truncate">Personal Information</h3>
          <p className="text-xs sm:text-sm text-slate-500 truncate">Tell us about yourself</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-6">
        {/* Full Name */}
        <div className="space-y-2 sm:space-y-3 xs:col-span-2 sm:col-span-1">
          <Label htmlFor="name" className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1 sm:gap-2">
            {getTranslation("contact.form.fullName", "Full name")}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name")(e.target.value)}
            className="h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
            placeholder={getTranslation("contact.form.fullNamePlaceholder", "Jane Doe")}
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2 sm:space-y-3 xs:col-span-2 sm:col-span-1">
          <Label htmlFor="email" className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1 sm:gap-2">
            {getTranslation("contact.form.email", "Email")}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email")(e.target.value)}
            className="h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2 sm:space-y-3 xs:col-span-2 sm:col-span-1">
          <Label htmlFor="password" className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1 sm:gap-2">
            <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
            Password
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password")(e.target.value)}
            className="h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
            placeholder="Enter your password"
            required
            minLength={6}
          />
          <p className="text-xs text-slate-500">Password must be at least 6 characters long</p>
        </div>

        {/* Country */}
        <div className="space-y-2 sm:space-y-3 xs:col-span-2 sm:col-span-1">
          <Label htmlFor="country" className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1 sm:gap-2">
            {getTranslation("becomeMember.form.country", "Country")}
            <span className="text-red-500">*</span>
          </Label>
          <Select onValueChange={(val) => handleChange("country")(val)} value={formData.country}>
            <SelectTrigger id="country" className="h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder={getTranslation("becomeMember.form.countryPlaceholder", "Select your country")} />
            </SelectTrigger>
            <SelectContent className="max-h-60 sm:max-h-80">
              {PAWAPAY_SUPPORTED_COUNTRIES.map((country) => (
                <SelectItem key={country.code} value={country.code} className="text-sm sm:text-base">
                  <div className="flex items-center gap-2">
                    <span className="text-base sm:text-lg">{getCountryFlag(country.code)}</span>
                    <span className="truncate">{country.name}</span>
                  </div>
                </SelectItem>
              ))}
              <SelectItem value="other" className="text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">🌍</span>
                  <span>Other Country</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Profession */}
        <div className="space-y-2 sm:space-y-3 xs:col-span-2 sm:col-span-1">
          <Label htmlFor="profession" className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1 sm:gap-2">
            {getTranslation("becomeMember.form.profession", "Profession")}
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="profession"
            name="profession"
            type="text"
            value={formData.profession}
            onChange={(e) => handleChange("profession")(e.target.value)}
            className="h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
            placeholder={getTranslation("becomeMember.form.professionPlaceholder", "Your profession")}
            required
          />
        </div>

        {/* Motivation (Optional) */}
        <div className="space-y-2 sm:space-y-3 xs:col-span-2">
          <Label htmlFor="motivation" className="text-xs sm:text-sm font-semibold text-slate-700">
            {getTranslation("becomeMember.form.motivation", "Motivation (optional)")}
          </Label>
          <Input
            id="motivation"
            name="motivation"
            type="text"
            value={formData.motivation || ""}
            onChange={(e) => handleChange("motivation")(e.target.value)}
            className="h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
            placeholder={getTranslation("becomeMember.form.motivationPlaceholder", "Why do you want to join us?")}
          />
        </div>

        {/* Phone Number - Only show for mobile payments */}
        {paymentMethod === "mobile" && currentCountryInfo && (
          <div className="space-y-2 sm:space-y-3 xs:col-span-2">
            <Label htmlFor="phoneNumber" className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1 sm:gap-2">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
              Phone Number
              <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <span className="inline-flex items-center px-2 sm:px-3 rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 text-slate-600 text-xs sm:text-sm font-medium">
                +{getCountryCode(currentCountryInfo.code)}
              </span>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber")(e.target.value)}
                className="flex-1 min-w-0 rounded-l-none h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20"
                placeholder="Phone number"
                required
              />
            </div>
          </div>
        )}

        {/* Mobile Operator - Only show for mobile payments */}
        {paymentMethod === "mobile" && currentCountryInfo && (
          <div className="space-y-2 sm:space-y-3 xs:col-span-2">
            <Label htmlFor="mobileOperator" className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1 sm:gap-2">
              <Smartphone className="h-3 w-3 sm:h-4 sm:w-4" />
              Mobile Operator
              <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={(val) => handleChange("mobileOperator")(val)} value={formData.mobileOperator}>
              <SelectTrigger id="mobileOperator" className="h-10 sm:h-12 text-sm sm:text-base border-slate-300 focus:border-blue-500 focus:ring-blue-500/20">
                <SelectValue placeholder="Select your mobile operator" />
              </SelectTrigger>
              <SelectContent>
                {currentCountryInfo.mobileOperators.map((operator) => (
                  <SelectItem key={operator} value={operator} className="text-sm sm:text-base">
                    {operator}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
}