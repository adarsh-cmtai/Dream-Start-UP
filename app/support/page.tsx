import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Search,
  BookOpen,
  CreditCard,
  Settings,
  CheckCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { Navigation } from "@/components/layout/website/navigation";
import { Footer } from "@/components/layout/website/footer";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Can We Help You?
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Get the support you need to succeed in your learning journey
            </p>

            {/* Quick Search */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for help articles, courses, or common issues..."
                className="pl-12 py-4 text-lg bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="py-12 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Course Help</h3>
                <p className="text-sm text-muted-foreground">
                  Access issues, progress tracking, certificates
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Billing & Payments</h3>
                <p className="text-sm text-muted-foreground">
                  Subscriptions, refunds, payment methods
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Account Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Profile, password, notifications
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">General Help</h3>
                <p className="text-sm text-muted-foreground">
                  Platform features, getting started
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get Support</h2>

          <Tabs defaultValue="contact" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="live-chat">Live Chat</TabsTrigger>
              <TabsTrigger value="resources">Self-Help</TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input placeholder="First Name" />
                      <Input placeholder="Last Name" />
                    </div>
                    <Input placeholder="Email Address" type="email" />
                    <Input placeholder="Subject" />
                    <Textarea
                      placeholder="Describe your issue or question..."
                      rows={6}
                    />
                    <Button className="w-full">Send Message</Button>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Mail className="h-6 w-6 text-primary mr-3" />
                        <div>
                          <h3 className="font-semibold">Email Support</h3>
                          <p className="text-sm text-muted-foreground">
                            support@trainingplatform.com
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Response time: Within 24 hours
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Phone className="h-6 w-6 text-primary mr-3" />
                        <div>
                          <h3 className="font-semibold">Phone Support</h3>
                          <p className="text-sm text-muted-foreground">
                            +1 (555) 123-4567
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Mon-Fri: 9 AM - 6 PM EST
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <Clock className="h-6 w-6 text-primary mr-3" />
                        <div>
                          <h3 className="font-semibold">Business Hours</h3>
                          <p className="text-sm text-muted-foreground">
                            Monday - Friday
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        9:00 AM - 6:00 PM (EST)
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="live-chat" className="mt-8">
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-16 w-16 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold mb-4">
                    Live Chat Support
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Get instant help from our support team. Available during
                    business hours for quick questions and immediate assistance.
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-green-600">
                      Support team is online
                    </span>
                  </div>
                  <Button size="lg" className="px-8">
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Knowledge Base</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Browse our comprehensive collection of help articles and
                      tutorials.
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Browse Articles
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Video Tutorials</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Watch step-by-step video guides for common platform
                      features.
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Watch Tutorials
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Community Forum</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect with other learners and get help from the
                      community.
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Join Forum
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">System Status</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Check the current status of our platform and services.
                    </p>
                    <Button variant="outline" className="w-full bg-transparent">
                      Check Status
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common Issues
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      I can't access my course
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Check your internet connection and try refreshing the
                      page. If the issue persists, clear your browser cache or
                      try a different browser.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      My certificate isn't downloading
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ensure you've completed all course requirements.
                      Certificates are generated within 24 hours of course
                      completion.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      I was charged incorrectly
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Contact our billing team with your transaction details.
                      We'll review and resolve any billing discrepancies within
                      3-5 business days.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      Video won't play or keeps buffering
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Try lowering the video quality, check your internet speed,
                      or switch to a different device. Contact support if issues
                      continue.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Support Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-1">Sarah Mitchell</h3>
                <p className="text-sm text-accent mb-2">Support Manager</p>
                <p className="text-xs text-muted-foreground">
                  Specializes in course access and technical issues
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-1">David Park</h3>
                <p className="text-sm text-accent mb-2">Billing Specialist</p>
                <p className="text-xs text-muted-foreground">
                  Handles payments, refunds, and subscription management
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4"></div>
                <h3 className="font-semibold mb-1">Emma Rodriguez</h3>
                <p className="text-sm text-accent mb-2">Learning Advisor</p>
                <p className="text-xs text-muted-foreground">
                  Provides guidance on course selection and career paths
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
