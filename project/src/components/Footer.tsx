import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const productLinks = [
  { name: 'Features', href: '/#features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Dashboard', href: '/dashboard' },
];

const companyLinks = [
  { name: 'About', href: '/team' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

const socialLinks = [
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/in/11pranav-garg/', 
    label: 'LinkedIn',
    color: 'hover:text-[#0077b5]'
  },
  { 
    icon: Mail, 
    href: 'mailto:support@instantanalytics.com', 
    label: 'Email',
    color: 'hover:text-primary'
  }
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-border">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Transform your email campaign data into actionable insights with our powerful analytics dashboard.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-full bg-secondary text-secondary-foreground ${color} transition-colors`}
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a 
                  href="mailto:support@instantanalytics.com"
                  className="hover:text-primary transition-colors"
                >
                  support@instantanalytics.com
                </a>
              </li>
              <li>
                <a 
                  href="https://cal.com/your-calendar-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Schedule a Call
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} InstantAnalytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}