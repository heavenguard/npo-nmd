"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, UserCheck, CheckCircle } from "lucide-react";
import type { LoadingState } from "../payment-types";

interface LoadingOverlayProps {
  loading: LoadingState;
}

export default function LoadingOverlay({ loading }: LoadingOverlayProps) {
  if (!loading.isActive) return null;

  const getStepIcon = () => {
    switch (loading.step) {
      case "payment":
        return <Loader2 className="h-8 w-8 animate-spin text-blue-500" />;
      case "account_creation":
        return <UserCheck className="h-8 w-8 text-green-500" />;
      case "complete":
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      default:
        return <Loader2 className="h-8 w-8 animate-spin text-blue-500" />;
    }
  };

  const getStepColor = () => {
    switch (loading.step) {
      case "payment":
        return "text-blue-600";
      case "account_creation":
        return "text-green-600";
      case "complete":
        return "text-green-600";
      default:
        return "text-blue-600";
    }
  };

  const getStepTitle = () => {
    switch (loading.step) {
      case "payment":
        return "Processing Payment";
      case "account_creation":
        return "Creating Your Account";
      case "complete":
        return "Success!";
      default:
        return "Processing...";
    }
  };

  const getProgressWidth = () => {
    switch (loading.step) {
      case "payment":
        return "w-1/3";
      case "account_creation":
        return "w-2/3";
      case "complete":
        return "w-full";
      default:
        return "w-1/3";
    }
  };

  const getProgressColor = () => {
    switch (loading.step) {
      case "payment":
        return "bg-blue-500";
      case "account_creation":
        return "bg-green-500";
      case "complete":
        return "bg-green-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            {getStepIcon()}
          </div>
          <h3 className={`text-lg font-semibold mb-2 ${getStepColor()}`}>
            {getStepTitle()}
          </h3>
          <p className="text-slate-600 mb-4">{loading.message}</p>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor()} ${getProgressWidth()}`}
            />
          </div>
          {loading.step === "payment" && (
            <p className="text-xs text-slate-500 mt-3">
              Please check your mobile device to complete the payment
            </p>
          )}
          {loading.step === "account_creation" && (
            <p className="text-xs text-slate-500 mt-3">
              Setting up your account and membership...
            </p>
          )}
          {loading.step === "complete" && (
            <p className="text-xs text-slate-500 mt-3">
              Your account has been created successfully!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}