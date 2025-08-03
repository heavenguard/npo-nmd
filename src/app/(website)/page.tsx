import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Rocket, Users, Globe, Target, ArrowRight, Satellite, GraduationCap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Satellite className="h-5 w-5" />
              <span className="text-sm font-medium">Nanosatellite Missions Design</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">NMD ASSOCIATION</h1>

            <p className="text-xl lg:text-2xl mb-8 text-blue-100 font-light italic">
              "Vers une constellation dédiée à la formation des Africains"
            </p>

            <p className="text-lg lg:text-xl mb-12 text-blue-50 max-w-3xl mx-auto leading-relaxed">
              Nous développons les compétences spatiales africaines à travers des missions pratiques et des programmes
              de formation innovants.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/mission-237">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50 font-semibold px-8 py-4 h-14 text-lg"
                >
                  Rejoignez les Missions 237
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/become-member">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 h-14 text-lg bg-transparent"
                >
                  Devenir Membre
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Notre Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Former la prochaine génération de professionnels spatiaux africains
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Formation Pratique</h3>
                <p className="text-gray-600 leading-relaxed">
                  Apprentissage hands-on avec des projets satellitaires réels pour développer l'expertise technique
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Satellite className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Missions 237</h3>
                <p className="text-gray-600 leading-relaxed">
                  Une série de missions
                  spatiales africaines consolidées en constellation, ouverte et inclusive, conçue pour servir
                  de vecteur de formation effective des Africains dans les sciences et technologies spatiales
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Impact Continental</h3>
                <p className="text-gray-600 leading-relaxed">
                  Créer un réseau de professionnels spatiaux à travers l'Afrique pour l'avancement technologique
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission 237 Highlight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 rounded-full px-4 py-2 mb-6">
                <Target className="h-4 w-4" />
                <span className="text-sm font-semibold">MISSION PHARE</span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Missions 237</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Notre première mission nanosatellitaire éducative, spécialement conçue pour l'accessibilité francophone
                et la formation pratique des Africains.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Lancement Workshop</h4>
                    <p className="text-gray-600">03 Août 2025</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Ateliers de Conception</h4>
                    <p className="text-gray-600">Août - Octobre 2025</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Rocket className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Lancement</h4>
                    <p className="text-gray-600">Q2 2026</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl mb-8">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Budget de Mission</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">200,000 EUR</p>
                    <p className="text-sm text-gray-600">Budget total</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">1,000 EUR</p>
                    <p className="text-sm text-gray-600">Contribution unitaire</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-600">250,000 FCFA</p>
                    <p className="text-sm text-gray-600">Formation par étudiant</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/mission-237">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-14">
                    En Savoir Plus
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/get-involved">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 h-14 bg-transparent"
                  >
                    Contribuer
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 flex items-center justify-center">
                <Image
                  src="/assets/logoWhiteOnBlue.png"
                  alt="NMD Association"
                  fill
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">200+</div>
              <div className="text-blue-100">Étudiants à Former</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">10</div>
              <div className="text-blue-100">Pays Africains</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">1</div>
              <div className="text-blue-100">Nanosatellite</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold mb-2">2026</div>
              <div className="text-blue-100">Année de Lancement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Rejoignez la Révolution Spatiale Africaine</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Ensemble, construisons l'avenir technologique de l'Afrique dans l'espace
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/become-member">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-14 text-lg">
                Devenir Membre
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 h-14 text-lg bg-transparent"
              >
                Nous Contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
