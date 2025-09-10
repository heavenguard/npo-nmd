import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Linkedin, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdvisoryBoardPage() {
  const advisoryMembers = [
    {
      name: "Prof Jordi Puig-Suari",
      title: "Head of Advisory board",
      organization: "",
      image: "/assets/jordi.jpg",
      bio: "Dr. Puig-Suari received B.S., M.S., and Ph.D. Degrees in Aeronautics and Astronautics from Purdue University. Dr.Puig-Suari is a professor in the Aerospace Engineering Department at CalPoly, San Luis Obispo.\n\nIn 1999, Dr Puig-Suari and Prof. Bob Twiggs at Stanford developed the CubeSat standard. Dr. Puig-Suari’s teamwas responsible for the development of the standard CubeSat deployer (the P-POD) and has supported launches forover 130 CubeSats in the U.S. and abroad.\n\nIn 2011, Dr. Puig-Suari co-founded Tyvak Nano-satellite Systems to support the commercial CubeSat market.",
      expertise: ["Satellite Design", "Mission Planning", "Policy Development"],
      linkedin: "https://www.linkedin.com/in/jordi-puig-suari-44428a9",
    },
    {
      name: "Prof Robert van Zyl",
      title: "Member of Advisory board",
      organization: "AAC Space Africa",
      image: "/assets/robert.jpg",
      bio: "As the founding Director of the Satellite Programme at CPUT I spearheaded the nanosatellite industry in South Africa (and Africa). Under my leadership the group developed Africa’s first nanosatellite, ZACube-1, that has been launched into space on 21 November 2013. CPUT has since launched its second nanosatellite, ZACube-2, in 2019 and a mini-constellation of three satellites in 2022. The CPUT Satellite Programme has made a significant contribution to human capacity development and community awareness in the national and regional space industries.",
      expertise: ["Satellite Design", "Mission Planning", "Policy Development"],
      linkedin: "https://www.linkedin.com/in/robert-van-zyl-8b78624/",
    },
    {
      name: "Prof Laurent Dusseau",
      title: "Member of Advisory board",
      organization: "Centre spatial de l’université de Montpellier (CSUM)",
      image: "/assets/laurent.jpg",
      bio: "Le professeur d’université sétois est le père du Centre spatial de l’université de Montpellier (CSUM), qu’il dirige, ainsi que la fondation qui lui est associée. Avec ses étudiants, ses ingénieurs, cet homme de 56 ans, affable, féru de technologies a conquis une parcelle d’espace grâce à ses nanosatellites.",
      expertise: ["Nanosatellites", "Mission Planning", "Policy Development"],
      linkedin:
        "https://digitalmag.ci/pr-laurent-dusseau-universite-de-montpelier-avec-les-satellites-on-peut-faire-emerger-un-tissu-dinnovations-en-cote-divoire/",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">Expert Guidance</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Advisory Board
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            Our distinguished advisory board brings together leading experts in
            space technology, education, and policy from across Africa and
            beyond, providing strategic guidance to advance our mission.
          </p>
        </div>
      </section>

      {/* Advisory Board Members */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Meet Our Advisors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry leaders and visionaries who guide our strategic direction
              and ensure we deliver world-class space technology education.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {advisoryMembers.map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg bg-white hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {member.name}
                      </h3>
                      <p className="text-blue-600 font-semibold mb-1">
                        {member.title}
                      </p>
                      <p className="text-gray-600 text-sm mb-4">
                        {member.organization}
                      </p>

                      {/* <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div> */}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mt-6">
                    {member.bio}
                  </p>

                  <div className="flex items-center gap-3 mt-6">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs bg-transparent"
                    >
                      <Linkedin className="h-3 w-3 mr-1" />
                      LinkedIn
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            Interested in contributing your expertise to Africa's space
            technology future? We're always looking for passionate advisors and
            mentors.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 h-14 text-lg"
              >
                Get Involved
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 h-14 text-lg bg-transparent"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
