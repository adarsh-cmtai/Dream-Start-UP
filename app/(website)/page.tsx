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
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Users,
  Award,
  Clock,
  Brain,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Play,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ServicesComponent from "@/components/home/ServicesSection";
import WhyChooseUs from "@/components/home/WhyChooseUS";
import Herosection from "@/components/home/HeroSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-8 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
                  Unlock Your Potential.{" "}
                  <span className="text-primary">Master In-Demand Skills.</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join thousands of professionals who are advancing their
                  careers with our expert-led online training programs.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="text-lg px-8 py-6">
                  <Link href="/training">
                    Explore training
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 bg-transparent"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Request a Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <Image
                  src="/diverse-professionals-learning-collaboratively-in-.jpg"
                  alt="Professionals learning together"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Herosection />

      {/* Trusted By Section */}
      {/* <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-lg font-medium text-muted-foreground">
              Trusted by Professionals at Major Companies
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix"].map(
              (company) => (
                <div
                  key={company}
                  className="text-2xl font-bold text-muted-foreground"
                >
                  {company}
                </div>
              )
            )}
          </div>
        </div>
      </section> */}

      {/* Why Choose Us Section */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Why Choose EduPro?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide world-class training that delivers real results for
              your career growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-heading">
                  Expert Instructors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Learn from industry veterans with years of real-world
                  experience and proven track records.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl font-heading">
                  Industry-Recognized Certification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Earn certificates that are valued by employers and recognized
                  across the industry.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center p-8 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-heading">
                  Flexible Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Study at your own pace with 24/7 access to course materials
                  and lifetime access to updates.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      <WhyChooseUs />

      <ServicesComponent />

      {/* Featured Courses Section */}
      {/* <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Our Most Popular Courses
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover the skills that are in highest demand in today's job
              market.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Full-Stack Web Development",
                category: "Web Development",
                instructor: "Sarah Johnson",
                rating: 4.9,
                students: 2847,
                image: "/web-development-coding-screen.png",
              },
              {
                title: "Data Science & Analytics",
                category: "Data Science",
                instructor: "Dr. Michael Chen",
                rating: 4.8,
                students: 1923,
                image: "/data-analytics-dashboard.png",
              },
              {
                title: "Digital Marketing Mastery",
                category: "Marketing",
                instructor: "Emma Rodriguez",
                rating: 4.9,
                students: 3156,
                image: "/digital-marketing-social-media.png",
              },
              {
                title: "Cloud Architecture (AWS)",
                category: "Cloud Computing",
                instructor: "James Wilson",
                rating: 4.7,
                students: 1654,
                image: "/cloud-computing-server-infrastructure.jpg",
              },
            ].map((course, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {course.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    by {course.instructor}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({course.students})
                      </span>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href="/training">View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/training">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section> */}

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Real success stories from our learning community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "The Full-Stack Development course completely transformed my career. I went from a junior developer to a senior role in just 8 months!",
                name: "Alex Thompson",
                role: "Senior Developer at TechCorp",
                course: "Full-Stack Web Development",
                avatar: "/male-developer-headshot.png",
              },
              {
                quote:
                  "The instructors are world-class and the content is always up-to-date with industry standards. Highly recommend!",
                name: "Maria Garcia",
                role: "Data Analyst at DataFlow",
                course: "Data Science & Analytics",
                avatar: "/female-analyst-headshot.png",
              },
              {
                quote:
                  "I doubled my marketing ROI within 3 months of completing the Digital Marketing course. The strategies actually work!",
                name: "David Kim",
                role: "Marketing Manager at GrowthCo",
                course: "Digital Marketing Mastery",
                avatar: "/professional-headshot-male-marketer.jpg",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-shadow"
              >
                <CardContent className="space-y-6">
                  <blockquote className="text-lg italic text-foreground leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-primary">
                        {testimonial.course}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Your journey to success in three simple steps.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Browse",
                description:
                  "Find the perfect course from our extensive catalog of expert-led training programs.",
                icon: <BookOpen className="h-8 w-8" />,
              },
              {
                step: "2",
                title: "Learn",
                description:
                  "Engage with video lessons, quizzes, and projects at your own pace with lifetime access.",
                icon: <Users className="h-8 w-8" />,
              },
              {
                step: "3",
                title: "Achieve",
                description:
                  "Earn a certificate and showcase your new skills to advance your career.",
                icon: <CheckCircle className="h-8 w-8" />,
              },
            ].map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary">{item.icon}</div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
              Insights from Our Experts
            </h2>
            <p className="text-xl text-muted-foreground">
              Stay updated with the latest trends and best practices.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of Remote Work: Skills You Need in 2024",
                excerpt:
                  "Discover the essential skills that will make you indispensable in the remote work landscape.",
                image: "/remote-work-home-office-setup.jpg",
                date: "Dec 15, 2024",
                readTime: "5 min read",
              },
              {
                title: "AI and Machine Learning: A Beginner's Roadmap",
                excerpt:
                  "Your complete guide to starting a career in artificial intelligence and machine learning.",
                image: "/ai-machine-learning-neural-network.jpg",
                date: "Dec 12, 2024",
                readTime: "8 min read",
              },
              {
                title: "Building a Personal Brand as a Developer",
                excerpt:
                  "Learn how to showcase your skills and build a strong professional presence online.",
                image: "/developer-personal-branding-portfolio.jpg",
                date: "Dec 10, 2024",
                readTime: "6 min read",
              },
            ].map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Button size="sm" variant="ghost" asChild>
                    <Link href="/blogs">Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/blogs">View All Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join over 50,000 professionals who have transformed their careers
            with EduPro.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-secondary hover:bg-white/90 text-lg px-8 py-6"
          >
            Sign Up for Free
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
