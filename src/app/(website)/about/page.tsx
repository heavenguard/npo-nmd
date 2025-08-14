import { Card, CardContent } from "@/components/ui/card"
import { useTranslations } from "@/lib/useTranslations"
import { Users, Target, Calendar, Building, User, Award, Globe, Rocket } from "lucide-react"

export default function AboutPage() {
  const t = useTranslations('about')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">{t('hero.title')}</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            {t('hero.description')}
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('mission.title')}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {t('mission.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-10">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                  <Rocket className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('vision.title')}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {t('vision.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Organization Details */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{t('organizationInfo.title')}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('organizationInfo.founded')}</h3>
                <p className="text-gray-600">{t('organizationInfo.foundedDate')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('organizationInfo.legalStatus')}</h3>
                <p className="text-gray-600">{t('organizationInfo.legalStatusValue')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('organizationInfo.focus')}</h3>
                <p className="text-gray-600">{t('organizationInfo.focusValue')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('organizationInfo.firstMission')}</h3>
                <p className="text-gray-600">{t('organizationInfo.firstMissionValue')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{t('leadership.title')}</h2>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('leadership.president')}</h3>
                <p className="text-blue-600 font-semibold mb-3">Dr. Ifriky TADADJEU</p>
                <p className="text-gray-600 text-sm">{t('leadership.presidentRole')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('leadership.secretaryGeneral')}</h3>
                <p className="text-green-600 font-semibold mb-3">Maitre Ngang NGU Fonguh</p>
                <p className="text-gray-600 text-sm">{t('leadership.secretaryGeneralRole')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <User className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('leadership.treasurer')}</h3>
                <p className="text-purple-600 font-semibold mb-3">Madame Stéphanie Nono</p>
                <p className="text-gray-600 text-sm">{t('leadership.treasurerRole')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-16">{t('values.title')}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('values.excellence.title')}</h3>
              <p className="text-gray-600 text-sm">{t('values.excellence.description')}</p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('values.innovation.title')}</h3>
              <p className="text-gray-600 text-sm">{t('values.innovation.description')}</p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('values.collaboration.title')}</h3>
              <p className="text-gray-600 text-sm">{t('values.collaboration.description')}</p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('values.impact.title')}</h3>
              <p className="text-gray-600 text-sm">{t('values.impact.description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
