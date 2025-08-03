import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign, Users, Rocket, Target, Clock, BookOpen, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Mission237Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Rocket className="h-4 w-4" />
                <span className="text-sm font-medium">MISSION PHARE</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">Première Mission 237</h1>
              <p className="text-2xl text-blue-100 font-light mb-6">
                Notre Première Mission Nanosatellitaire Éducative
              </p>
              <p className="text-lg text-blue-50 mb-10 leading-relaxed">
                La première Mission 237 est spécialement conçue pour l'accessibilité francophone et la formation pratique des
                professionnels spatiaux africains. Cette mission pionnière établira les fondations de notre
                constellation éducative.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/become-member">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 h-14 text-lg">
                    Rejoindre la Mission
                    <Rocket className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/get-involved">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 h-14 text-lg bg-transparent"
                  >
                    Contribuer au Projet
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Mission 237 Nanosatellite"
                  width={400}
                  height={400}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Chronologie de la Mission</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white relative overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    ETAPE 1
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Lancement Workshop</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">03 Août 2025</p>
                <p className="text-gray-600 leading-relaxed">
                  Atelier de lancement officiel de la Mission 237 avec présentation du projet, formation des équipes et
                  définition des objectifs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white relative overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    ETAPE 2
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ateliers de Conception</h3>
                <p className="text-3xl font-bold text-green-600 mb-4">Août - Oct 2025</p>
                <p className="text-gray-600 leading-relaxed">
                  Série d'ateliers intensifs de conception et de la mission, et les formations en conception des missions spatiales.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white relative overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                    <Rocket className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                    ETAPE 3
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Lancement</h3>
                <p className="text-3xl font-bold text-purple-600 mb-4">Q2 2026</p>
                <p className="text-gray-600 leading-relaxed">
                  Lancement du satellite de la première Mission 237 et début des opérations spatiales éducatives.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Budget Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Budget de la Mission</h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 mb-8">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Budget Total</h3>
                  <p className="text-4xl font-bold text-blue-600 mb-2">200,000 EUR</p>
                  <p className="text-xl text-gray-600">(131,191,400 FCFA)</p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Contribution Unitaire</span>
                    <span className="text-blue-600 font-bold text-lg">1,000 EUR</span>
                  </div>
                  <p className="text-gray-600 text-sm">655,000 FCFA par participant</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">Formation Design</span>
                    <span className="text-green-600 font-bold text-lg">250,000 FCFA</span>
                  </div>
                  <p className="text-gray-600 text-sm">Par étudiant pour la formation technique</p>
                </div>
              </div>
            </div>

            {/* <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Répartition Budgétaire</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700 font-medium">Développement Satellite</span>
                    <span className="font-semibold text-gray-900">40%</span>
                  </div>
                  <Progress value={40} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700 font-medium">Formation & Ateliers</span>
                    <span className="font-semibold text-gray-900">25%</span>
                  </div>
                  <Progress value={25} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700 font-medium">Lancement</span>
                    <span className="font-semibold text-gray-900">20%</span>
                  </div>
                  <Progress value={35} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700 font-medium">Opérations</span>
                    <span className="font-semibold text-gray-900">10%</span>
                  </div>
                  <Progress value={10} className="h-3" />
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-700 font-medium">Administration</span>
                    <span className="font-semibold text-gray-900">5%</span>
                  </div>
                  <Progress value={5} className="h-3" />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Mission Objectives */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Objectifs de la Mission</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Formation Pratique</h3>
                <p className="text-gray-600 text-sm">Former 200+ professionnels africains aux technologies spatiales</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Accessibilité</h3>
                <p className="text-gray-600 text-sm">
                  Priorité francophone pour l'inclusion des pays d'Afrique de l'Ouest et Centrale
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600 text-sm">
                  Développer des solutions spatiales adaptées aux besoins africains
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Durabilité</h3>
                <p className="text-gray-600 text-sm">Créer un modèle reproductible pour futures missions éducatives</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Contribuez ou Parrainez un Apprenant</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Votre contribution permettra de former la prochaine génération d'ingénieurs spatiaux africains
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/become-member">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-14 text-lg">
                Contribuez à la mission
                <DollarSign className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/become-member">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 h-14 text-lg bg-transparent"
              >
                Devenir Participant
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
