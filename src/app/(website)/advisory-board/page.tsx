import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Mail, Linkedin, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdvisoryBoardPage() {
  const advisoryMembers = [
    {
      name: "Dr. Amina Hassan",
      title: "Space Systems Engineer",
      organization: "African Space Research Centre",
      image: "/professional-african-woman-space-scientist.jpg",
      bio: "Dr. Hassan brings over 15 years of experience in satellite systems design and has led multiple successful space missions across Africa. She holds a PhD in Aerospace Engineering from MIT and has been instrumental in developing space technology policies for the African Union.",
      expertise: ["Satellite Design", "Mission Planning", "Policy Development"],
      linkedin: "#",
    },
    {
      name: "Prof. Kwame Asante",
      title: "Professor of Aerospace Engineering",
      organization: "University of Ghana",
      image: "/professional-african-man-aerospace-professor.jpg",
      bio: "Professor Asante is a renowned educator and researcher with over 20 years in aerospace engineering. He has published extensively on space technology applications for sustainable development and has mentored hundreds of engineers across West Africa.",
      expertise: ["Aerospace Engineering", "Research", "Education"],
      linkedin: "#",
    },
    {
      name: "Dr. Fatima Al-Rashid",
      title: "Chief Technology Officer",
      organization: "SpaceTech Africa",
      image: "/professional-african-woman-technology-executive.jpg",
      bio: "Dr. Al-Rashid is a visionary technology leader who has successfully launched three space technology startups. She specializes in commercializing space innovations and has raised over $50M in funding for African space ventures.",
      expertise: [
        "Technology Leadership",
        "Entrepreneurship",
        "Commercialization",
      ],
      linkedin: "#",
    },
    {
      name: "Dr. Omar Benali",
      title: "Senior Space Engineer",
      organization: "European Space Agency",
      image: "/professional-middle-eastern-man-space-engineer.jpg",
      bio: "Dr. Benali has been with ESA for over 12 years, working on major missions including ExoMars and BepiColombo. He brings deep technical expertise in spacecraft systems and has been a strong advocate for international collaboration in space exploration.",
      expertise: [
        "Spacecraft Systems",
        "Mission Operations",
        "International Cooperation",
      ],
      linkedin: "#",
    },
    {
      name: "Dr. Grace Mwangi",
      title: "Director of Education",
      organization: "Kenya Space Agency",
      image: "/professional-african-woman-education-director.jpg",
      bio: "Dr. Mwangi leads educational initiatives that have trained over 1,000 students in space technology across East Africa. She is passionate about making space education accessible and has developed innovative curriculum frameworks adopted by multiple universities.",
      expertise: [
        "Space Education",
        "Curriculum Development",
        "Youth Engagement",
      ],
      linkedin: "#",
    },
    {
      name: "Dr. Thierry Mbeki",
      title: "Space Policy Advisor",
      organization: "African Development Bank",
      image: "/professional-african-man-policy-advisor.jpg",
      bio: "Dr. Mbeki advises on space technology investments and policy frameworks across Africa. He has been instrumental in securing funding for major space infrastructure projects and has deep expertise in the intersection of space technology and economic development.",
      expertise: [
        "Policy Development",
        "Investment Strategy",
        "Economic Development",
      ],
      linkedin: "#",
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

                      <div className="flex flex-wrap gap-2 mb-4">
                        {member.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
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
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs bg-transparent"
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Contact
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
