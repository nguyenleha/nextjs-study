"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Palette,
  Code,
  Database,
  Smartphone
} from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Palette,
    title: "shadcn/ui",
    description: "Beautiful, accessible components built with Radix UI and Tailwind CSS",
    color: "bg-blue-500"
  },
  {
    icon: Zap,
    title: "Framer Motion",
    description: "Production-ready motion library for React with smooth animations",
    color: "bg-purple-500"
  },
  {
    icon: Code,
    title: "React Hook Form",
    description: "Performant, flexible and extensible forms with easy validation",
    color: "bg-green-500"
  },
  {
    icon: Shield,
    title: "Zod",
    description: "TypeScript-first schema validation with static type inference",
    color: "bg-orange-500"
  },
  {
    icon: Database,
    title: "Next.js 15",
    description: "The React framework for production with App Router and Server Components",
    color: "bg-black"
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Mobile-first design with Tailwind CSS and modern CSS features",
    color: "bg-pink-500"
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            <Sparkles className="h-4 w-4" />
            Next.js with Popular Libraries
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Modern Web Development
            <br />
            <span className="text-primary">Made Simple</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of the most popular and powerful libraries in the React ecosystem,
            all working together seamlessly in a Next.js application.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/dashboard">
                Explore Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/forms">
                Try Forms
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Powered by Industry Leaders
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Each library has been carefully selected for its performance,
            developer experience, and community support.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {feature.title}
                      <Badge variant="secondary">Popular</Badge>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Explore the different sections to see each library in action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link href="/animations">
                    View Animations
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link href="/charts">
                    See Charts
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </div>
  )
}