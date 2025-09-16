"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { 
  Award,
  Users,
  Clock,
  Shield,
  Zap,
  Heart,
  TrendingUp,
  CheckCircle,
  Star,
  Target,
  Lightbulb,
  Handshake
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const whyChooseUsData = [
  {
    id: 1,
    icon: <Lightbulb className="h-8 w-8" />,
    title: "From Dreams to Reality",
    description: "We don't just provide services - we transform your entrepreneurial dreams into successful businesses with end-to-end support.",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    stats: "500+ Dreams Realized"
  },
  {
    id: 2,
    icon: <Users className="h-8 w-8" />,
    title: "Expert Team",
    description: "Our diverse team of startup mentors, legal experts, developers, and designers brings years of experience to your project.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    stats: "50+ Specialists"
  },
  {
    id: 3,
    icon: <Shield className="h-8 w-8" />,
    title: "Legal Compliance",
    description: "Navigate complex regulations with confidence. We ensure your business meets all legal requirements from day one.",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    stats: "100% Compliance Rate"
  },
  {
    id: 4,
    icon: <Zap className="h-8 w-8" />,
    title: "Rapid Execution",
    description: "Speed matters in business. Our streamlined processes and dedicated teams ensure quick turnaround without compromising quality.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    stats: "48hr Quick Start"
  },
  {
    id: 5,
    icon: <Target className="h-8 w-8" />,
    title: "Tailored Solutions",
    description: "No two startups are alike. We customize our approach to match your unique vision, industry, and business goals.",
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    stats: "Custom Approach"
  },
  {
    id: 6,
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Proven Track Record",
    description: "Our success stories speak volumes. Join hundreds of successful entrepreneurs who trusted DreamsStartup with their journey.",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    stats: "98% Success Rate"
  }
]

const achievements = [
  {
    number: "1000+",
    label: "Startups Launched",
    icon: <Award className="h-6 w-6" />
  },
  {
    number: "50+",
    label: "Industry Experts",
    icon: <Users className="h-6 w-6" />
  },
  {
    number: "24/7",
    label: "Support Available",
    icon: <Clock className="h-6 w-6" />
  },
  {
    number: "98%",
    label: "Client Satisfaction",
    icon: <Heart className="h-6 w-6" />
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function WhyChooseUs() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section className="py-20 bg-gradient-to-br from-background via-secondary/5 to-primary/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="secondary" className="px-3 py-1">
              <Star className="h-3 w-3 mr-1" />
              Why Choose Us
            </Badge>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Why Choose
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> DreamsStartup?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            More than just a service provider, we're your strategic partner in building successful businesses. Here's what sets us apart in the startup ecosystem.
          </p>
        </motion.div>

        {/* Achievements Bar */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index}
              className="text-center"
            >
              <Card className="p-6 bg-card/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <motion.div 
                  className="flex items-center justify-center mb-3"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white">
                    {achievement.icon}
                  </div>
                </motion.div>
                <div className="text-3xl font-bold text-foreground mb-1">
                  {achievement.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {achievement.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Why Choose Us Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {whyChooseUsData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className={`group relative overflow-hidden border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer h-full ${item.bgColor}`}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <CardContent className="p-8 relative z-10 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <motion.div 
                      className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} flex-shrink-0`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </motion.div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {item.stats}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4 flex-grow overflow-hidden">
                    {item.description}
                  </p>

                  <motion.div 
                    className="flex items-center gap-2 text-primary text-sm font-medium mt-auto"
                    whileHover={{ x: 5 }}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Trusted by entrepreneurs</span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* About DreamsStartup */}
        <motion.div 
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center gap-2 mb-4"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Handshake className="h-6 w-6 text-primary" />
              <Badge variant="secondary" className="text-sm px-4 py-2">
                About DreamsStartup
              </Badge>
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Your Trusted Partner in 
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Entrepreneurial Success</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At DreamsStartup, we believe every great business begins with a dream. Since our inception, we've been dedicated to transforming entrepreneurial visions into thriving enterprises through comprehensive support and expert guidance.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is simple: to be the bridge between your startup dreams and business reality. We provide everything from initial idea validation to complete business setup, ensuring you have all the tools needed for success.
                </p>
              </div>
              
              <div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  What makes us unique is our holistic approach. We don't just offer isolated services - we provide an integrated ecosystem of solutions including legal compliance, branding, technology, and ongoing mentorship.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Join the hundreds of successful entrepreneurs who chose DreamsStartup as their launchpad. Your dream deserves the best foundation, and we're here to build it with you.
                </p>
              </div>
            </div>
          </div>

          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:shadow-xl">
              <Target className="mr-2 h-5 w-5" />
              Start Your Journey Today
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
