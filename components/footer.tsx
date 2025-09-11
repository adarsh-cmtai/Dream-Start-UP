import Link from "next/link"
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">E</span>
              </div>
              <span className="font-heading font-bold text-xl">EduPro</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering professionals worldwide with expert-led online training programs. Join thousands who are
              advancing their careers with us.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              {/* <Link
                href="/training"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Courses
              </Link> */}
              <Link
                href="/about"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                About Us
              </Link>
              <Link
                href="/complain"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Complain
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground">Resources</h3>
            <div className="space-y-2">
              <Link href="/blogs" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Blog
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                FAQ
              </Link>
              <Link
                href="/support"
                className="block text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Support
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>123 Learning Lane</p>
              <p>Education City, 45678</p>
              <p>support@edupro.com</p>
              <p>+1 (123) 456-7890</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2024 EduPro. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
