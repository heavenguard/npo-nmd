import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useTranslations } from "@/lib/useTranslations"
import { Calendar, DollarSign, Users, Rocket, Target, Clock, BookOpen, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Mission237Page() {
  const t = useTranslations('mission237')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Rocket className="h-4 w-4" />
                <span className="text-sm font-medium">{t('hero.tag')}</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">{t('hero.title')}</h1>
              <p className="text-2xl text-blue-100 font-light mb-6">
                {t('hero.subtitle')}
              </p>
              <p className="text-lg text-blue-50 mb-10 leading-relaxed">
                {t('hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/become-member">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 h-14 text-lg">
                    {t('hero.joinButton')}
                    <Rocket className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/get-involved">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 h-14 text-lg bg-transparent"
                  >
                    {t('hero.contributeButton')}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl p-8 flex items-center justify-center">
                <Image
                  src="/assets/spaceAfrica.jpeg"
                  alt="Mission 237 Nanosatellite"
                  fill
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{t('timeline.title')}</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white relative overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    {t('timeline.steps.1.step')}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('timeline.steps.1.title')}</h3>
                <p className="text-3xl font-bold text-blue-600 mb-4">{t('timeline.steps.1.date')}</p>
                <p className="text-gray-600 leading-relaxed">
                  {t('timeline.steps.1.description')}
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
                    {t('timeline.steps.2.step')}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('timeline.steps.2.title')}</h3>
                <p className="text-3xl font-bold text-green-600 mb-4">{t('timeline.steps.2.date')}</p>
                <p className="text-gray-600 leading-relaxed">
                  {t('timeline.steps.2.description')}
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
                    {t('timeline.steps.3.step')}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('timeline.steps.3.title')}</h3>
                <p className="text-3xl font-bold text-purple-600 mb-4">{t('timeline.steps.3.date')}</p>
                <p className="text-gray-600 leading-relaxed">
                  {t('timeline.steps.3.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Budget Breakdown */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{t('budget.title')}</h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100 mb-8">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{t('budget.total')}</h3>
                  <p className="text-4xl font-bold text-blue-600 mb-2">200,000 EUR</p>
                  <p className="text-xl text-gray-600">(131,191,400 FCFA)</p>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{t('budget.contributionUnit.label')}</span>
                    <span className="text-blue-600 font-bold text-lg">1,000 EUR</span>
                  </div>
                  <p className="text-gray-600 text-sm">{t('budget.contributionUnit.description')}</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">{t('budget.training.label')}</span>
                    <span className="text-green-600 font-bold text-lg">250,000 FCFA</span>
                  </div>
                  <p className="text-gray-600 text-sm">{t('budget.training.description')}</p>
                </div>
              </div>
            </div>

            <div className="relative w-full h-full">
              <Image
                src="/assets/logoWhiteOnBlue.png"
                alt="NMD Association"
                fill
                className="rounded-2xl object-cover"
              />
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
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{t('objectives.title')}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{t('objectives.items.1.title')}</h3>
                <p className="text-gray-600 text-sm">{t('objectives.items.1.description')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{t('objectives.items.2.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('objectives.items.2.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{t('objectives.items.3.title')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('objectives.items.3.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{t('objectives.items.4.title')}</h3>
                <p className="text-gray-600 text-sm">{t('objectives.items.4.description')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            {t('cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/become-member">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-14 text-lg">
                {t('cta.buttons.contribute')}
                <DollarSign className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/become-member">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 h-14 text-lg bg-transparent"
              >
                {t('cta.buttons.becomeParticipant')}
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
