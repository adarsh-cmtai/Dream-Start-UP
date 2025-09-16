import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from "@/components/ui/accordion";
import {
  Search,
  BookOpen,
  CreditCard,
  Settings,
  Users,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { Navigation } from "@/components/layout/website/navigation";
import { Footer } from "@/components/layout/website/footer";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Find quick answers to common questions about our platform and
              courses
            </p>

            {/* FAQ Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search frequently asked questions..."
                className="pl-12 py-4 text-lg bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <Badge
              variant="secondary"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              Getting Started
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              Courses & Learning
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              Billing & Payments
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              Certificates
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              Technical Issues
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
            >
              Account Management
            </Badge>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="general" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8">
              <TabsTrigger value="general" className="text-xs md:text-sm">
                General
              </TabsTrigger>
              <TabsTrigger value="courses" className="text-xs md:text-sm">
                Courses
              </TabsTrigger>
              <TabsTrigger value="billing" className="text-xs md:text-sm">
                Billing
              </TabsTrigger>
              <TabsTrigger value="technical" className="text-xs md:text-sm">
                Technical
              </TabsTrigger>
              <TabsTrigger value="certificates" className="text-xs md:text-sm">
                Certificates
              </TabsTrigger>
              <TabsTrigger value="account" className="text-xs md:text-sm">
                Account
              </TabsTrigger>
            </TabsList>

            {/* General Questions */}
            <TabsContent value="general">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <HelpCircle className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-2xl font-bold">General Questions</h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem
                      value="item-1"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        What is this training platform and how does it work?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our platform is an online learning ecosystem designed
                        for professional development. You can browse courses,
                        enroll in programs, learn at your own pace, and earn
                        industry-recognized certificates. All courses are taught
                        by expert instructors with real-world experience.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-2"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Who are the instructors and what are their
                        qualifications?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our instructors are industry professionals with 10+
                        years of experience in their respective fields. They
                        include senior engineers from top tech companies,
                        certified project managers, data scientists, and digital
                        marketing experts. All instructors undergo a rigorous
                        vetting process.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-3"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        What makes your platform different from other online
                        learning sites?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We focus specifically on career advancement with
                        practical, hands-on projects. Our courses are updated
                        regularly to reflect industry trends, include 1-on-1
                        mentorship opportunities, and provide job placement
                        assistance. We also offer corporate training solutions.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-4"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Do you offer any free courses or trial periods?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes! We offer several free introductory courses and a
                        7-day free trial for premium subscriptions. You can also
                        preview the first lesson of any paid course before
                        enrolling.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="item-5"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Is there a mobile app available?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Currently, our platform is optimized for web browsers on
                        all devices. A dedicated mobile app is in development
                        and will be available in Q2 2024. You can access all
                        features through your mobile browser in the meantime.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Course Questions */}
            <TabsContent value="courses">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <BookOpen className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-2xl font-bold">Courses & Learning</h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem
                      value="course-1"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        How long do I have access to a course after enrollment?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Once you enroll in a course, you have lifetime access to
                        all course materials, including future updates. You can
                        learn at your own pace and revisit content anytime.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="course-2"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Can I download course videos for offline viewing?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, premium subscribers can download videos for offline
                        viewing through our web platform. Downloaded content is
                        available for 30 days and requires periodic online
                        verification.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="course-3"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        What if I'm not satisfied with a course?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We offer a 30-day money-back guarantee for all courses.
                        If you're not satisfied within the first 30 days,
                        contact our support team for a full refund.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="course-4"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Do courses have deadlines or can I learn at my own pace?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Most courses are self-paced with no deadlines. However,
                        some specialized programs and cohort-based courses have
                        structured timelines. This is clearly indicated in the
                        course description.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="course-5"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Are there prerequisites for advanced courses?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, advanced courses list recommended prerequisites in
                        their descriptions. We also provide skill assessments to
                        help you determine if you're ready for a particular
                        course level.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Billing Questions */}
            <TabsContent value="billing">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <CreditCard className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-2xl font-bold">Billing & Payments</h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem
                      value="billing-1"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        What payment methods do you accept?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We accept all major credit cards (Visa, MasterCard,
                        American Express), PayPal, and bank transfers. For
                        corporate accounts, we also accept purchase orders and
                        wire transfers.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="billing-2"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Can I get a refund if I cancel my subscription?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Subscription refunds are prorated based on unused time.
                        Individual course purchases have a 30-day money-back
                        guarantee. Contact support for specific refund requests.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="billing-3"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Do you offer student or bulk discounts?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes! Students with valid .edu email addresses get 50%
                        off. We offer volume discounts for teams of 5+ people
                        and special pricing for educational institutions.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="billing-4"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        How do I update my payment information?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Go to Account Settings &gt; Billing to update your
                        payment method. Changes take effect immediately for
                        future charges.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="billing-5"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Can I pause my subscription temporarily?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, you can pause your subscription for up to 3 months
                        per year. Your access will be suspended during the pause
                        period, but your progress will be saved.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Technical Questions */}
            <TabsContent value="technical">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Settings className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-2xl font-bold">Technical Support</h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem
                      value="tech-1"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        What are the system requirements for the platform?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our platform works on any modern web browser (Chrome,
                        Firefox, Safari, Edge). You need a stable internet
                        connection (minimum 5 Mbps for video streaming) and
                        JavaScript enabled.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="tech-2"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Why are videos not playing or buffering constantly?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        This is usually due to slow internet connection. Try
                        lowering video quality, clearing browser cache, or
                        switching to a different network. Contact support if
                        issues persist.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="tech-3"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        I'm having trouble logging in to my account
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Try resetting your password using the "Forgot Password"
                        link. Clear your browser cookies and cache. If you're
                        still having issues, contact our support team with your
                        registered email address.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="tech-4"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Can I access the platform from multiple devices?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, you can access your account from unlimited devices.
                        Your progress syncs automatically across all devices.
                        However, simultaneous streaming is limited to 2 devices
                        per account.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="tech-5"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Is my personal data secure on your platform?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, we use industry-standard encryption (SSL/TLS) and
                        comply with GDPR and other privacy regulations. We never
                        share your personal data with third parties without
                        consent.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Certificate Questions */}
            <TabsContent value="certificates">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Users className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-2xl font-bold">
                      Certificates & Credentials
                    </h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem
                      value="cert-1"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Are the certificates recognized by employers?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Our certificates are industry-recognized and accepted by
                        many employers. We partner with leading companies and
                        professional organizations to ensure our credentials
                        meet industry standards.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="cert-2"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        How do I download my certificate after completing a
                        course?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Certificates are automatically generated within 24 hours
                        of course completion. You'll receive an email
                        notification and can download it from your "My
                        Certificates" section in your profile.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="cert-3"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Can employers verify my certificates?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, all certificates include a unique verification code
                        and QR code. Employers can verify authenticity on our
                        verification portal using the certificate ID.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="cert-4"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Do certificates expire or need renewal?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Most certificates don't expire, but some
                        industry-specific certifications may require renewal
                        every 2-3 years. This is clearly indicated in the course
                        description and certificate details.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="cert-5"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Can I add certificates to my LinkedIn profile?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        We provide direct LinkedIn integration to add
                        certificates to your profile. You can also download
                        certificates as PDF files to share on other professional
                        networks.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Questions */}
            <TabsContent value="account">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Users className="h-6 w-6 text-primary mr-3" />
                    <h2 className="text-2xl font-bold">Account Management</h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    <AccordionItem
                      value="account-1"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        How do I change my email address or password?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Go to Account Settings &gt; Profile to update your email
                        address. For password changes, use Account Settings &gt;
                        Security. You'll need to verify changes via email
                        confirmation.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="account-2"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Can I delete my account and what happens to my data?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Yes, you can delete your account from Account Settings
                        &gt; Privacy. All personal data will be permanently
                        removed within 30 days, but certificates earned will
                        remain valid for verification purposes.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="account-3"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        How do I manage email notifications?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Visit Account Settings &gt; Notifications to customize
                        which emails you receive. You can control course
                        updates, promotional emails, and system notifications
                        separately.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="account-4"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        Can I transfer my account to someone else?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        Account transfers are not permitted due to security and
                        licensing reasons. Each person must create their own
                        account. Corporate accounts can manage multiple user
                        licenses.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem
                      value="account-5"
                      className="border rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left">
                        How do I contact customer support?
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        You can reach us via live chat (available 9 AM - 6 PM
                        EST), email at support@trainingplatform.com, or phone at
                        +1 (555) 123-4567. Visit our Support page for more
                        options.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <MessageCircle className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Can't find the answer you're looking for? Our support team is here
              to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Contact Support
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 bg-transparent"
              >
                Start Live Chat
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
