import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  FileText,@/components/layout/website/navigation
  Scale,
  AlertTriangle,
  Users,
  CreditCard,
  Shield,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/layout/website/footer";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Scale className="h-16 w-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-xl mb-4 text-primary-foreground/90">
              Please read these terms carefully before using our platform and
              services.
            </p>
            <Badge variant="secondary" className="px-4 py-2">
              Effective Date: January 15, 2024
            </Badge>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              <a href="#acceptance" className="text-primary hover:underline">
                Acceptance of Terms
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#services" className="text-primary hover:underline">
                Our Services
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#user-accounts" className="text-primary hover:underline">
                User Accounts
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#payment-terms" className="text-primary hover:underline">
                Payment Terms
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="#user-conduct" className="text-primary hover:underline">
                User Conduct
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#intellectual-property"
                className="text-primary hover:underline"
              >
                Intellectual Property
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#limitation-liability"
                className="text-primary hover:underline"
              >
                Limitation of Liability
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Important Notice */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> By accessing or using our platform,
                you agree to be bound by these Terms of Service. If you do not
                agree to these terms, please do not use our services.
              </AlertDescription>
            </Alert>

            {/* Acceptance of Terms */}
            <Card id="acceptance">
              <CardHeader>
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-2xl">
                    Acceptance of Terms
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  These Terms of Service ("Terms") constitute a legally binding
                  agreement between you and Training Platform Inc. ("Company,"
                  "we," "us," or "our") regarding your use of our website,
                  platform, and services (collectively, the "Services").
                </p>
                <p className="text-muted-foreground">
                  By creating an account, accessing our platform, or using any
                  of our services, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms and our
                  Privacy Policy.
                </p>
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="text-sm font-medium">
                    You must be at least 18 years old to use our services. If
                    you are under 18, you may only use our services with the
                    involvement and consent of a parent or guardian.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Our Services */}
            <Card id="services">
              <CardHeader>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-2xl">
                    Description of Services
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  We provide an online learning platform that offers
                  professional training courses, educational content, and
                  related services designed to help individuals advance their
                  careers.
                </p>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Our Services Include:
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Online courses and educational content</li>
                    <li>Interactive learning materials and assessments</li>
                    <li>Progress tracking and analytics</li>
                    <li>Certificates of completion</li>
                    <li>Community forums and discussion boards</li>
                    <li>Customer support and technical assistance</li>
                    <li>Corporate training solutions</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Service Availability:</strong> We strive to maintain
                    99.9% uptime, but we do not guarantee uninterrupted access
                    to our services. We may temporarily suspend services for
                    maintenance, updates, or technical issues.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Accounts */}
            <Card id="user-accounts">
              <CardHeader>
                <CardTitle className="text-2xl">
                  User Accounts and Registration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Account Creation
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      You must provide accurate and complete information during
                      registration
                    </li>
                    <li>
                      You are responsible for maintaining the confidentiality of
                      your account credentials
                    </li>
                    <li>
                      You must notify us immediately of any unauthorized use of
                      your account
                    </li>
                    <li>
                      One person may not maintain multiple accounts without our
                      permission
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Account Responsibilities
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Keep your contact information current and accurate</li>
                    <li>Use a strong, unique password for your account</li>
                    <li>Do not share your account with others</li>
                    <li>Report any security concerns immediately</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Account Termination
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    We may suspend or terminate your account if you:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Violate these Terms of Service</li>
                    <li>Engage in fraudulent or illegal activities</li>
                    <li>Abuse our platform or other users</li>
                    <li>Fail to pay required fees</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Payment Terms */}
            <Card id="payment-terms">
              <CardHeader>
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-2xl">
                    Payment Terms and Billing
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Course Fees and Subscriptions
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Course prices are displayed in USD and may vary by region
                    </li>
                    <li>
                      Subscription fees are billed monthly or annually as
                      selected
                    </li>
                    <li>
                      All fees are non-refundable except as specified in our
                      refund policy
                    </li>
                    <li>
                      We reserve the right to change pricing with 30 days notice
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Payment Processing
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Payments are processed by secure third-party payment
                      processors
                    </li>
                    <li>
                      You authorize us to charge your selected payment method
                    </li>
                    <li>Failed payments may result in service suspension</li>
                    <li>
                      You are responsible for any bank fees or currency
                      conversion charges
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Refund Policy</h3>
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <p className="text-sm text-green-800 mb-2">
                      <strong>30-Day Money-Back Guarantee:</strong>
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-green-800 text-sm">
                      <li>Full refund available within 30 days of purchase</li>
                      <li>Must request refund through our support system</li>
                      <li>Refunds processed within 5-10 business days</li>
                      <li>Subscription refunds are prorated</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Taxes</h3>
                  <p className="text-muted-foreground text-sm">
                    You are responsible for any applicable taxes, duties, or
                    government fees related to your use of our services. Prices
                    displayed may not include applicable taxes.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* User Conduct */}
            <Card id="user-conduct">
              <CardHeader>
                <CardTitle className="text-2xl">
                  User Conduct and Prohibited Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  You agree to use our services responsibly and in compliance
                  with all applicable laws. The following activities are
                  strictly prohibited:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-600">
                      Prohibited Content
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>Illegal, harmful, or offensive content</li>
                      <li>Harassment, bullying, or discrimination</li>
                      <li>Spam or unsolicited communications</li>
                      <li>False or misleading information</li>
                      <li>Copyrighted material without permission</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-600">
                      Prohibited Activities
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>Attempting to hack or compromise our systems</li>
                      <li>Sharing account credentials with others</li>
                      <li>Downloading or distributing course content</li>
                      <li>Creating fake accounts or impersonating others</li>
                      <li>Interfering with other users' experience</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Enforcement:</strong> Violation of these terms may
                    result in immediate account suspension or termination,
                    removal of content, and potential legal action.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card id="intellectual-property">
              <CardHeader>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-2xl">
                    Intellectual Property Rights
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Our Content</h3>
                  <p className="text-muted-foreground mb-3">
                    All content on our platform, including courses, videos,
                    text, graphics, logos, and software, is owned by us or our
                    licensors and is protected by copyright, trademark, and
                    other intellectual property laws.
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>
                      You may access content only for personal, non-commercial
                      use
                    </li>
                    <li>
                      You may not download, copy, or distribute our content
                    </li>
                    <li>
                      You may not create derivative works from our content
                    </li>
                    <li>
                      Screenshots and recordings are prohibited without
                      permission
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">User Content</h3>
                  <p className="text-muted-foreground mb-3">
                    You retain ownership of content you create and submit to our
                    platform (such as forum posts, comments, or assignments).
                    However, you grant us certain rights:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>
                      Non-exclusive license to use, display, and distribute your
                      content
                    </li>
                    <li>
                      Right to moderate, edit, or remove inappropriate content
                    </li>
                    <li>
                      Permission to use your content for platform improvement
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Copyright Infringement
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    If you believe your copyrighted work has been infringed,
                    please contact us at copyright@trainingplatform.com with
                    detailed information about the alleged infringement.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Disclaimers and Warranties
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 font-medium mb-2">
                    IMPORTANT DISCLAIMER:
                  </p>
                  <p className="text-sm text-yellow-800">
                    Our services are provided "as is" without warranties of any
                    kind. We do not guarantee that our courses will result in
                    job placement, salary increases, or career advancement.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Service Disclaimers
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>
                      We do not warrant that our services will be uninterrupted
                      or error-free
                    </li>
                    <li>
                      Course content may become outdated due to industry changes
                    </li>
                    <li>
                      Individual results may vary based on effort and
                      circumstances
                    </li>
                    <li>
                      We are not responsible for third-party content or links
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Educational Disclaimers
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Our courses are for educational purposes only</li>
                    <li>
                      We do not provide professional advice or certifications
                    </li>
                    <li>
                      Students are responsible for verifying information
                      accuracy
                    </li>
                    <li>
                      Completion does not guarantee professional competency
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card id="limitation-liability">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-sm text-red-800 font-medium mb-2">
                    LIABILITY LIMITATION:
                  </p>
                  <p className="text-sm text-red-800">
                    To the maximum extent permitted by law, our total liability
                    to you for any claims arising from these terms or your use
                    of our services shall not exceed the amount you paid us in
                    the 12 months preceding the claim.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Excluded Damages
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    We shall not be liable for any indirect, incidental,
                    special, or consequential damages, including:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Lost profits or business opportunities</li>
                    <li>Data loss or corruption</li>
                    <li>Service interruptions</li>
                    <li>Third-party actions or content</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Indemnification
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    You agree to indemnify and hold us harmless from any claims,
                    damages, or expenses arising from your use of our services,
                    violation of these terms, or infringement of any third-party
                    rights.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Governing Law */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Governing Law and Dispute Resolution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Governing Law</h3>
                  <p className="text-muted-foreground text-sm">
                    These Terms shall be governed by and construed in accordance
                    with the laws of the State of California, United States,
                    without regard to conflict of law principles.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Dispute Resolution
                  </h3>
                  <p className="text-muted-foreground mb-2 text-sm">
                    Any disputes arising from these Terms or your use of our
                    services shall be resolved through:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Good faith negotiation between the parties</li>
                    <li>Binding arbitration if negotiation fails</li>
                    <li>
                      Arbitration conducted under American Arbitration
                      Association rules
                    </li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Class Action Waiver
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    You agree that any arbitration or legal proceeding shall be
                    conducted on an individual basis only and not as part of a
                    class, collective, or representative action.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* General Provisions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">General Provisions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Modifications to Terms
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We may modify these Terms at any time by posting updated
                    terms on our website. Continued use of our services after
                    changes constitutes acceptance of the new terms.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Severability</h3>
                  <p className="text-muted-foreground text-sm">
                    If any provision of these Terms is found to be
                    unenforceable, the remaining provisions shall remain in full
                    force and effect.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Entire Agreement
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    These Terms, together with our Privacy Policy, constitute
                    the entire agreement between you and us regarding your use
                    of our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Contact Information
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    For questions about these Terms, please contact us at
                    legal@trainingplatform.com or +1 (555) 123-4567.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Acknowledgment */}
            <Card>
              <CardContent className="p-6 bg-primary/5 border-primary/20">
                <h3 className="text-lg font-semibold mb-3">Acknowledgment</h3>
                <p className="text-muted-foreground text-sm">
                  By using our services, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms of Service.
                  If you do not agree to these terms, please discontinue use of
                  our platform immediately.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
