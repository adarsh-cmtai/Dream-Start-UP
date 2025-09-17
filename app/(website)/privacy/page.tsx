import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock, Users, Mail, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="h-16 w-16 mx-auto mb-6 text-accent" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl mb-4 text-primary-foreground/90">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your information.
            </p>
            <Badge variant="secondary" className="px-4 py-2">
              Last Updated: January 15, 2024
            </Badge>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg font-semibold mb-4">Quick Navigation</h2>
            <div className="flex flex-wrap gap-2">
              <a
                href="#information-collection"
                className="text-sm text-primary hover:underline"
              >
                Information We Collect
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#how-we-use"
                className="text-sm text-primary hover:underline"
              >
                How We Use Information
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#information-sharing"
                className="text-sm text-primary hover:underline"
              >
                Information Sharing
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#data-security"
                className="text-sm text-primary hover:underline"
              >
                Data Security
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#your-rights"
                className="text-sm text-primary hover:underline"
              >
                Your Rights
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="#contact-us"
                className="text-sm text-primary hover:underline"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Introduction */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <div className="prose prose-lg max-w-none text-muted-foreground">
                  <p className="mb-4">
                    Welcome to our Training Platform ("we," "our," or "us"). We
                    are committed to protecting your personal information and
                    your right to privacy. This Privacy Policy explains how we
                    collect, use, disclose, and safeguard your information when
                    you visit our website and use our services.
                  </p>
                  <p>
                    Please read this Privacy Policy carefully. If you do not
                    agree with the terms of this Privacy Policy, please do not
                    access or use our services.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card id="information-collection">
              <CardHeader>
                <div className="flex items-center">
                  <Eye className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-2xl">
                    Information We Collect
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Personal Information You Provide
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Name, email address, and contact information</li>
                    <li>Account credentials (username and password)</li>
                    <li>Profile information and preferences</li>
                    <li>Payment and billing information</li>
                    <li>Course progress and completion data</li>
                    <li>Communications with our support team</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Information Automatically Collected
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Device information (IP address, browser type, operating
                      system)
                    </li>
                    <li>
                      Usage data (pages visited, time spent, features used)
                    </li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Log files and analytics data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Information from Third Parties
                  </h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      Social media login information (if you choose to connect)
                    </li>
                    <li>Payment processor information</li>
                    <li>Analytics and advertising partners</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card id="how-we-use">
              <CardHeader>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-2xl">
                    How We Use Your Information
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Service Provision
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                      <li>Create and manage your account</li>
                      <li>Provide access to courses and content</li>
                      <li>Track learning progress</li>
                      <li>Issue certificates and credentials</li>
                      <li>Process payments and billing</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Communication
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                      <li>Send course updates and notifications</li>
                      <li>Respond to customer support inquiries</li>
                      <li>Send marketing communications (with consent)</li>
                      <li>Provide important service announcements</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Improvement & Analytics
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                      <li>Analyze platform usage and performance</li>
                      <li>Improve our services and user experience</li>
                      <li>Develop new features and content</li>
                      <li>Conduct research and analytics</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Legal & Security
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                      <li>Comply with legal obligations</li>
                      <li>Protect against fraud and abuse</li>
                      <li>Enforce our terms of service</li>
                      <li>Maintain platform security</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card id="information-sharing">
              <CardHeader>
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-2xl">
                    Information Sharing and Disclosure
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <p className="font-semibold text-accent mb-2">
                    We do not sell your personal information.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    We may share your information only in the specific
                    circumstances outlined below.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Service Providers
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    We may share information with trusted third-party service
                    providers who help us operate our platform:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                    <li>Payment processors (Stripe, PayPal)</li>
                    <li>Cloud hosting providers (AWS, Google Cloud)</li>
                    <li>Email service providers</li>
                    <li>Analytics providers (Google Analytics)</li>
                    <li>Customer support tools</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Legal Requirements
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We may disclose your information if required by law, court
                    order, or government request, or to protect our rights,
                    property, or safety, or that of our users or others.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Business Transfers
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    In the event of a merger, acquisition, or sale of assets,
                    your information may be transferred as part of the business
                    transaction.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card id="data-security">
              <CardHeader>
                <div className="flex items-center">
                  <Lock className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-2xl">Data Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Technical Safeguards
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>SSL/TLS encryption for data transmission</li>
                      <li>Encrypted data storage</li>
                      <li>Regular security audits and testing</li>
                      <li>Secure access controls and authentication</li>
                      <li>Regular software updates and patches</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Organizational Measures
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>Employee training on data protection</li>
                      <li>Limited access on a need-to-know basis</li>
                      <li>Data breach response procedures</li>
                      <li>Regular privacy impact assessments</li>
                      <li>Vendor security requirements</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Important:</strong> While we strive to protect your
                    information, no method of transmission over the internet or
                    electronic storage is 100% secure. We cannot guarantee
                    absolute security.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card id="your-rights">
              <CardHeader>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-2xl">
                    Your Privacy Rights
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Depending on your location, you may have certain rights
                  regarding your personal information:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Access & Portability
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>Request access to your personal data</li>
                      <li>Receive a copy of your data in a portable format</li>
                      <li>
                        Request information about how we process your data
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Correction & Deletion
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>Correct inaccurate or incomplete information</li>
                      <li>Request deletion of your personal data</li>
                      <li>Restrict processing of your information</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Communication Preferences
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>Opt-out of marketing communications</li>
                      <li>Manage notification preferences</li>
                      <li>Withdraw consent where applicable</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Complaints</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                      <li>File a complaint with us directly</li>
                      <li>Contact your local data protection authority</li>
                      <li>Seek legal remedies if applicable</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-primary/10 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>To exercise your rights:</strong> Contact us at
                    privacy@trainingplatform.com or use the contact information
                    provided below. We will respond to your request within 30
                    days.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Cookies and Tracking Technologies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to enhance your
                  experience on our platform:
                </p>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      Required for basic platform functionality, security, and
                      user authentication.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      Help us understand how users interact with our platform to
                      improve our services.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Preference Cookies</h3>
                    <p className="text-sm text-muted-foreground">
                      Remember your settings and preferences for a personalized
                      experience.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  You can manage cookie preferences through your browser
                  settings or our cookie consent banner.
                </p>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  International Data Transfers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Your information may be transferred to and processed in
                  countries other than your own. We ensure appropriate
                  safeguards are in place for international transfers:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                  <li>
                    Standard Contractual Clauses approved by the European
                    Commission
                  </li>
                  <li>Adequacy decisions for certain countries</li>
                  <li>
                    Other appropriate safeguards as required by applicable law
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our services are not intended for children under 13 years of
                  age. We do not knowingly collect personal information from
                  children under 13. If you believe we have collected
                  information from a child under 13, please contact us
                  immediately so we can delete such information.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">
                  Changes to This Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm mb-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending an email notification to registered users</li>
                  <li>Displaying a prominent notice on our platform</li>
                </ul>
                <p className="text-muted-foreground text-sm">
                  Your continued use of our services after any changes
                  constitutes acceptance of the updated Privacy Policy.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card id="contact-us">
              <CardHeader>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-2xl">Contact Us</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our
                  privacy practices, please contact us:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">
                      General Privacy Inquiries
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Email: privacy@trainingplatform.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Phone: +1 (555) 123-4567
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">
                      Data Protection Officer
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Email: dpo@trainingplatform.com
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Response time: Within 30 days
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                  <h3 className="font-semibold mb-2">Mailing Address</h3>
                  <p className="text-sm text-muted-foreground">
                    Training Platform Inc.
                    <br />
                    123 Learning Street
                    <br />
                    Education City, EC 12345
                    <br />
                    United States
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
