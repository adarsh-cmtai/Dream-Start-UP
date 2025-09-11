import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, Globe, Lightbulb } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation/>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/90 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Empowering Careers Through
              <span className="text-accent"> Quality Education</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 text-pretty">
              We believe that everyone deserves access to world-class training that transforms careers and lives.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="px-4 py-2">
                Founded in 2020
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                50,000+ Students
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                95% Success Rate
              </Badge>
              <Badge variant="secondary" className="px-4 py-2">
                Global Reach
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="p-8 border-l-4 border-l-primary">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-primary mr-3" />
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To democratize access to high-quality professional training and empower individuals to achieve their
                  career goals through innovative, practical, and industry-relevant education.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8 border-l-4 border-l-accent">
              <CardContent className="p-0">
                <div className="flex items-center mb-4">
                  <Lightbulb className="h-8 w-8 text-accent mr-3" />
                  <h2 className="text-3xl font-bold">Our Vision</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To become the world's leading platform for professional development, where learners from all
                  backgrounds can access transformative education that bridges the gap between skills and opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded in 2020 by a team of industry veterans and education enthusiasts, our platform was born from a
                simple observation: there was a significant gap between what professionals needed to succeed and what
                traditional education provided.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Starting with just three courses in web development, we've grown into a comprehensive learning ecosystem
                covering dozens of in-demand skills. Our growth has been driven by one principle: putting learner
                success at the center of everything we do.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today, we're proud to have helped over 50,000 professionals advance their careers, with 95% of our
                graduates reporting significant career improvements within six months of completing their training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards in curriculum design, instruction quality, and student support to
                  ensure exceptional learning outcomes.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-muted-foreground">
                  We foster a supportive learning community where students, instructors, and industry professionals
                  collaborate and grow together.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                <p className="text-muted-foreground">
                  We believe quality education should be accessible to everyone, regardless of background, location, or
                  financial circumstances.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">Sarah Johnson</h3>
                <p className="text-accent font-medium mb-3">CEO & Co-Founder</p>
                <p className="text-sm text-muted-foreground">
                  Former VP of Engineering at TechCorp with 15+ years in technology leadership and a passion for
                  education innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-primary/20"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">Michael Chen</h3>
                <p className="text-accent font-medium mb-3">CTO & Co-Founder</p>
                <p className="text-sm text-muted-foreground">
                  Former Principal Engineer at DataFlow with expertise in scalable systems and machine learning
                  applications.
                </p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20"></div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">Dr. Emily Rodriguez</h3>
                <p className="text-accent font-medium mb-3">Head of Curriculum</p>
                <p className="text-sm text-muted-foreground">
                  PhD in Educational Technology with 20+ years designing effective learning experiences for adult
                  professionals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">50,000+</div>
              <p className="text-primary-foreground/90">Students Trained</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">95%</div>
              <p className="text-primary-foreground/90">Success Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">150+</div>
              <p className="text-primary-foreground/90">Expert Instructors</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">40+</div>
              <p className="text-primary-foreground/90">Countries Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Whether you're looking to advance your career or share your expertise as an instructor, we'd love to have
              you as part of our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                Start Learning Today
              </Button>
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                Become an Instructor
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  )
}
