"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Upload, CheckCircle, MessageSquare, Shield, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const complaintCategories = [
  "Technical Issue (e.g., website bug, video not playing)",
  "Course Content (e.g., incorrect information, outdated material)",
  "Instructor Conduct",
  "Billing or Payment Issue",
  "General Feedback",
  "Other",
]

const processSteps = [
  {
    step: "1",
    title: "Submission Received",
    description: "You will receive an automated email with a ticket number confirming we have your complaint.",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    step: "2",
    title: "Internal Review",
    description:
      "Our dedicated team will review your submission and assign it to the correct department within 24 hours.",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    step: "3",
    title: "Resolution & Follow-up",
    description: "We will investigate the issue and contact you with a resolution or update within 3-5 business days.",
    icon: <CheckCircle className="h-5 w-5" />,
  },
]

export default function ComplainPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    category: "",
    subject: "",
    description: "",
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Complaint submitted:", formData, files)
    setIsSubmitted(true)
    // Reset form
    setFormData({ fullName: "", email: "", category: "", subject: "", description: "" })
    setFiles([])
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-foreground mb-4">Complaint Submitted Successfully</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for bringing this to our attention. We've received your complaint and will review it promptly.
            </p>
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <p className="text-sm text-muted-foreground mb-2">Your ticket number:</p>
              <p className="text-2xl font-bold text-primary">
                #EDU-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <p className="text-muted-foreground mb-8">
              You will receive an email confirmation shortly. We'll contact you within 3-5 business days with an update.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Page Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
            Submit a Complaint or Report an Issue
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We are committed to providing a high-quality learning experience. Please use this form to report any issues,
            and we will address them promptly.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-2xl font-heading">Complaint Submission Form</CardTitle>
              <CardDescription>
                Please provide as much detail as possible to help us understand and resolve your issue quickly.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
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
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Complaint Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">What is this about? *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {complaintCategories.map((category, index) => (
                        <SelectItem key={index} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject Line */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Line *</Label>
                  <Input
                    id="subject"
                    placeholder="Brief summary of the issue"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    required
                  />
                </div>

                {/* Detailed Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Please describe the issue in detail. Include any relevant links, course names, or steps to reproduce the problem."
                    rows={6}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="files">Attach Files (Screenshots, Documents)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here, or click to select files
                    </p>
                    <Input
                      id="files"
                      type="file"
                      multiple
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById("files")?.click()}
                      className="bg-transparent"
                    >
                      Choose Files
                    </Button>
                    {files.length > 0 && (
                      <div className="mt-4 text-left">
                        <p className="text-sm font-medium text-foreground mb-2">Selected files:</p>
                        {files.map((file, index) => (
                          <p key={index} className="text-xs text-muted-foreground">
                            {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Supported formats: JPG, PNG, PDF, DOC, DOCX. Max file size: 10MB each.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Submit Complaint
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resolution Process */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Our Resolution Process</h2>
            <p className="text-xl text-muted-foreground">
              Here's what happens after you submit your complaint and what you can expect from us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">{step.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-border -translate-x-1/2"></div>
                  )}
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative Contact for Urgent Issues */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="border-destructive/20 bg-destructive/5">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <AlertDescription className="text-foreground">
              <strong className="font-semibold">For Urgent Matters:</strong> If you're experiencing critical issues like
              account access problems or payment failures, please contact us directly at{" "}
              <Link href="mailto:support@edupro.com" className="text-primary hover:underline">
                support@edupro.com
              </Link>{" "}
              or call{" "}
              <Link href="tel:+11234567890" className="text-primary hover:underline">
                +1 (123) 456-7890
              </Link>{" "}
              for immediate assistance.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Commitment to You</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At EduPro, we take all feedback and complaints seriously. We are dedicated to ensuring a fair, respectful,
              and professional environment for all our learners and instructors. Your input helps us improve our
              platform and services continuously.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Info className="h-4 w-4" />
              <span>All complaints are handled confidentially and professionally</span>
            </div>
          </Card>
        </div>
      </section>

      {/* Helpful Links */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Related Resources</h2>
            <p className="text-muted-foreground">
              Before submitting a complaint, you might find answers in these helpful resources.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-lg mb-2">Terms of Service</h3>
              <p className="text-muted-foreground text-sm mb-4">Review our terms and conditions for platform usage.</p>
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href="#">Read Terms</Link>
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-lg mb-2">Community Guidelines</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Learn about our community standards and expectations.
              </p>
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href="#">View Guidelines</Link>
              </Button>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <MessageSquare className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-lg mb-2">FAQ</h3>
              <p className="text-muted-foreground text-sm mb-4">Find answers to frequently asked questions.</p>
              <Button variant="outline" size="sm" asChild className="bg-transparent">
                <Link href="/contact#faq">Browse FAQ</Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
