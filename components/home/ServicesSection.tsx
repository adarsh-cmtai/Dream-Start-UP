"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Rocket,
  Palette,
  ChefHat,
  Building,
  Smartphone,
  Briefcase,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Target,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    id: 1,
    title: "Startup & Business Solutions",
    icon: <Rocket className="h-8 w-8" />,
    description:
      "From idea to execution - complete startup support with legal compliance and mentorship guidance.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    features: [
      "Idea to Execution Support",
      "Business Registration (Startup India, GST)",
      "Legal & Compliance Solutions",
      "Mentorship & Guidance",
    ],
    popular: true,
    rating: 4.9,
    clients: "500+",
  },
  {
    id: 2,
    title: "Company Branding & Promotion",
    icon: <Palette className="h-8 w-8" />,
    description:
      "Complete branding solutions from logo design to social media for maximum brand impact.",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    features: [
      "Logo Design (2D/3D)",
      "Website & Homepage Design",
      "Social Media Marketing",
      "Instagram & Reel Promotions",
    ],
    popular: false,
    rating: 4.8,
    clients: "300+",
  },
  {
    id: 3,
    title: "Food & Hospitality Support",
    icon: <ChefHat className="h-8 w-8" />,
    description:
      "Comprehensive cloud kitchen setup with all legal licenses and custom branding solutions.",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    features: [
      "Cloud Kitchen Setup Packages",
      "FSSAI / Food License Registration",
      "Hotel & Restaurant Licenses",
      "Kitchen Branding & Website",
    ],
    popular: false,
    rating: 4.7,
    clients: "150+",
  },
  {
    id: 4,
    title: "Tech Solutions",
    icon: <Smartphone className="h-8 w-8" />,
    description:
      "Custom mobile app development for Android & iOS with AI integration and modern solutions.",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    features: [
      "Mobile App Development",
      "AI Tools Integration",
      "E-commerce Solutions",
      "Custom App Development",
    ],
    popular: true,
    rating: 4.9,
    clients: "200+",
  },
  {
    id: 5,
    title: "Corporate Support",
    icon: <Briefcase className="h-8 w-8" />,
    description:
      "Professional business presentations, company profiles, and comprehensive reporting solutions.",
    color: "from-gray-600 to-gray-800",
    bgColor: "bg-gray-50 dark:bg-gray-950/20",
    features: [
      "Monthly/Annual Reports",
      "Company Profiles",
      "Business Presentations",
      "Professional Documentation",
    ],
    popular: false,
    rating: 4.6,
    clients: "400+",
  },
  {
    id: 6,
    title: "Training & Workshops",
    icon: <GraduationCap className="h-8 w-8" />,
    description:
      "Comprehensive startup training programs, group discussions and interactive learning sessions.",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
    features: [
      "Startup Training Programs",
      "Group Discussions",
      "Learning Sessions",
      "Skill Development",
    ],
    popular: false,
    rating: 4.8,
    clients: "250+",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

interface ServicesProps {
  showAll?: boolean;
  maxServices?: number;
}

export default function ServicesComponent({
  showAll = false,
  maxServices = 6,
}: ServicesProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const displayedServices = showAll ? services : services.slice(0, maxServices);

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

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
              <Zap className="h-3 w-3 mr-1" />
              Our Services
            </Badge>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Empowering Your
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}
              Dreams
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From startup inception to scaling success - we provide comprehensive
            solutions to transform your business ideas into thriving
            enterprises.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayedServices.map((service, index) => (
            <motion.div key={service.id} whileHover="hover">
              <Card
                className={`group relative overflow-hidden border-0 shadow-lg bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer ${service.bgColor}`}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() =>
                  setExpandedService(
                    expandedService === service.id ? null : service.id
                  )
                }
              >
                <motion.div>
                  {/* Popular badge */}
                  {service.popular && (
                    <motion.div
                      className="absolute top-4 right-4 z-10"
                      initial={{ rotate: -12, scale: 0 }}
                      animate={{ rotate: -12, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 border-0">
                        <Star className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    </motion.div>
                  )}

                  {/* Gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`p-3 rounded-2xl bg-gradient-to-br ${service.color}`}
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="text-white">{service.icon}</div>
                      </motion.div>

                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {service.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {service.clients}
                        </div>
                      </div>
                    </div>

                    <CardTitle className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>

                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="h-[150px] flex flex-col justify-between">
                    <motion.div
                      className="space-y-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {service.features
                        .slice(
                          0,
                          expandedService === service.id
                            ? service.features.length
                            : 2
                        )
                        .map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                          >
                            <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </motion.div>
                        ))}

                      {service.features.length > 2 &&
                        expandedService !== service.id && (
                          <motion.div
                            className="flex items-center gap-2 text-primary text-sm font-medium cursor-pointer"
                            whileHover={{ x: 5 }}
                          >
                            <span>
                              +{service.features.length - 2} more features
                            </span>
                            <ArrowRight className="h-3 w-3" />
                          </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                      className="mt-6"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        className={`w-full bg-gradient-to-r ${service.color} hover:shadow-lg transition-all duration-300 border-0`}
                        size="sm"
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action */}
        {!showAll && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:shadow-xl"
              >
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
