import Link from "next/link";
import {
  Rocket,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

const footerLinks = {
  organization: [
    { name: "About Us", href: "/about" },
    { name: "Advisory Board", href: "/advisory-board" },
    { name: "Our Mission", href: "/about#mission" },
    { name: "Careers", href: "/careers" },
  ],
  programs: [
    { name: "Space Projects", href: "/projects" },
    { name: "Education", href: "/education" },
    { name: "Research", href: "/research" },
    { name: "Partnerships", href: "/partnerships" },
  ],
  resources: [
    { name: "News & Updates", href: "/news" },
    { name: "Events", href: "/events" },
    { name: "Publications", href: "/publications" },
    { name: "Media Kit", href: "/media" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Donate", href: "/donate" },
    { name: "Volunteer", href: "/volunteer" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "YouTube", href: "#", icon: Youtube },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
                <Rocket className="h-4 w-4 text-foreground" />
              </div>
              <span className="text-xl font-bold">NPO NMD</span>
            </Link>
            <p className="text-background/80 mb-6 max-w-sm">
              Advancing space initiatives across Africa through innovation,
              education, and collaboration.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@nponmd.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="font-semibold mb-4">Organization</h3>
            <ul className="space-y-2">
              {footerLinks.organization.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              {footerLinks.programs.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/80 hover:text-background transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                className="text-background/60 hover:text-background transition-colors"
                aria-label={social.name}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-background/60">
            <span>© 2024 NPO NMD. All rights reserved.</span>
            <div className="flex gap-4">
              <Link
                href="/privacy"
                className="hover:text-background transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-background transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
