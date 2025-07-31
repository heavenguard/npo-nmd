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

export default function ContactPage() {
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
      title: "Téléphone",
      details: "+237 691 341 013",
      action: "tel:+237691341013",
    },
    {
      icon: <Mail className="h-6 w-6 text-blue-600" />,
      title: "Email",
      details: "contact@npo.nanosatellitemissions.com",
      action: "mailto:contact@npo.nanosatellitemissions.com",
    },
    {
      icon: <MapPin className="h-6 w-6 text-purple-600" />,
      title: "Adresse",
      details: "Immeuble Face Agence SCB, Carrefour Express, Cité des Palmiers, Douala",
      action: null,
    },
    {
      icon: <Linkedin className="h-6 w-6 text-blue-500" />,
      title: "LinkedIn",
      details: "NMD Foundation Page",
      action: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Nous Contacter</h1>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Nous sommes là pour répondre à vos questions et discuter de votre participation à l'avenir spatial africain
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
                      className="text-gray-600 hover:text-blue-600 transition-colors leading-relaxed"
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
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Envoyez-nous un Message</CardTitle>
              <p className="text-gray-600 text-lg">Nous vous répondrons dans les plus brefs délais</p>
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

                <div>
                  <Label htmlFor="subject" className="text-gray-900 font-medium">
                    Sujet *
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Sélectionnez un sujet" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="membership">Adhésion</SelectItem>
                      <SelectItem value="mission-237">Mission 237</SelectItem>
                      <SelectItem value="partnership">Partenariat</SelectItem>
                      <SelectItem value="donation">Don / Contribution</SelectItem>
                      <SelectItem value="volunteering">Bénévolat</SelectItem>
                      <SelectItem value="general">Question générale</SelectItem>
                      <SelectItem value="media">Demande média</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-900 font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[150px]"
                    placeholder="Décrivez votre demande ou vos questions..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 h-14 text-lg"
                >
                  Envoyer le Message
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
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Heures de Bureau</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Jours Ouvrables</h3>
                <p className="text-gray-600 mb-2">Lundi - Vendredi</p>
                <p className="text-gray-600">8h00 - 17h00 (GMT+1)</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Support Email</h3>
                <p className="text-gray-600 mb-2">Réponse sous 24h</p>
                <p className="text-gray-600">7 jours sur 7</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Notre Localisation</h2>
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-8">
              <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-10 w-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Douala, Cameroun</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Immeuble Face Agence SCB
                    <br />
                    Carrefour Express
                    <br />
                    Cité des Palmiers
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
