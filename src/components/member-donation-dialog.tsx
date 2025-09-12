"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import PaypalButtonWrapper from "./paypalButtonWrapper";
import { Plus } from "lucide-react";
import Image from "next/image";

interface PaymentFlowProps {
  handleSubmit: (
    donationType: string,
    donationAmount: number,
    donationNote: string
  ) => Promise<void> | void;
}

const fixedAmounts = {
  membership: 65500,
  sponsorship: 655000,
  mission: 655000,
};

export function PaymentFlow({ handleSubmit }: PaymentFlowProps) {
  const [donationDialogOpen, setDonationDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const [donationType, setDonationType] = useState("");
  const [donationAmount, setDonationAmount] = useState(0);
  const [donationNote, setDonationNote] = useState("");
  const [currency, setCurrency] = useState<"XAF" | "USD" | "EUR">("XAF");

  // Move from form to payment choice
  const handleProceedToPayment = () => {
    if (!donationType || !donationAmount) return;
    setDonationDialogOpen(false);
    setPaymentDialogOpen(true);
  };

  const handleDonationTypeChange = (type: string) => {
    setDonationType(type);
    // Set fixed amount for non-donation types, clear amount for donation
    if (type === "donation") {
      setDonationAmount(0);
    } else if (type === "membership") {
      setDonationAmount(fixedAmounts.membership);
    } else if (type === "sponsorship") {
      setDonationAmount(fixedAmounts.sponsorship);
    } else if (type === "mission") {
      setDonationAmount(fixedAmounts.mission);
    }
  };

  const getDonationTypeDescription = (type: string) => {
    switch (type) {
      case "donation":
        return "Support our general activities and mission";
      case "membership":
        return "Annual membership fee - 65,500 XAF";
      case "sponsorship":
        return "Sponsor a student's training - 250,000 XAF";
      case "mission":
        return "Contribute to the first Mission 237 development - 655,000 XAF";
      default:
        return "";
    }
  };

  return (
    <>
      {/* Step 1: Donation Form */}
      <Dialog open={donationDialogOpen} onOpenChange={setDonationDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Make a Donation
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Make a Donation</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div>
              <Label
                htmlFor="donation-type"
                className="text-gray-900 font-medium"
              >
                Donation Type
              </Label>
              <Select onValueChange={handleDonationTypeChange}>
                <SelectTrigger className="mt-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                  <SelectValue placeholder="Select donation type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="donation">General Donation</SelectItem>
                  <SelectItem value="membership">Membership Payment</SelectItem>
                  <SelectItem value="sponsorship">
                    Student Sponsorship
                  </SelectItem>
                  <SelectItem value="mission">Mission Contribution</SelectItem>
                </SelectContent>
              </Select>
              {donationType && (
                <p className="text-sm text-gray-600 mt-2">
                  {getDonationTypeDescription(donationType)}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="amount" className="text-gray-900 font-medium">
                Amount (XAF)
              </Label>
              {donationType === "donation" ? (
                <div className="mb-5">
                  <Select
                    onValueChange={(value) => {
                      setCurrency(value as "XAF" | "USD" | "EUR");
                      console.log(value);
                    }}
                  >
                    <SelectTrigger className="mt-2 w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Sélectionnez votre dévise" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="XAF">FCFA</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Label
                    htmlFor="amount"
                    className="text-gray-900 mt-5 font-medium"
                  >
                    Montant ({currency})
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={donationAmount}
                    min={currency === "XAF" ? 15000 : 30}
                    onChange={(e) =>
                      setDonationAmount(parseInt(e.target.value))
                    }
                    className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder={`Min: ${currency === "XAF" ? 15000 : 30}`}
                  />
                </div>
              ) : (
                <div className="mt-2 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-blue-700">
                      {donationAmount.toLocaleString()} XAF
                    </span>
                    <span className="text-sm text-gray-500 font-medium">
                      Fixed amount
                    </span>
                  </div>

                  {/* Approximations */}
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    <p>≈ {(donationAmount / 650).toFixed(2)} EUR</p>
                    <p>≈ {(donationAmount / 580).toFixed(2)} USD</p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="note" className="text-gray-900 font-medium">
                Note (Optional)
              </Label>
              <Textarea
                id="note"
                value={donationNote}
                onChange={(e) => setDonationNote(e.target.value)}
                className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Add a note for your donation..."
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setDonationDialogOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleProceedToPayment}
                className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                disabled={!donationType || !donationAmount}
              >
                {donationType === "donation"
                  ? "Donate"
                  : donationType === "membership"
                  ? "Pay Membership"
                  : donationType === "sponsorship"
                  ? "Sponsor Student"
                  : donationType === "mission"
                  ? "Contribute to Mission"
                  : "Proceed"}
                {donationAmount && ` - ${donationAmount} XAF`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Step 2: Payment Choice */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Payment Method</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            {/* Mobile Money */}
            <Button
              onClick={() =>
                handleSubmit(donationType, donationAmount, donationNote)
              }
              className="w-full bg-green-600 text-white"
            >
              <Image
                src="/mobile-money.jpg"
                alt="Mobile Money"
                width={100}
                height={100}
              />
            </Button>

            {/* PayPal */}
            <div className="w-full">
              <PaypalButtonWrapper
                total={
                  currency === "XAF" ? donationAmount / 580 : donationAmount
                } // keep your conversion
                disabled={!donationType || !donationAmount}
                formData={{ donationType, donationAmount, donationNote }}
                login={true}
                type={donationType}
                currency={currency === "XAF" ? "USD" : currency}
                description={
                  donationType === "don"
                    ? "General donation"
                    : donationType === "mission"
                    ? "Contribution to the mission"
                    : donationType === "student"
                    ? "Sponsorship for a student"
                    : "Unspecified donation"
                }
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
