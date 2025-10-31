"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  Users,
  Handshake,
  Heart,
  Target,
  Rocket,
  GraduationCap,
  Building,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { setToCollection } from "@/functions/add-to-collection";
import { useAuth } from "@/context/auth-context";
import PaymentDialog from "@/components/payment-dialog";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { addToSubCollection } from "@/functions/add-to-a-sub-collection";
import { useTranslations } from "@/lib/useTranslations";
import Loader from "@/components/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import contributionMethods from "./contribution-methods"
import PricingPlans from "./contribution-methods";



export default function GetInvolvedPage() {
  const [donationAmount, setDonationAmount] = useState("");
  const [depositId, setDepositId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [dialogDatas, setDialogDatas] = useState({
    type: "",
    title: "",
    description: "",
    amount: 0,
  });
  const [currency, setCurrency] = useState<"XAF" | "USD" | "EUR">("XAF");
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [amount, setAmount] = useState(15000);
  const { login } = useAuth();
  const router = useRouter();
  const t = useTranslations("getInvolved");
  const s = useTranslations();

  useEffect(() => {
    const savedDepositId = localStorage.getItem("depositId");
    localStorage.removeItem("depositId");
    console.log(savedDepositId);
    if (savedDepositId) {
      setDepositId(savedDepositId);
    }
  }, []);

  // Handle plan selection from PricingPlans component
  const handlePlanSelect = (plan: any, frequency: string) => {
    console.log("Plan selected:", plan, "Frequency:", frequency);

    // Calculate amount based on frequency and plan type
    let calculatedAmount = 0;

    if (typeof plan.price[frequency as keyof typeof plan.price] === 'number') {
      calculatedAmount = plan.price[frequency as keyof typeof plan.price] as number;
    } else {
      // Handle custom pricing or default amounts
      switch (plan.id) {
        case 'mission':
          calculatedAmount = 655000;
          break;
        case 'student':
          calculatedAmount = 655000;
          break;
        case 'donation':
          calculatedAmount = amount; // Use the donation amount state
          break;
        case 'partner':
          // For partnerships, redirect to contact page
          router.push("/contact");
          return;
        default:
          calculatedAmount = 15000; 
      }
    }

    // Handle different plan types
    if (plan.id === 'partner') {
      router.push("/contact");
      return;
    }

    // Set dialog data based on plan type
    let dialogTitle = "";
    let dialogDescription = "";
    let dialogType = plan.id;

    switch (plan.id) {
      case 'mission':
        dialogTitle = s("common.missionSupport");
        dialogDescription = s("common.missionSupportDescription");
        break;
      case 'student':
        dialogTitle = s("common.studentSponsorship");
        dialogDescription = s("common.studentSponsorshipDescription");
        break;
      case 'donation':
        dialogTitle = s("common.donation");
        dialogDescription = s("common.donationDescription");
        // For donations, use the selected amount
        calculatedAmount = amount;
        break;
      default:
        dialogTitle = plan.name;
        dialogDescription = plan.description;
    }

    // Validate minimum amount for donations
    if (plan.id === 'donation' && calculatedAmount < 15000 && currency === "XAF") {
      toast.error("Montant minimum est de 15000 FCFA");
      return;
    }

    setDialogDatas({
      title: dialogTitle,
      description: dialogDescription,
      amount: calculatedAmount,
      type: dialogType,
    });

    setIsDialogOpened(true);
  };

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

          if (status === "COMPLETED") {
            clearInterval(intervalId);

            // Retrieve form data after payment
            const savedFormData = localStorage.getItem("pendingFormData");
            const savedDatas = localStorage.getItem("datas");

            if (savedFormData && savedDatas) {
              const parsedFormData = JSON.parse(savedFormData);
              const parsedDatas = JSON.parse(savedDatas);
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

                // Save password in localStorage
                localStorage.setItem("password", data.password);
                setPassword(data.password);

                await setToCollection("users", data.userId, {
                  uid: data.userId,
                  idNumber: `NMD-ASSO-${nanoid(6)}`,
                  role: "user",
                  ...parsedFormData,
                });

                await addToSubCollection(
                  {
                    amount: dialogDatas.amount,
                    type:
                      parsedDatas.type === "don"
                        ? "Donation"
                        : parsedDatas.type === "mission"
                          ? "Mission Support"
                          : parsedDatas.type === "student"
                            ? "Student Sponsorship"
                            : "Unknown",
                    status: "completed",
                    description:
                      parsedDatas.type === "don"
                        ? "General donation"
                        : parsedDatas.type === "mission"
                          ? "Contribution to the mission"
                          : parsedDatas.type === "student"
                            ? "Sponsorship for a student"
                            : "Unspecified donation",
                  },
                  "users",
                  data.userId,
                  "donations"
                );

                toast.success("New user has been added successfully");
                await setToCollection("transactions", depositId, {
                  transactionId: depositId,
                  userId: data.userId,
                  amount: parsedDatas.amount,
                  currency: "XAF",
                  status: "completed",
                  paymentMethod: "mobile",
                  type: parsedDatas.type,
                  description: parsedDatas.description,
                });

                // Clear localStorage
                localStorage.removeItem("depositId");
                localStorage.removeItem("pendingFormData");
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

  const handleClickOptionButton = (option: any) => {
    if (option.type === "partner") {
      router.push("/contact");
    } else if (amount < 15000 && option.type === "don" && currency === "XAF") {
      toast.error("Montant minimum est de 15000 FCFA");
      return;
    } else if (option.type === "mission") {
      setDialogDatas({
        title: s("common.missionSupport"),
        description: s("common.missionSupportDescription"),
        amount: 655000,
        type: option.type,
      });
    } else if (option.type === "student") {
      setDialogDatas({
        title: s("common.studentSponsorship"),
        description: s("common.studentSponsorshipDescription"),
        amount: 655000,
        type: option.type,
      });
    } else if (option.type === "don") {
      setDialogDatas({
        title: s("common.donation"),
        description: s("common.donationDescription"),
        amount,
        type: option.type,
      });
    }
    setIsDialogOpened(true);
  };

  const contributionOptions = [
    {
      id: 'mission',
      name: t("howToContribute.financialContribution.title"),
      price: {
        monthly: 650000,
        yearly: 39,
      },
      description: t("howToContribute.financialContribution.description"),
      features: [
        t("howToContribute.financialContribution.options.1"),
        t("howToContribute.financialContribution.options.2"),
        t("howToContribute.financialContribution.options.3"),
      ],
      cta: t("howToContribute.financialContribution.cta"),
      popular: false, // You can set this to true for highlighted plans
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
    },
    {
      id: 'student',
      name: t("howToContribute.studentSponsorship.title"),
      price: {
        monthly: 250000,
        yearly: 39,
      },
      description: t("howToContribute.studentSponsorship.description"),
      features: [
        t("howToContribute.studentSponsorship.options.1"),
        t("howToContribute.studentSponsorship.options.2"),
        t("howToContribute.studentSponsorship.options.3"),
      ],
      cta: t("howToContribute.studentSponsorship.cta"),
      popular: true, // Example: highlight this plan
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
    },
    {
      id: 'donation',
      name: t("howToContribute.donation.title"),
      price: {
        monthly: 49,
        yearly: 39,
      },
      description: t("howToContribute.donation.description"),
      features: [
        t("howToContribute.donation.options.1"),
        t("howToContribute.donation.options.2"),
        t("howToContribute.donation.options.3"),
      ],
      cta: t("howToContribute.donation.cta"),
      popular: false,
      icon: <Users className="h-8 w-8 text-purple-600" />,
    },
    {
      id: 'partner',
      name: t("howToContribute.corporatePartnership.title"),
      price: {
        monthly: 49,
        yearly: 39,
      },
      description: t("howToContribute.corporatePartnership.description"),
      features: [
        t("howToContribute.corporatePartnership.options.1"),
        t("howToContribute.corporatePartnership.options.2"),
        t("howToContribute.corporatePartnership.options.3"),
      ],
      cta: t("howToContribute.corporatePartnership.cta"),
      popular: false,
      icon: <Building className="h-8 w-8 text-orange-600" />,
    },
  ];

  const impactNumbers = [
    { number: "200+", label: "Étudiants à Former", color: "text-blue-600" },
    { number: "10", label: "Pays Africains Ciblés", color: "text-green-600" },
    {
      number: "1",
      label: "1er satellite à but éducatif en orbit",
      color: "text-purple-600",
    },
    { number: "2026", label: "Année de Lancement", color: "text-orange-600" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {depositId && <Loader />}
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

      <PricingPlans
        title="Ways to Contribute"
        description="Join our mission to advance space technology education and research through various contribution options"
        plans={contributionOptions}
        onPlanSelect={handlePlanSelect}
        showFrequencyToggle={true} // Set to false if you don't want monthly/yearly toggle
        className="bg-gradient-to-b from-blue-50 to-white"
      />

      {/* Contact for Partnerships */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-14 text-lg"
              >
                {t("cta.contactUs")}
                <Handshake className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/become-member">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 h-14 text-lg bg-transparent"
              >
                {t("cta.becomeMember")}
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <PaymentDialog
        open={isDialogOpened}
        setOpen={setIsDialogOpened}
        type={dialogDatas.type}
        dialogTitle={dialogDatas.title}
        dialogDescription={dialogDatas.description}
        amount={dialogDatas.amount}
        currency={dialogDatas.type === "don" ? currency : null}
      />
    </div>
  );
}
