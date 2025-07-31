"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { User, CreditCard, Gift, Calendar, DollarSign, Download, Settings, LogOut, Heart } from "lucide-react"

export default function MemberPortalPage() {
  const [monthlyDonation, setMonthlyDonation] = useState("10000")

  // Mock member data
  const memberData = {
    name: "Jean Dupont",
    email: "jean.dupont@email.com",
    memberNumber: "NMD-2025-001",
    joinDate: "15 Janvier 2025",
    country: "Cameroun",
    profession: "Ingénieur Logiciel",
    status: "Actif",
  }

  const memberOffers = [
    {
      title: "Formation Nanosatellite Avancée",
      description: "Atelier intensif de 3 jours sur la conception de nanosatellites",
      date: "15-17 Mars 2025",
      status: "Disponible",
      type: "Formation",
    },
    {
      title: "Webinaire: Technologies Spatiales Africaines",
      description: "Conférence en ligne avec des experts du secteur spatial",
      date: "28 Février 2025",
      status: "Inscrit",
      type: "Webinaire",
    },
    {
      title: "Mission 237 - Phase Beta",
      description: "Participation à la phase de test du nanosatellite Mission 237",
      date: "Avril 2025",
      status: "En attente",
      type: "Projet",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Espace Membre</h1>
                <p className="text-gray-600">Bienvenue, {memberData.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Member Card */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-blue-800 text-white">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-1">{memberData.name}</h2>
                  <p className="text-blue-100">{memberData.profession}</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-blue-100">Numéro membre:</span>
                    <span className="font-semibold">{memberData.memberNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Membre depuis:</span>
                    <span className="font-semibold">{memberData.joinDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Pays:</span>
                    <span className="font-semibold">{memberData.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Statut:</span>
                    <Badge className="bg-green-500 text-white">{memberData.status}</Badge>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-white text-blue-600 hover:bg-blue-50">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger la Carte
                </Button>
              </CardContent>
            </Card>

            {/* Monthly Donation */}
            <Card className="border-0 shadow-lg bg-white mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  Donation Mensuelle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="monthly-amount" className="text-gray-900 font-medium">
                      Montant mensuel (FCFA)
                    </Label>
                    <Input
                      id="monthly-amount"
                      type="number"
                      value={monthlyDonation}
                      onChange={(e) => setMonthlyDonation(e.target.value)}
                      className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Prochaine donation: 1er Mars 2025</p>
                    <p>Total donné: 50,000 FCFA</p>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Mettre à Jour
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Member Offers */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Gift className="h-5 w-5 mr-2 text-purple-600" />
                  Mes Offres Exclusives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {memberOffers.map((offer, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{offer.title}</h3>
                          <p className="text-gray-600 text-sm">{offer.description}</p>
                        </div>
                        <Badge
                          className={
                            offer.status === "Disponible"
                              ? "bg-green-100 text-green-800"
                              : offer.status === "Inscrit"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {offer.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {offer.date}
                          </div>
                          <Badge variant="outline">{offer.type}</Badge>
                        </div>
                        <Button
                          size="sm"
                          className={
                            offer.status === "Disponible"
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : offer.status === "Inscrit"
                                ? "bg-gray-100 text-gray-600"
                                : "bg-yellow-100 text-yellow-800"
                          }
                          disabled={offer.status !== "Disponible"}
                        >
                          {offer.status === "Disponible"
                            ? "S'inscrire"
                            : offer.status === "Inscrit"
                              ? "Inscrit"
                              : "En attente"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-gray-900">Actions Rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-blue-50 text-blue-700 hover:bg-blue-100">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Faire une Donation Ponctuelle
                  </Button>
                  <Button className="w-full justify-start bg-green-50 text-green-700 hover:bg-green-100">
                    <Gift className="h-4 w-4 mr-2" />
                    Parrainer un Étudiant
                  </Button>
                  <Button className="w-full justify-start bg-purple-50 text-purple-700 hover:bg-purple-100">
                    <User className="h-4 w-4 mr-2" />
                    Mettre à Jour mon Profil
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="text-gray-900">Statistiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Formations suivies</span>
                    <span className="font-semibold text-gray-900">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Étudiants parrainés</span>
                    <span className="font-semibold text-gray-900">2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total donations</span>
                    <span className="font-semibold text-gray-900">50,000 FCFA</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Niveau membre</span>
                    <Badge className="bg-blue-100 text-blue-800">Standard</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
