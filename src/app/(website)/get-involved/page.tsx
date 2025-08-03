"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign, Users, Handshake, Heart, Target, Rocket, GraduationCap, Building } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { setToCollection } from "@/functions/add-to-collection"
import { useAuth } from "@/context/auth-context"
import PaymentDialog from "@/components/payment-dialog"
import { useRouter } from "next/navigation"

export default function GetInvolvedPage() {
  const [donationAmount, setDonationAmount] = useState("")
  const [depositId, setDepositId] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [dialogDatas, setDialogDatas] = useState({
    type: "",
    title: "",
    description: "",
    amount: 0
  })
  const [isDialogOpened, setIsDialogOpened] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [amount, setAmount] = useState(15000)
  const { login } = useAuth()
  const router = useRouter()

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
            const response = await fetch(`/api/pawapay/deposits?depositId=${depositId}`);
            const data = await response.json();
            const status = data[0]?.status || data.status;
  
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
                  console.log(data)
  
                  // Save password in localStorage
                  localStorage.setItem("password", data.password);
                  setPassword(data.password);
  
                  await setToCollection("users", data.userId, {
                    uid: data.userId,
                    ...parsedFormData
                  });
  
                  toast.success("New user has been added successfully");
  
                // Clear localStorage
                localStorage.removeItem("depositId");
                localStorage.removeItem("pendingFormData");
                console.log(password)
                console.log(parsedFormData.email)
                await login(parsedFormData.email, data.password)
                setLoading(false)
                } catch (error) {
                  toast.error("Failed to create user. Please try again.",);
                }
                // Save the transaction here
                // await saveTransaction(depositId);
  
              }
  
              toast.success("Membership activated successfully!");
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
    if(option.id === "partner"){
      router.push("/contact")
    }
    else if(amount<15000 && option.type==="don"){
      toast.error("Montant minimum est de 15000 FCFA")
      return
    }
    else if (option.type === "mission") {
      setDialogDatas({
        title: "Contribution à la première mission",
        description: "Participez à notre première mission spatiale en contribuant directement à son financement.",
        amount: 655000,
        type: option.type
      });
    } 
    else if (option.type === "student") {
      setDialogDatas({
        title: "Parrainer un étudiant",
        description: "Aidez un étudiant à poursuivre ses études et à développer ses compétences dans le domaine spatial.",
        amount: 250000,
        type: option.type
      });
    } 
    else if (option.type === "don") {
      setDialogDatas({
        title: "Faire un don",
        description: "Soutenez nos projets en effectuant un don du montant de votre choix.",
        amount,
        type: option.type
      });
    }
    setIsDialogOpened(true)
  }

  const contributionOptions = [
    {
      type: "mission",
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      title: "Contribution Financière (1er MISSION 237)",
      description: "Soutenez directement notre première missions spatiales éducatives.",
      options: [
        "Unité de contribution : 650,000 FCFA | 1000 EUR",
        "Création direct d'un compte votant, vous octroyant de divers bénéfices et le droit de voter aux différente décisions éventuelle pour l'avancement de la mission.",
        "Support direct à la première mission 237",
      ],
      cta: "Faire un Don",
    },
    {
      type: "student",
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      title: "Parrainage d'Apprenants (1er MISSION 237)",
      description: "Financez la formation d'étudiants africains passionnés grace à la première mission 237",
      options: [
        "Parrainage complet: 250,000 FCFA | 385 EUR",
        "Parrainage de plusieurs étudiants",
        "Suivi personnalisé de votre filleul",
      ],
      cta: "Parrainer un Étudiant",
    },
    {
      type: "don",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "Donnation Libre",
      description: "Soutenez notre projets",
      options: ["Accès à un compte membre.", "Faire un don à partir de 15000 FCFA","Donner plus de 100,000 FCFA et devenez membre votant.", "Accès à des promotions et avantages."],
      cta: "Faire une donnation",
    },
    {
      type: "partner",
      icon: <Building className="h-8 w-8 text-orange-600" />,
      title: "Partenariat Entreprise",
      description: "Établissez un partenariat stratégique avec notre association",
      options: ["Sponsoring de missions", "Fourniture d'équipements", "Stages et emplois pour diplômés"],
      cta: "Devenir Partenaire",
    },
  ]

  const impactNumbers = [
    { number: "200+", label: "Étudiants à Former", color: "text-blue-600" },
    { number: "10", label: "Pays Africains Ciblés", color: "text-green-600" },
    { number: "1", label: "1er satellite à but éducatif en orbit", color: "text-purple-600" },
    { number: "2026", label: "Année de Lancement", color: "text-orange-600" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">S'Impliquer</h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Rejoignez-nous dans notre mission de développement des capacités spatiales africaines
          </p>
          <p className="text-lg text-blue-50 font-medium">Ensemble, construisons l'avenir technologique de l'Afrique</p>
        </div>
      </section>

      {/* Contribution Options */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Comment Contribuer</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {contributionOptions.map((option, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center">
                      {option.icon}
                    </div>
                    <CardTitle className="text-2xl text-gray-900">{option.title}</CardTitle>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{option.description}</p>
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
                  {option.type === "don" &&
                    <div className="mb-5">
                      <Label htmlFor="amount" className="text-gray-900 font-medium">
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
                  }
                  <Button onClick={() => handleClickOptionButton(option)} className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12">{option.cta}</Button>
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Prêt à Nous Rejoindre ?</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Contactez-nous pour discuter de votre contribution à l'avenir spatial africain
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-14 text-lg">
                Nous Contacter
                <Handshake className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/become-member">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 h-14 text-lg bg-transparent"
              >
                Devenir Membre
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <PaymentDialog open={isDialogOpened} setOpen={setIsDialogOpened} type={dialogDatas.type} dialogTitle={dialogDatas.title} dialogDescription={dialogDatas.description} amount={dialogDatas.amount} />
    </div>
  )
}
