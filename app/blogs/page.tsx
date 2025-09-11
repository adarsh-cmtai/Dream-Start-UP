"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight, TrendingUp, BookOpen, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const featuredPost = {
  id: 1,
  title: "The Future of Remote Work: Essential Skills for 2024 and Beyond",
  excerpt:
    "As remote work becomes the new normal, discover the critical skills that will make you indispensable in the distributed workforce landscape.",
  category: "Career Development",
  author: "Sarah Johnson",
  date: "December 15, 2024",
  readTime: "8 min read",
  image: "/diverse-professionals-learning-collaboratively-in-.jpg",
  featured: true,
}

const blogPosts = [
  {
    id: 2,
    title: "AI and Machine Learning: A Complete Beginner's Roadmap for 2024",
    excerpt:
      "Your comprehensive guide to starting a career in artificial intelligence and machine learning, from basics to advanced concepts.",
    category: "Technology",
    author: "Dr. Michael Chen",
    date: "December 12, 2024",
    readTime: "12 min read",
    image: "/diverse-professionals-learning-collaboratively-in-.jpg",
  },
  {
    id: 3,
    title: "Building a Personal Brand as a Developer: From Code to Community",
    excerpt:
      "Learn how to showcase your skills, build a strong professional presence online, and stand out in the competitive tech industry.",
    category: "Career Development",
    author: "Emma Rodriguez",
    date: "December 10, 2024",
    readTime: "6 min read",
    image: "/diverse-professionals-learning-collaboratively-in-.jpg",
  },
  {
    id: 4,
    title: "The Rise of No-Code/Low-Code: What Developers Need to Know",
    excerpt:
      "Explore how no-code and low-code platforms are changing the development landscape and what it means for traditional developers.",
    category: "Technology",
    author: "James Wilson",
    date: "December 8, 2024",
    readTime: "7 min read",
    image: "/diverse-professionals-learning-collaboratively-in-.jpg",
  },
  {
    id: 5,
    title: "Data Science in 2024: Top Tools and Techniques You Should Master",
    excerpt:
      "Stay ahead of the curve with the latest data science tools, techniques, and best practices that are shaping the industry.",
    category: "Data Science",
    author: "Lisa Park",
    date: "December 5, 2024",
    readTime: "10 min read",
    image: "/diverse-professionals-learning-collaboratively-in-.jpg",
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals: Protecting Your Digital Assets",
    excerpt:
      "Essential cybersecurity practices every professional should know to protect themselves and their organizations from threats.",
    category: "Security",
    author: "Robert Davis",
    date: "December 3, 2024",
    readTime: "9 min read",
    image: "/diverse-professionals-learning-collaboratively-in-.jpg",
  },
  {
    id: 7,
    title: "The Art of Technical Communication: Writing for Developers",
    excerpt:
      "Master the skills of clear technical writing, documentation, and communication that will accelerate your career growth.",
    category: "Career Development",
    author: "Maria Garcia",
    date: "December 1, 2024",
    readTime: "5 min read",
    image: "/diverse-professionals-learning-collaboratively-in-.jpg",
  },
  {
    id: 8,
    title: "Cloud Computing Trends: What's Next for Infrastructure",
    excerpt:
      "Explore the latest trends in cloud computing, from serverless architecture to edge computing and what they mean for businesses.",
    category: "Technology",
    author: "David Kim",
    date: "November 28, 2024",
    readTime: "8 min read",
    image: "/diverse-professionals-learning-collaboratively-in-.jpg",
  },
  {
    id: 9,
    title: "UX/UI Design Principles Every Developer Should Understand",
    excerpt:
      "Bridge the gap between development and design by understanding key UX/UI principles that create better user experiences.",
    category: "Design",
    author: "Alex Thompson",
    date: "November 25, 2024",
    readTime: "7 min read",
    image: "/diverse-professionals-learning-collaboratively-in-.jpg",
  },
]

const categories = ["All", "Technology", "Career Development", "Data Science", "Security", "Design"]

const recentPosts = [
  "The Future of Remote Work: Essential Skills for 2024",
  "AI and Machine Learning: A Complete Beginner's Roadmap",
  "Building a Personal Brand as a Developer",
  "The Rise of No-Code/Low-Code Platforms",
  "Data Science Tools and Techniques for 2024",
]

const popularPosts = [
  {
    title: "Complete Full-Stack Development Guide",
    readTime: "15 min read",
    views: "12.5K",
  },
  {
    title: "Machine Learning for Beginners",
    readTime: "10 min read",
    views: "8.2K",
  },
  {
    title: "Digital Marketing Strategies That Work",
    readTime: "8 min read",
    views: "6.7K",
  },
]

export default function BlogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [email, setEmail] = useState("")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Featured Post Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="aspect-video lg:aspect-auto relative">
                <Image
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">Featured</Badge>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{featuredPost.category}</Badge>
                <h1 className="text-3xl font-heading font-bold text-foreground mb-4 leading-tight">
                  {featuredPost.title}
                </h1>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                <Button size="lg" className="w-fit">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Blog Grid */}
            <div className="lg:col-span-3">
              {/* Search and Filter */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search articles..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="bg-transparent"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Blog Posts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={400}
                        height={200}
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        {post.category}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" asChild className="p-0 h-auto">
                        <Link href={`/blogs/${post.id}`}>
                          Read More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2">
                <Button variant="outline" size="sm" disabled className="bg-transparent">
                  Previous
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  2
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  3
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Next
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Search */}
              <Card className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">Search Blog</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </Card>

              {/* Categories */}
              <Card className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.slice(1).map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Recent Posts */}
              <Card className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-4">Recent Posts</h3>
                <div className="space-y-3">
                  {recentPosts.map((post, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="block text-sm text-muted-foreground hover:text-foreground transition-colors leading-relaxed"
                    >
                      {post}
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Popular Posts */}
              <Card className="p-6">
                <h3 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Most Popular
                </h3>
                <div className="space-y-4">
                  {popularPosts.map((post, index) => (
                    <div key={index} className="space-y-1">
                      <Link
                        href="#"
                        className="block text-sm font-medium text-foreground hover:text-primary transition-colors leading-relaxed"
                      >
                        {post.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.views} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <BookOpen className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-heading font-bold">Get Learning Tips Straight to Your Inbox</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join 25,000+ professionals who receive our weekly newsletter with the latest insights, tips, and career
              advice.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-foreground border-white/20"
                required
              />
              <Button type="submit" variant="secondary" className="bg-white text-secondary hover:bg-white/90">
                Subscribe
              </Button>
            </form>
            <p className="text-sm opacity-75">No spam, unsubscribe at any time.</p>
          </div>
        </div>
      </section>

      {/* Most Popular Posts */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Most Popular Articles</h2>
            <p className="text-xl text-muted-foreground">
              Discover our most-read articles that have helped thousands of professionals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={400}
                    height={200}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{post.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{post.readTime}</span>
                    </div>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/blogs/${post.id}`}>Read More</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Liked this article? Master the topic in our courses.
            </h3>
            <p className="text-muted-foreground mb-6">
              Take your learning to the next level with our comprehensive training programs designed by industry
              experts.
            </p>
            <Button size="lg" asChild>
              <Link href="/training">
                Explore Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
