"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Star, Users, Clock, Search, Filter, BookOpen, Award, TrendingUp, PlayCircle } from "lucide-react"
import Image from "next/image"
import React, { useState } from "react"

const courses = [
  {
    id: 1,
    title: "Complete Full-Stack Web Development",
    category: "Web Development",
    instructor: "Sarah Johnson",
    rating: 4.9,
    students: 2847,
    duration: "40 hours",
    level: "Beginner",
    price: "$199",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "https://youtu.be/HAnw168huqA",
    description: "Master modern web development with React, Node.js, and MongoDB",
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    category: "Data Science",
    instructor: "Dr. Michael Chen",
    rating: 4.8,
    students: 1923,
    duration: "60 hours",
    level: "Intermediate",
    price: "$299",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "https://youtu.be/HAnw168huqA",
    description: "Learn Python, pandas, scikit-learn, and advanced analytics",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    category: "Marketing",
    instructor: "Emma Rodriguez",
    rating: 4.9,
    students: 3156,
    duration: "25 hours",
    level: "Beginner",
    price: "$149",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "n4_7p5IeN-o",
    description: "Complete guide to SEO, social media, and paid advertising",
  },
  {
    id: 4,
    title: "AWS Cloud Architecture",
    category: "Cloud Computing",
    instructor: "James Wilson",
    rating: 4.7,
    students: 1654,
    duration: "35 hours",
    level: "Advanced",
    price: "$249",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "SOTam2s3_iQ",
    description: "Design scalable cloud solutions with AWS services",
  },
  {
    id: 5,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    instructor: "Lisa Park",
    rating: 4.8,
    students: 2341,
    duration: "30 hours",
    level: "Beginner",
    price: "$179",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "cKZEgtadwlg",
    description: "Create beautiful and user-friendly digital experiences",
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    category: "Security",
    instructor: "Robert Davis",
    rating: 4.6,
    students: 987,
    duration: "45 hours",
    level: "Intermediate",
    price: "$229",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "_3mW3poaTGM",
    description: "Protect systems and data from cyber threats",
  },
]

const learningPaths = [
  {
    title: "Become a Full-Stack Developer",
    description: "Complete roadmap from beginner to professional full-stack developer",
    courses: 6,
    duration: "6 months",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "ber_pA9yO_Y",
  },
  {
    title: "Data Science Career Track",
    description: "Master data analysis, machine learning, and statistical modeling",
    courses: 8,
    duration: "8 months",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "X3paOmcrTjQ",
  },
  {
    title: "Digital Marketing Professional",
    description: "Comprehensive marketing skills for the digital age",
    courses: 5,
    duration: "4 months",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "n4_7p5IeN-o",
  },
]

const instructors = [
  {
    name: "Sarah Johnson",
    title: "Senior Full-Stack Developer",
    company: "Google",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "ewE5zMA8j_c",
    bio: "10+ years building scalable web applications",
  },
  {
    name: "Dr. Michael Chen",
    title: "Lead Data Scientist",
    company: "Microsoft",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "T-d_4l9zo4A",
    bio: "PhD in Machine Learning, published researcher",
  },
  {
    name: "Emma Rodriguez",
    title: "Digital Marketing Director",
    company: "Meta",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "eZzE9m90-2g",
    bio: "Grew multiple brands to 7-figure revenue",
  },
  {
    name: "James Wilson",
    title: "Cloud Solutions Architect",
    company: "Amazon",
    image: "https://plus.unsplash.com/premium_photo-1661763874747-405eb7388c58?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhaW5pbmd8ZW58MHx8MHx8fDA%3D",
    videoId: "x7Xz243s6xM",
    bio: "AWS certified expert with enterprise experience",
  },
]

interface VideoPlayerModalProps {
  videoId: string | null;
  onClose: () => void;
}

const VideoPlayerModal = ({ videoId, onClose }: VideoPlayerModalProps) => {
  if (!videoId) return null;

  return (
    <Dialog open={!!videoId} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl p-0 border-0">
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function TrainingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null)

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    return matchesSearch && matchesCategory && matchesLevel
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <VideoPlayerModal videoId={playingVideoId} onClose={() => setPlayingVideoId(null)} />

      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">Our Training Programs</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover training designed by industry experts to help you master in-demand skills and advance your career.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search for courses, e.g., 'Python'"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Web Development">Web Development</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                  <SelectItem value="Security">Security</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div
                className="aspect-video lg:aspect-auto relative group cursor-pointer"
                onClick={() => setPlayingVideoId("V_xro1bcAuA")}
              >
                <Image
                  src="https://img.youtube.com/vi/V_xro1bcAuA/maxresdefault.jpg"
                  alt="Featured Course"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">🔥 Most Popular</Badge>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4">Web Development</Badge>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                  Complete Full-Stack Web Development Bootcamp
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Master the complete web development stack with React, Node.js, Express, and MongoDB. Build real-world
                  projects and get job-ready skills.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm">40+ hours of video content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm">Industry-recognized certificate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">Join 2,847+ students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm">95% job placement rate</span>
                  </div>
                </div>
                <Button size="lg" className="w-fit">
                  Enroll in this training
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-heading font-bold text-foreground">All training ({filteredCourses.length})</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtered results</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div
                  className="aspect-video relative overflow-hidden cursor-pointer"
                  onClick={() => setPlayingVideoId(course.videoId)}
                >
                  <Image
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </div>
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{course.category}</Badge>
                  <Badge variant="secondary" className="absolute top-3 right-3 bg-white/90 text-foreground">
                    {course.level}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>
                  <p className="text-muted-foreground text-sm mb-4">by {course.instructor}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{course.rating}</span>
                      <span className="text-xs text-muted-foreground">({course.students})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No training found matching your criteria.</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedLevel("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Structured Learning Paths</h2>
            <p className="text-xl text-muted-foreground">
              Follow curated training sequences designed to take you from beginner to expert.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div
                  className="aspect-video relative overflow-hidden cursor-pointer"
                  onClick={() => setPlayingVideoId(path.videoId)}
                >
                  <Image
                    src={path.image}
                    alt={path.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-xl mb-3">{path.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{path.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <span>{path.courses} Training</span>
                    <span>{path.duration}</span>
                  </div>
                  <Button className="w-full">View Path</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Meet Our Expert Instructors</h2>
            <p className="text-xl text-muted-foreground">
              Learn from industry leaders with real-world experience at top companies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((instructor, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div
                  className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 relative group cursor-pointer"
                  onClick={() => setPlayingVideoId(instructor.videoId)}
                >
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    width={96}
                    height={96}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-1">{instructor.name}</h3>
                <p className="text-primary text-sm font-medium mb-1">{instructor.title}</p>
                <p className="text-muted-foreground text-sm mb-3">{instructor.company}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{instructor.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">
              Get answers to common questions about our training programs.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">
                Are the certificates accredited and recognized by employers?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes, our certificates are industry-recognized and valued by employers worldwide. We partner with leading
                companies to ensure our curriculum meets current industry standards and requirements.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">What is the refund policy?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                We offer a 30-day money-back guarantee. If you're not satisfied with your training within the first 30
                days, you can request a full refund, no questions asked.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">
                Can I access training on mobile devices?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Our platform is fully responsive and optimized for mobile devices. You can learn on-the-go using your
                smartphone or tablet with our mobile app available on iOS and Android.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">
                Do I get lifetime access to course materials?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes, once you enroll in a training, you get lifetime access to all training materials, including future
                updates and additional content. You can learn at your own pace and revisit materials anytime.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="border border-border rounded-lg px-6">
              <AccordionTrigger className="text-left font-medium">
                Is there support available if I get stuck?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes, we provide comprehensive support including instructor Q&A, community forums, and dedicated support
                staff. You can get help with technical issues, training content, or career guidance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  )
}