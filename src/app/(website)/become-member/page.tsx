"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Rocket, Globe, CheckCircle, Award, CreditCard, User } from "lucide-react"
import { setToSubCollection } from "@/functions/add-to-a-sub-collection"
import { toast } from "sonner"
import { setToCollection } from "@/functions/add-to-collection"
import Loader from "@/components/loader"
import { useAuth } from "@/context/auth-context"

export default function BecomeMemberPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    profession: "",
    motivation: "",
    agreeTerms: false,
    payYearlyMembership: false,
  })
  const [depositId, setDepositId] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const {login} = useAuth()

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
                console.log(formData)

                // Save password in localStorage
                localStorage.setItem("password", data.password);
                setPassword(data.password);

                await setToCollection("users", data.userId, {
                  uid: data.userId,
                  ...parsedFormData
                });

                toast.success("New user has been added successfully");

                // Reset form and close dialog
                setFormData({
                  name: "",
                  email: "",
                  country: "",
                  profession: "",
                  motivation: "",
                  agreeTerms: false,
                  payYearlyMembership: false
                });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = JSON.stringify({
      amount: "1",
      currentUrl: "https://organic-parakeet-7vxx96jj4p9jcpj67-3000.app.github.dev/become-member",
      product: "Membership"
    });

    try {
      setLoading(true)
      const res = await fetch("/api/pawapay/deposits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body
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
      title: "Formation Technique",
      description: "Accès aux ateliers de conception et développement de nanosatellites",
    },
    {
      icon: <Users className="h-6 w-6 text-green-600" />,
      title: "Participation aux Projets",
      description: "Participation directe aux missions spatiales éducatives",
    },
    {
      icon: <Globe className="h-6 w-6 text-purple-600" />,
      title: "Réseau Mondiale",
      description: "Connexion avec des professionnels spatiaux à travers l'Afrique et dans le monde",
    },
    {
      icon: <Award className="h-6 w-6 text-orange-600" />,
      title: "Espace Membre",
      description: "Accès à votre compte personnel avec carte de membre et autres bénéfices.",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {depositId && <Loader />}
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Devenir Membre</h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Rejoignez une communauté de passionnés africains de l'espace et de la technologie
          </p>
          <p className="text-lg text-blue-50 font-medium">
            Ouvert à tous les Africains passionnés par l'espace et la technologie
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Avantages de l'Adhésion</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
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
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Formulaire d'Adhésion</CardTitle>
              <p className="text-gray-600 text-lg">
                Remplissez ce formulaire pour rejoindre la communauté NMD ASSOCIATION
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-900 font-medium">
                      Nom Complet *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-900 font-medium">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="country" className="text-gray-900 font-medium">
                      Pays *
                    </Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, country: value })}>
                      <SelectTrigger className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Sélectionnez votre pays" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="cameroon">Cameroun</SelectItem>
                        <SelectItem value="senegal">Sénégal</SelectItem>
                        <SelectItem value="ivory-coast">Côte d'Ivoire</SelectItem>
                        <SelectItem value="mali">Mali</SelectItem>
                        <SelectItem value="burkina-faso">Burkina Faso</SelectItem>
                        <SelectItem value="niger">Niger</SelectItem>
                        <SelectItem value="chad">Tchad</SelectItem>
                        <SelectItem value="gabon">Gabon</SelectItem>
                        <SelectItem value="congo">Congo</SelectItem>
                        <SelectItem value="drc">RD Congo</SelectItem>
                        <SelectItem value="other">Autre pays africain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="profession" className="text-gray-900 font-medium">
                      Profession *
                    </Label>
                    <Input
                      id="profession"
                      type="text"
                      value={formData.profession}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Ex: Ingénieur, Étudiant, Chercheur..."
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="motivation" className="text-gray-900 font-medium">
                    Motivation *
                  </Label>
                  <Textarea
                    id="motivation"
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                    placeholder="Expliquez votre intérêt pour les sciences spatiales et ce que vous espérez apporter à la communauté..."
                    required
                  />
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mr-4">
                      <CreditCard className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Cotisation d'Adhésion</h3>
                      <p className="text-gray-600">Frais unique d'inscription</p>
                    </div>
                  </div>

                  <div className="text-center bg-white p-6 rounded-xl border-2 border-blue-200">
                    <p className="text-4xl font-bold text-blue-600 mb-2">15,000 FCFA</p>
                    <p className="text-gray-600 mb-4">~25 EUR | 29 USD</p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      <span>Compte membre inclus</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Création automatique de votre compte membre</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Accès à votre carte de membre digitale</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Possibilité de donations mensuelles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Accès aux offres exclusives membres</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.payYearlyMembership}
                    onCheckedChange={(checked) => setFormData({ ...formData, payYearlyMembership: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-gray-600 text-sm leading-relaxed">
                    Payer les frais de membership : 65500 FCFA | 100 EUR | 115 USD
                  </Label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeTerms}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
                  />
                  <Label htmlFor="terms" className="text-gray-600 text-sm leading-relaxed">
                    J'accepte les termes et conditions et la politique de confidentialité de NMD ASSOCIATION
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 h-14 text-lg"
                  disabled={!formData.agreeTerms}
                >
                  {formData.payYearlyMembership ? "M'inscrire et payer les frais annuelle de membership - 65500 FCFA | 100 EUR | 115 USD" : "M'inscrire uniquement - 15000 FCFA | 25 EUR | 29 USD"}
                  <CheckCircle className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Après Votre Inscription</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Compte Créé</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Votre compte membre est créé automatiquement avec vos identifiants de connexion
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Accès Membre</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Connectez-vous pour accéder à votre carte de membre et vos offres exclusives
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Donations Mensuelles</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Configurez vos donations mensuelles pour soutenir nos missions spatiales
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
