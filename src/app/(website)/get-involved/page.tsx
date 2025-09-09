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
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [amount, setAmount] = useState(15000);
  const { login } = useAuth();
  const router = useRouter();
  const t = useTranslations("getInvolved");
  const s = useTranslations();

  useEffect(() => {
    const savedDepositId = localStorage.getItem("depositId");
    console.log(savedDepositId);
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
    } else if (amount < 15000 && option.type === "don") {
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
      type: "mission",
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      title: t("howToContribute.financialContribution.title"),
      description: t("howToContribute.financialContribution.description"),
      options: [
        t("howToContribute.financialContribution.options.1"),
        t("howToContribute.financialContribution.options.2"),
        t("howToContribute.financialContribution.options.3"),
      ],
      cta: t("howToContribute.financialContribution.description"),
    },
    {
      type: "student",
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      title: t("howToContribute.studentSponsorship.title"),
      description: t("howToContribute.studentSponsorship.description"),
      options: [
        t("howToContribute.studentSponsorship.options.1"),
        t("howToContribute.studentSponsorship.options.2"),
        t("howToContribute.studentSponsorship.options.3"),
      ],
      cta: t("howToContribute.studentSponsorship.cta"),
    },
    {
      type: "don",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: t("howToContribute.donation.title"),
      description: t("howToContribute.donation.description"),
      options: [
        t("howToContribute.donation.options.1"),
        t("howToContribute.donation.options.2"),
        t("howToContribute.donation.options.3"),
      ],
      cta: t("howToContribute.donation.cta"),
    },
    {
      type: "partner",
      icon: <Building className="h-8 w-8 text-orange-600" />,
      title: t("howToContribute.corporatePartnership.title"),
      description: t("howToContribute.corporatePartnership.description"),
      options: [
        t("howToContribute.corporatePartnership.options.1"),
        t("howToContribute.corporatePartnership.options.2"),
        t("howToContribute.corporatePartnership.options.3"),
      ],
      cta: t("howToContribute.corporatePartnership.cta"),
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

      {/* Contribution Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            {t("howToContribute.title")}
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {contributionOptions.map((option, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                      {option.icon}
                    </div>
                    <CardTitle className="text-2xl text-gray-900">
                      {option.title}
                    </CardTitle>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {option.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {option.options.map((opt, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <Target className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{opt}</span>
                      </li>
                    ))}
                  </ul>
                  {option.type === "don" && (
                    <div className="mb-5">
                      <Label
                        htmlFor="amount"
                        className="text-gray-900 font-medium"
                      >
                        Montant (FCFA)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        value={amount}
                        min={15000}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                        className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Min: 15000"
                      />
                    </div>
                  )}
                  <Button
                    onClick={() => handleClickOptionButton(option)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
                  >
                    {option.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Avantages du Partenariat</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Rocket className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Visibilité</h3>
                <p className="text-gray-600 leading-relaxed">
                  Logo sur le satellite et reconnaissance dans toutes nos communications
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Talents</h3>
                <p className="text-gray-600 leading-relaxed">
                  Accès prioritaire aux diplômés formés pour vos recrutements
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Impact Social</h3>
                <p className="text-gray-600 leading-relaxed">
                  Contribution directe au développement technologique africain
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

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
      />
    </div>
  );
}
