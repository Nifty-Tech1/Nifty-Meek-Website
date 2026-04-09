"use client";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Insights", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Admin", href: "/login" },
  ];

  const socialLinks = [
    { label: "Twitter", href: "#", icon: "𝕏" },
    { label: "GitHub", href: "#", icon: "GitHub" },
    { label: "LinkedIn", href: "#", icon: "in" },
  ];

  return (
    <footer className="relative border-t border-border-color bg-surface-light">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">NM</span>
              </div>
              <span className="font-semibold">Nifty Meek</span>
            </div>
            <p className="text-text-secondary text-sm">
              Building real systems in public. Execution over ideas.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  Case Studies
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-text-primary transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border-color pt-8">
          {/* Social Links */}
          <div className="flex gap-6 mb-6 justify-center md:justify-start">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="w-10 h-10 rounded-lg border border-border-color hover:border-accent hover:bg-accent/10 flex items-center justify-center transition-all text-sm font-medium"
                title={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-text-tertiary">
            <p>© {currentYear} Nifty Meek. All rights reserved.</p>
            <p>Crafted with precision. Built to scale.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
