"use client";

import type React from "react";

import { Navigation } from "@/components/layout/website/navigation";
import { Footer } from "@/components/layout/website/footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "support@edupro.com",
    href: "mailto:support@edupro.com",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+1 (123) 456-7890",
    href: "tel:+11234567890",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Address",
    value: "123 Learning Lane, Education City, 45678",
    href: "#",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "Business Hours",
    value: "Mon-Fri, 9am - 5pm EST",
    href: "#",
  },
];

const supportTeam = [
  {
    name: "Sarah Johnson",
    role: "Customer Success Manager",
    image: "/support-team-sarah.png",
    description: "Helps with course enrollment and learning paths",
  },
  {
    name: "Michael Chen",
    role: "Technical Support Lead",
    image: "/support-team-michael.jpg",
    description: "Assists with platform and technical issues",
  },
  {
    name: "Emma Rodriguez",
    role: "Corporate Training Specialist",
    image: "/support-team-emma.png",
    description: "Handles enterprise and custom training solutions",
  },
];

const faqs = [
  {
    question: "How do I reset my password?",
    answer:
      "You can reset your password by clicking the 'Forgot Password' link on the login page. Enter your email address and we'll send you a reset link within a few minutes.",
  },
  {
    question: "Where can I find my certificate?",
    answer:
      "Once you complete a course, your certificate will be available in your dashboard under the 'Certificates' section. You can download it as a PDF or share it directly to LinkedIn.",
  },
  {
    question: "Can I get a refund for my course?",
    answer:
      "Yes, we offer a 30-day money-back guarantee for all our courses. If you're not satisfied, contact our support team within 30 days of purchase for a full refund.",
  },
  {
    question: "How do I access course materials on mobile?",
    answer:
      "Our platform is fully responsive and works on all devices. You can also download our mobile app from the App Store or Google Play for the best mobile learning experience.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", formData);
    // Reset form
    setFormData({ fullName: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We'd love to hear from you. Whether you have a question about our
            courses, pricing, or anything else, our team is ready to answer all
            your questions.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="text-2xl font-heading">
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="px-0 pb-0">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={(e) =>
                        handleInputChange("subject", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your question or concern in detail..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="p-8">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-2xl font-heading">
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    Get in touch with us through any of these channels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <div className="text-primary">{info.icon}</div>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {info.label}
                          </p>
                          {info.href && info.href !== "#" ? (
                            <Link
                              href={info.href}
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              {info.value}
                            </Link>
                          ) : (
                            <p className="text-muted-foreground">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response Times */}
              <Card className="p-6 bg-secondary/5 border-secondary/20">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="h-5 w-5 text-secondary" />
                  <h3 className="font-heading font-semibold text-foreground">
                    Quick Response Guarantee
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We typically respond to all inquiries within 2-4 hours during
                  business hours. For urgent technical issues, our support team
                  is available 24/7.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Map */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-muted-foreground">
              Located in the heart of Education City, we welcome visitors by
              appointment.
            </p>
          </div>
          <Card className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="font-medium text-foreground">Interactive Map</p>
                  <p className="text-sm text-muted-foreground">
                    123 Learning Lane, Education City, 45678
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
            Follow Us
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Stay connected and get the latest updates on courses, tips, and
            industry insights.
          </p>
          <div className="flex justify-center gap-6">
            {[
              {
                icon: <Linkedin className="h-6 w-6" />,
                href: "#",
                label: "LinkedIn",
              },
              {
                icon: <Twitter className="h-6 w-6" />,
                href: "#",
                label: "Twitter",
              },
              {
                icon: <Facebook className="h-6 w-6" />,
                href: "#",
                label: "Facebook",
              },
              {
                icon: <Youtube className="h-6 w-6" />,
                href: "#",
                label: "YouTube",
              },
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Support Team */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Meet the Support Team
            </h2>
            <p className="text-xl text-muted-foreground">
              Our dedicated team is here to help you succeed in your learning
              journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportTeam.map((member, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions. Can't find what you're looking
              for? Contact us directly.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
