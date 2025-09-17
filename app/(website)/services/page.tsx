"use client";

import type React from "react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Target,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Building2,
  Lightbulb,
  TrendingUp,
  Award,
  Clock,
  MessageSquare,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HeroSection from "@/components/all/CommonHeroSection";

const services = [
  {
    icon: <Users className="h-8 w-8" />,
    title: "On-site & Virtual Workshops",
    description:
      "Customized training sessions delivered at your location or online, tailored to your team's specific needs and schedule.",
    features: [
      "Expert-led sessions",
      "Interactive workshops",
      "Flexible scheduling",
      "Up to 50 participants",
    ],
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Custom Curriculum Development",
    description:
      "We create bespoke training programs aligned with your business objectives and industry requirements.",
    features: [
      "Industry-specific content",
      "Skill gap analysis",
      "Learning path design",
      "Progress tracking",
    ],
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Team Skill Assessment",
    description:
      "Comprehensive evaluation of your team's current capabilities to identify strengths and areas for improvement.",
    features: [
      "Skills mapping",
      "Performance metrics",
      "Gap analysis",
      "Improvement roadmap",
    ],
  },
];

const processSteps = [
  {
    step: "1",
    title: "Discovery Call",
    description:
      "We understand your needs, challenges, and training objectives through a detailed consultation.",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    step: "2",
    title: "Custom Proposal",
    description:
      "We design a tailored training plan with specific outcomes, timeline, and investment details.",
    icon: <Lightbulb className="h-6 w-6" />,
  },
  {
    step: "3",
    title: "Training Delivery",
    description:
      "Expert-led sessions delivered with engaging content and hands-on learning experiences.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    step: "4",
    title: "Impact Reporting",
    description:
      "We measure success through assessments and provide detailed feedback on learning outcomes.",
    icon: <TrendingUp className="h-6 w-6" />,
  },
];

const caseStudies = [
  {
    company: "TechCorp Solutions",
    logo: "/client-logo-techcorp.png",
    title: "How TechCorp Increased Developer Productivity by 40%",
    description:
      "Custom full-stack development training program for 50+ developers, resulting in faster project delivery and improved code quality.",
    results: [
      "40% increase in productivity",
      "25% reduction in bugs",
      "95% employee satisfaction",
    ],
    link: "#",
  },
  {
    company: "DataFlow Analytics",
    logo: "/client-logo-dataflow.png",
    title: "Transforming Data Teams with Advanced Analytics Training",
    description:
      "Comprehensive data science and machine learning program that enabled the team to build predictive models in-house.",
    results: [
      "$2M cost savings",
      "3x faster insights",
      "100% certification rate",
    ],
    link: "#",
  },
  {
    company: "GrowthCo Marketing",
    logo: "/client-logo-growthco.png",
    title: "Digital Marketing ROI Increased by 300%",
    description:
      "Strategic digital marketing training that equipped the team with modern techniques and tools for better campaign performance.",
    results: [
      "300% ROI increase",
      "50% more qualified leads",
      "80% team retention",
    ],
    link: "#",
  },
];

const clientLogos = [
  "Microsoft",
  "Google",
  "Amazon",
  "Apple",
  "Meta",
  "Netflix",
  "Salesforce",
  "Adobe",
  "IBM",
  "Oracle",
  "Cisco",
  "Intel",
];

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    teamSize: "",
    message: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
        badgeText="What We Offer"
        title="Comprehensive Startup Solutions for Every Stage"
        description="From initial concept to market launch and beyond, our full-stack development, digital marketing, and business consulting services help startups scale efficiently and achieve sustainable growth."
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                  Empower Your Team with{" "}
                  <span className="text-primary">Corporate Training</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Customized learning solutions designed to help your
                  organization achieve its goals and stay ahead of the
                  competition.
                </p>
              </div>
              <Button size="lg" className="text-lg px-8 py-6">
                Request a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden">
                <Image
                  src="/diverse-professionals-learning-collaboratively-in-.jpg"
                  alt="Professional team in training session"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Offerings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Our Service Offerings
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive training solutions tailored to your organization's
              unique needs and objectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow"
              >
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">{service.icon}</div>
                  </div>
                  <CardTitle className="text-xl font-heading">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              How We Work
            </h2>
            <p className="text-xl text-muted-foreground">
              Our proven 4-step process ensures successful training outcomes for
              your organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">{step.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-border -translate-x-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Client Success Stories
            </h2>
            <p className="text-xl text-muted-foreground">
              See how our training programs have transformed organizations
              across industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {study.company}
                      </p>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-heading line-clamp-2">
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="leading-relaxed">
                    {study.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {study.results.map((result, resultIndex) => (
                      <div
                        key={resultIndex}
                        className="flex items-center gap-2"
                      >
                        <Award className="h-4 w-4 text-secondary" />
                        <span className="text-sm font-medium text-foreground">
                          {result}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="p-0 h-auto"
                  >
                    <Link href={study.link}>
                      Read Case Study
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Ticker */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-lg font-medium text-muted-foreground">
              Trusted by Leading Organizations
            </h3>
          </div>
          <div className="overflow-hidden">
            <div className="flex animate-scroll gap-12 items-center">
              {[...clientLogos, ...clientLogos].map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 text-2xl font-bold text-muted-foreground opacity-60"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Get a Custom Quote
            </h2>
            <p className="text-xl text-muted-foreground">
              Tell us about your training needs and we'll create a tailored
              solution for your organization.
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Label htmlFor="workEmail">Work Email *</Label>
                  <Input
                    id="workEmail"
                    type="email"
                    placeholder="your.email@company.com"
                    value={formData.workEmail}
                    onChange={(e) =>
                      handleInputChange("workEmail", e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Select
                    value={formData.teamSize}
                    onValueChange={(value) =>
                      handleInputChange("teamSize", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">What are your training needs? *</Label>
                <Textarea
                  id="message"
                  placeholder="Please describe your training objectives, current challenges, and any specific skills you'd like your team to develop..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center gap-4">
                <Button type="submit" size="lg" className="px-8">
                  Get a Custom Quote
                </Button>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>We'll respond within 24 hours</span>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}
