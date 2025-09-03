"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Users,
  Rocket,
  Globe,
  CheckCircle,
  Award,
  CreditCard,
  User,
} from "lucide-react";
import {
  addToSubCollection,
  setToSubCollection,
} from "@/functions/add-to-a-sub-collection";
import { toast } from "sonner";
import { setToCollection } from "@/functions/add-to-collection";
import Loader from "@/components/loader";
import { useAuth } from "@/context/auth-context";
import { nanoid } from "nanoid";
import { useTranslations } from "@/lib/useTranslations";
import PaypalButtonWrapper from "@/components/paypalButtonWrapper";
import Image from "next/image";

export default function BecomeMemberPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    profession: "",
    motivation: "",
    agreeTerms: false,
    payYearlyMembership: false,
  });
  const [depositId, setDepositId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(15000);
  const { login } = useAuth();
  const t = useTranslations("becomeMember");

  useEffect(() => {
    const savedDepositId = localStorage.getItem("depositId");
    if (savedDepositId) {
      setDepositId(savedDepositId);
    }
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (depositId) {
      intervalId = setInterval(async () => {
        try {
          const response = await fetch(
            `/api/pawapay/deposits?depositId=${depositId}`
          );
          const data = await response.json();
          const status = data[0]?.status || data.status;
          console.log(status);
          console.log(depositId);
          if (status === "COMPLETED") {
            clearInterval(intervalId);

            // Retrieve form data after payment
            const savedFormData = localStorage.getItem("pendingFormData");
            if (savedFormData) {
              const parsedFormData = JSON.parse(savedFormData);

              // Create the account here
              try {
                const response = await fetch("/api/users", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: parsedFormData.email,
                    displayName: parsedFormData.name,
                  }),
                });

                const data = await response.json();
                console.log(data);
                console.log(formData);

                // Save password in localStorage
                localStorage.setItem("password", data.password);
                setPassword(data.password);

                await setToCollection("users", data.userId, {
                  uid: data.userId,
                  idNumber: `NMD-ASSO-${nanoid(6)}`,
                  ...parsedFormData,
                });

                await addToSubCollection(
                  {
                    amount: formData.payYearlyMembership ? 80500 : 15000,
                    type: formData.payYearlyMembership
                      ? "Inscription & Membership payment"
                      : "Inscription payment",
                    status: "completed",
                    description: formData.payYearlyMembership
                      ? "Paid for registration and yearly membership"
                      : "Paid for registration",
                  },
                  "users",
                  data.userId,
                  "donations"
                );

                toast.success("New user has been added successfully");
                await setToCollection("transactions", depositId, {
                  transactionId: depositId,
                  userId: data.userId,
                  amount: formData.payYearlyMembership ? 80500 : 15000,
                  currency: "XAF",
                  status: "completed",
                  paymentMethod: "mobile",
                  type: formData.payYearlyMembership
                    ? "membership"
                    : "inscription",
                  description: formData.payYearlyMembership
                    ? "Inscription and Membership"
                    : "Inscription only",
                });

                // Reset form and close dialog
                setFormData({
                  name: "",
                  email: "",
                  country: "",
                  profession: "",
                  motivation: "",
                  agreeTerms: false,
                  payYearlyMembership: false,
                });

                // Clear localStorage
                localStorage.removeItem("depositId");
                localStorage.removeItem("pendingFormData");
                setDepositId("");
                console.log(password);
                console.log(parsedFormData.email);
                await login(parsedFormData.email, data.password);
                setLoading(false);
              } catch (error) {
                toast.error("Failed to create user. Please try again.");
              }
            }

            toast.success("Membership activated successfully!");
          } else if (status === undefined || status === "FAILED") {
            toast.error("Le paiement a échoué, veuillez recommencer.");
            localStorage.removeItem("depositId");
            setDepositId("");
            localStorage.removeItem("pendingFormData");
            setLoading(false);
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          clearInterval(intervalId);
        }
      }, 10000);
    }

    return () => clearInterval(intervalId);
  }, [depositId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = JSON.stringify({
      amount: formData.payYearlyMembership ? 80500 : 15000,
      currentUrl: "https://npo.nanosatellitemissions.com//become-member",
      product: "Membership",
    });

    try {
      setLoading(true);
      const res = await fetch("/api/pawapay/deposits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      // Save depositId in localStorage
      localStorage.setItem("depositId", data.depositId);
      setDepositId(data.depositId);

      // Optional: Save any form data so you can still create the account after refresh
      localStorage.setItem("pendingFormData", JSON.stringify(formData));

      if (data?.redirectUrl) {
        window.location.href = data.redirectUrl;
      }

      toast.success("Please complete the payment on your mobile device.");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const benefits = [
    {
      icon: <Rocket className="h-6 w-6 text-blue-600" />,
      title: t("benefits.technicalTraining.title"),
      description: t("benefits.technicalTraining.description"),
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: t("benefits.projectParticipation.title"),
      description: t("benefits.projectParticipation.description"),
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-600" />,
      title: t("benefits.continentalNetwork.title"),
      description: t("benefits.continentalNetwork.description"),
    },
    {
      icon: <Award className="h-6 w-6 text-orange-600" />,
      title: t("benefits.memberSpace.title"),
      description: t("benefits.memberSpace.description"),
    },
  ];

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.country.trim() !== "" &&
    formData.profession.trim() !== "" &&
    formData.motivation.trim() !== "" &&
    formData.agreeTerms;

  return (
    <div className="min-h-screen bg-white">
      {depositId && <Loader />}
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {t("hero.description")}
          </p>
          <p className="text-lg text-blue-50 font-medium">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            {t("benefits.title")}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                {t("form.title")}
              </CardTitle>
              <p className="text-gray-600 text-lg">{t("form.description")}</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-900 font-medium">
                      {t("form.fullName")} *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-gray-900 font-medium"
                    >
                      {t("form.email")} *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label
                      htmlFor="country"
                      className="text-gray-900 font-medium"
                    >
                      {t("form.country")} *
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData({ ...formData, country: value })
                      }
                    >
                      <SelectTrigger className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder={t("form.selectCountry")} />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="cameroon">Cameroun</SelectItem>
                        <SelectItem value="senegal">Sénégal</SelectItem>
                        <SelectItem value="ivory-coast">
                          Côte d'Ivoire
                        </SelectItem>
                        <SelectItem value="mali">Mali</SelectItem>
                        <SelectItem value="burkina-faso">
                          Burkina Faso
                        </SelectItem>
                        <SelectItem value="niger">Niger</SelectItem>
                        <SelectItem value="chad">Tchad</SelectItem>
                        <SelectItem value="gabon">Gabon</SelectItem>
                        <SelectItem value="congo">Congo</SelectItem>
                        <SelectItem value="drc">RD Congo</SelectItem>
                        <SelectItem value="other">
                          Autre pays africain
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="profession"
                      className="text-gray-900 font-medium"
                    >
                      {t("form.profession")} *
                    </Label>
                    <Input
                      id="profession"
                      type="text"
                      value={formData.profession}
                      onChange={(e) =>
                        setFormData({ ...formData, profession: e.target.value })
                      }
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder={t("form.professionPlaceholder")}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label
                    htmlFor="motivation"
                    className="text-gray-900 font-medium"
                  >
                    {t("form.motivation")} *
                  </Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) =>
                      setFormData({ ...formData, motivation: e.target.value })
                    }
                    className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                    placeholder={t("form.motivationPlaceholder")}
                    required
                  />
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4">
                      <CreditCard className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {t("form.membershipFee")}
                      </h3>
                      <p className="text-gray-600">{t("form.oneTimeFee")}</p>
                    </div>
                  </div>

                  <div className="text-center bg-white p-6 rounded-xl border-2 border-blue-200">
                    <p className="text-4xl font-bold text-blue-600 mb-2">
                      15,000 FCFA
                    </p>
                    <p className="text-gray-600 mb-4">~25 EUR | 29 USD</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>{t("form.accountIncluded")}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{t("form.automaticAccount")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{t("form.digitalCard")}</span>
                    </div>
                    {/* <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Possibilité de donations mensuelles</span>
                    </div> */}
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>{t("form.exclusiveOffers")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.payYearlyMembership}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        payYearlyMembership: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-gray-600 text-sm leading-relaxed"
                  >
                    {t("form.payYearlyMembership")}
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) =>
                      setFormData({
                        ...formData,
                        agreeTerms: checked as boolean,
                      })
                    }
                  />
                  <Label
                    htmlFor="terms"
                    className="text-gray-600 text-sm leading-relaxed"
                  >
                    {t("form.agreeTerms")}
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 mb-5 text-white py-4 h-14 text-lg"
                  disabled={!formData.agreeTerms}
                >
                  <Image
                    src="/mobile-money.jpg"
                    alt="Mobile Money"
                    width={24}
                    height={24}
                  />
                </Button>
              </form>
              <PaypalButtonWrapper
                total={formData.payYearlyMembership ? 129 : 29}
                disabled={!isFormValid}
                formData={formData}
                login={login}
              />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            {t("nextSteps.title")}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t("nextSteps.accountCreated.title")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("nextSteps.accountCreated.description")}
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t("nextSteps.memberAccess.title")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("nextSteps.memberAccess.description")}
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {t("nextSteps.access.title")}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {t("nextSteps.access.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
