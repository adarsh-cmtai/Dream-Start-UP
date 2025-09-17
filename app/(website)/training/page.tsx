"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Star,
  Users,
  Clock,
  Search,
  Filter,
  BookOpen,
  Award,
  TrendingUp,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import HeroSection from "@/components/all/CommonHeroSection";

const courses = [
  {
    id: 1,
    title: "Venture Capital & Fundraising Masterclass",
    category: "Fundraising",
    instructor: "Jessica Miles",
    rating: 4.9,
    students: 1280,
    duration: "25 hours",
    level: "Intermediate",
    price: "$299",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    videoId: "N8_p8nQ5s_E",
    description:
      "Master the art of fundraising, from crafting your pitch to negotiating term sheets with top VCs.",
  },
  {
    id: 2,
    title: "Lean Startup & MVP Development",
    category: "Product",
    instructor: "Alex Chen",
    rating: 4.8,
    students: 2150,
    duration: "30 hours",
    level: "Beginner",
    price: "$199",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    videoId: "fZSF82PMq_c",
    description:
      "Learn to build, measure, and learn. Validate your idea and build products customers actually want.",
  },
  {
    id: 3,
    title: "Growth Hacking for Startups",
    category: "Growth",
    instructor: "Ben Carter",
    rating: 4.9,
    students: 3105,
    duration: "40 hours",
    level: "All Levels",
    price: "$249",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    videoId: "f_p54H1_w2g",
    description:
      "Acquire users at scale with proven growth strategies used by top Silicon Valley startups.",
  },
  {
    id: 4,
    title: "Startup Financial Modeling & Forecasting",
    category: "Operations",
    instructor: "Maria Garcia",
    rating: 4.7,
    students: 980,
    duration: "20 hours",
    level: "Advanced",
    price: "$279",
    image:
      "https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    videoId: "8m_3XaHiEpc",
    description:
      "Build a solid financial model to manage your burn rate, forecast revenue, and impress investors.",
  },
  {
    id: 5,
    title: "Building a High-Performance Team",
    category: "Operations",
    instructor: "David Lee",
    rating: 4.8,
    students: 1543,
    duration: "15 hours",
    level: "Intermediate",
    price: "$179",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    videoId: "uI9T0C_we_A",
    description:
      "Learn how to hire, manage, and retain A-player talent for your early-stage startup.",
  },
  {
    id: 6,
    title: "Startup Legal Essentials",
    category: "Legal",
    instructor: "Rachel Kim",
    rating: 4.9,
    students: 1890,
    duration: "10 hours",
    level: "Beginner",
    price: "$149",
    image:
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    videoId: "5iUhzS6_D_A",
    description:
      "Navigate incorporation, IP, and equity distribution with confidence. Avoid common legal pitfalls.",
  },
];

const learningPaths = [
  {
    title: "The Pre-Seed Founder",
    description:
      "From idea validation to your first funding round. Everything you need to get started.",
    courses: 5,
    duration: "4 months",
    image:
      "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    videoId: "R_MbiC-4h_w",
  },
  {
    title: "The Growth Stage Playbook",
    description:
      "Master the strategies to scale your user base, revenue, and team from Series A and beyond.",
    courses: 8,
    duration: "8 months",
    image:
      "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    videoId: "TQSeiR_ig2k",
  },
  {
    title: "The Solo-Founder Track",
    description:
      "A comprehensive guide for building a profitable business without a co-founder or VC funding.",
    courses: 6,
    duration: "6 months",
    image:
      "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    videoId: "L_AcrbjSg2A",
  },
];

const instructors = [
  {
    name: "Jessica Miles",
    title: "Managing Partner",
    company: "Catalyst Ventures",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    videoId: "ewE5zMA8j_c",
    bio: "Led over 50 early-stage investments, with 5 unicorns in her portfolio.",
  },
  {
    name: "Alex Chen",
    title: "Serial Entrepreneur & YC Alum",
    company: "Founder of Innovate.io",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    videoId: "T-d_4l9zo4A",
    bio: "Built and sold two tech startups for a combined $200M. Passionate about product.",
  },
  {
    name: "Ben Carter",
    title: "Former Head of Growth",
    company: "ScaleUp Inc.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    videoId: "eZzE9m90-2g",
    bio: "Grew ScaleUp's user base from 10k to 10 million in just two years.",
  },
  {
    name: "Maria Garcia",
    title: "Startup CFO & Advisor",
    company: "Self-Employed",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
    videoId: "x7Xz243s6xM",
    bio: "Helped dozens of startups secure funding and navigate successful exits.",
  },
];

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
  );
};

export default function TrainingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <HeroSection
              badgeText="Skill Development"
              title="Master the Art of Entrepreneurship"
              description="Accelerate your startup journey with our comprehensive training programs covering business strategy, technical skills, digital marketing, and leadership development designed for modern entrepreneurs."
            />
      <VideoPlayerModal
        videoId={playingVideoId}
        onClose={() => setPlayingVideoId(null)}
      />

      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-heading font-bold text-foreground mb-4">
              Accelerate Your Startup's Success
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover training designed by successful founders and venture
              capitalists to help you build, fund, and scale your business.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search training, e.g., 'Fundraising'"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Product">Product</SelectItem>
                  <SelectItem value="Fundraising">Fundraising</SelectItem>
                  <SelectItem value="Growth">Growth</SelectItem>
                  <SelectItem value="Operations">Operations</SelectItem>
                  <SelectItem value="Legal">Legal</SelectItem>
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
                onClick={() => setPlayingVideoId("N8_p8nQ5s_E")}
              >
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
                  alt="Featured Training"
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                  🔥 Most Popular
                </Badge>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4">Fundraising</Badge>
                <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                  Venture Capital & Fundraising Masterclass
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  Master the complete fundraising process, from crafting the
                  perfect pitch deck to negotiating term sheets and closing your
                  round. Taught by a seasoned VC.
                </p>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      25+ hours of video content & templates
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      Access to our private investor network
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      Join 1,280+ successful founders
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      Alumni have raised over $500M
                    </span>
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
            <h2 className="text-2xl font-heading font-bold text-foreground">
              All training ({filteredCourses.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="h-4 w-4" />
              <span>Filtered results</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="overflow-hidden hover:shadow-lg transition-shadow group"
              >
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
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {course.category}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 bg-white/90 text-foreground"
                  >
                    {course.level}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {course.description}
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    by {course.instructor}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({course.students})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      {course.price}
                    </span>
                    <Button size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No training found matching your criteria.
              </p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setSelectedLevel("all");
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
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Curated Learning Paths for Founders
            </h2>
            <p className="text-xl text-muted-foreground">
              Follow a step-by-step roadmap to navigate the challenges of
              building a successful startup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {learningPaths.map((path, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-shadow group"
              >
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
                  <h3 className="font-heading font-semibold text-xl mb-3">
                    {path.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {path.description}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <span>{path.courses} Training Modules</span>
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
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Learn From The Best in the Startup World
            </h2>
            <p className="text-xl text-muted-foreground">
              Our instructors are successful founders, seasoned VCs, and expert
              operators from the world's top startups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((instructor, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
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
                <h3 className="font-heading font-semibold text-lg mb-1">
                  {instructor.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-1">
                  {instructor.title}
                </p>
                <p className="text-muted-foreground text-sm mb-3">
                  {instructor.company}
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {instructor.bio}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Get answers to common questions about our startup training
              programs.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-1"
              className="border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-medium">
                Will this training help me get funding?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                While we can't guarantee funding, our programs are designed to
                equip you with the skills, network, and polished pitch deck that
                VCs look for. Many of our alumni have successfully raised
                capital after completing our training.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-medium">
                What is the refund policy?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                We offer a 30-day money-back guarantee. If you're not satisfied
                with your training within the first 30 days, you can request a
                full refund, no questions asked.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-medium">
                Can I access training on mobile devices?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Our platform is fully responsive and optimized for mobile
                devices. You can learn on-the-go using your smartphone or tablet
                with our mobile app available on iOS and Android.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-4"
              className="border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-medium">
                Do I get lifetime access to the materials?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes, once you enroll in a training, you get lifetime access to
                all materials, including future updates and additional content.
                You can learn at your own pace and revisit materials anytime.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-5"
              className="border border-border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-medium">
                Is there mentorship or support available?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                Yes! All programs include access to instructor Q&A sessions, a
                private community of fellow founders for peer support, and
                opportunities for direct mentorship on our advanced learning
                paths.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

    </div>
  );
}
