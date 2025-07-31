import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Calendar, Building, User, Award, Globe, Rocket } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">À Propos de NMD ASSOCIATION</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Une organisation à but non lucratif dédiée au développement des capacités humaines dans les sciences
            spatiales africaines
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Promouvoir le développement des capacités humaines dans les sciences spatiales africaines en formant
                  une nouvelle génération de professionnels techniquement compétents à travers des missions
                  satellitaires pratiques et des opportunités d'apprentissage hands-on.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Rocket className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Vision</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Lancer une série de missions nanosatellitaires (Mission 237) pour former les Africains et créer un
                  écosystème spatial continental robuste qui contribuera au développement technologique et scientifique
                  de l'Afrique.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Organization Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Informations Organisationnelles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fondation</h3>
                <p className="text-gray-600">Juillet 2025</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Statut Légal</h3>
                <p className="text-gray-600">Organisation à but non lucratif</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Focus</h3>
                <p className="text-gray-600">Formation spatiale africaine</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Première Mission</h3>
                <p className="text-gray-600">Mission 237 - 2026</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Structure Organisationnelle</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Président</h3>
                <p className="text-blue-600 font-semibold mb-3">Dr. Ifriky TADADJEU</p>
                <p className="text-gray-600 text-sm">Leadership stratégique et vision organisationnelle</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Secrétaire Général</h3>
                <p className="text-green-600 font-semibold mb-3">Maitre Ngang NGU Fonguh</p>
                <p className="text-gray-600 text-sm">Coordination des activités et communication</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trésorier</h3>
                <p className="text-purple-600 font-semibold mb-3">Madame Stéphanie Nono</p>
                <p className="text-gray-600 text-sm">Gestion financière et budgétaire</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">Nos Valeurs Fondamentales</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600 text-sm">Nous visons l'excellence dans tous nos programmes de formation</p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600 text-sm">Nous encourageons l'innovation et la créativité technologique</p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600 text-sm">Nous croyons en la force de la collaboration continentale</p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Impact</h3>
              <p className="text-gray-600 text-sm">Nous mesurons notre succès par l'impact sur le continent</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
