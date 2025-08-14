"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock, Send, Linkedin } from "lucide-react"
import { useTranslations } from "@/lib/useTranslations"

export default function ContactPage() {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
  }

  const contactInfo = [
    {
      icon: <Phone className="h-6 w-6 text-green-600" />,
      title: t('contactInfo.phone'),
      details: "+237 691 341 013",
      action: "tel:+237691341013",
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: t('contactInfo.email'),
      details: "contact@npo.nanosatellitemissions.com",
      action: "mailto:contact@npo.nanosatellitemissions.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      title: t('contactInfo.address'),
      details: "Immeuble Face Agence SCB, Carrefour Express, Cité des Palmiers, Douala",
      action: null,
    },
    {
      icon: <Linkedin className="h-6 w-6 text-blue-500" />,
      title: t('contactInfo.linkedin'),
      details: "NMD Foundation Page",
      action: "https://cm.linkedin.com/company/nanosatellitemissions",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">{t('hero.title')}</h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            {t('hero.description')}
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-0 shadow-lg text-center bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{info.title}</h3>
                  {info.action ? (
                    <a
                      href={info.action}
                      className="text-gray-600 hover:text-blue-600 transition-colors leading-relaxed break-words"
                    >
                      {info.details}
                    </a>
                  ) : (
                    <p className="text-gray-600 leading-relaxed">{info.details}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <Card className="border-0 shadow-lg bg-white">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">{t('form.title')}</CardTitle>
              <p className="text-gray-600 text-lg">{t('form.description')}</p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-900 font-medium">
                      {t('form.fullName')} *
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
                      {t('form.email')} *
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

                <div>
                  <Label htmlFor="subject" className="text-gray-900 font-medium">
                    {t('form.subject')} *
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder={t('form.selectSubject')} />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="membership">{t('form.membership')}</SelectItem>
                      <SelectItem value="mission-237">{t('form.mission237')}</SelectItem>
                      <SelectItem value="partnership">{t('form.partnership')}</SelectItem>
                      <SelectItem value="donation">{t('form.donation')}</SelectItem>
                      <SelectItem value="volunteering">{t('form.volunteering')}</SelectItem>
                      <SelectItem value="general">{t('form.general')}</SelectItem>
                      <SelectItem value="media">{t('form.media')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-900 font-medium">
                    {t('form.message')} *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[150px]"
                    placeholder={t('form.messagePlaceholder')}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 h-14 text-lg"
                >
                  {t('form.sendMessage')}
                  <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office Hours */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">{t('officeHours.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('officeHours.businessDays.title')}</h3>
                <p className="text-gray-600 mb-2">{t('officeHours.businessDays.days')}</p>
                <p className="text-gray-600">{t('officeHours.businessDays.hours')}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('officeHours.emailSupport.title')}</h3>
                <p className="text-gray-600 mb-2">{t('officeHours.emailSupport.response')}</p>
                <p className="text-gray-600">{t('officeHours.emailSupport.availability')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">{t('location.title')}</h2>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-8">
              <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('location.city')}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {t('location.address')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
