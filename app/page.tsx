"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  Calculator,
  Shield,
  Brain,
  Users,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Crown,
  Sun,
} from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-uganda-cream via-uganda-sunlight to-uganda-silver dark:from-uganda-charcoal dark:via-uganda-slate dark:to-uganda-black">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-uganda-pride rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient-uganda">
              U-Retire
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="#features"
              className="text-sm font-medium text-uganda-charcoal hover:text-uganda-black dark:text-uganda-silver dark:hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-uganda-charcoal hover:text-uganda-black dark:text-uganda-silver dark:hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-uganda-charcoal hover:text-uganda-black dark:text-uganda-silver dark:hover:text-white transition-colors"
            >
              Testimonials
            </a>
            <Button
              variant="outline"
              className="mr-4 border-uganda-red text-uganda-red hover:bg-uganda-red hover:text-white"
            >
              <a href="/sign-in">Sign In</a>
            </Button>
            <Button className="bg-uganda-sunrise hover:bg-uganda-sunset text-white">
              <a href="/sign-up">Get Started</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1 bg-uganda-yellow text-uganda-charcoal border-uganda-yellow"
          >
            <Sun className="w-3 h-3 mr-1" />
            Proudly Ugandan
          </Badge>

          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-gradient-uganda">Smart Retirement</span>
            <br />
            <span className="text-uganda-charcoal dark:text-white">
              For Uganda&apos;s Civil Servants
            </span>
          </motion.h1>

          <motion.p
            className="text-xl text-uganda-slate dark:text-uganda-silver max-w-3xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Leverage artificial intelligence to plan, manage, and optimize your
            civil service retirement. Get personalized insights, accurate
            projections, and peace of mind for your golden years in the Pearl of
            Africa.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-uganda-sunrise hover:bg-uganda-sunset text-white px-8 py-3 text-lg"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg border-2 border-uganda-red text-uganda-red hover:bg-uganda-red hover:text-white"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats with Uganda Colors */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-center p-4 rounded-lg bg-uganda-yellow/10 border border-uganda-yellow/20">
              <div className="text-3xl font-bold text-uganda-charcoal dark:text-white">
                10K+
              </div>
              <div className="text-sm text-uganda-slate dark:text-uganda-silver">
                Civil Servants
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-uganda-red/10 border border-uganda-red/20">
              <div className="text-3xl font-bold text-uganda-charcoal dark:text-white">
                UGX 5B+
              </div>
              <div className="text-sm text-uganda-slate dark:text-uganda-silver">
                Pensions Managed
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-uganda-black/10 border border-uganda-black/20">
              <div className="text-3xl font-bold text-uganda-charcoal dark:text-white">
                99%
              </div>
              <div className="text-sm text-uganda-slate dark:text-uganda-silver">
                Accuracy Rate
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-uganda-grass/10 border border-uganda-grass/20">
              <div className="text-3xl font-bold text-uganda-charcoal dark:text-white">
                24/7
              </div>
              <div className="text-sm text-uganda-slate dark:text-uganda-silver">
                AI Support
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container mx-auto px-6 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-uganda-charcoal dark:text-white mb-4">
            Built for Uganda&apos;s Civil Service
          </h2>
          <p className="text-xl text-uganda-slate dark:text-uganda-silver max-w-2xl mx-auto">
            Advanced AI technology tailored for Uganda&apos;s unique retirement
            landscape
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UgandaFeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="AI-Powered Projections"
            description="Get accurate retirement benefit predictions using machine learning trained on Ugandan civil service data."
            color="yellow"
          />
          <UgandaFeatureCard
            icon={<Calculator className="w-8 h-8" />}
            title="UGX Pension Calculators"
            description="Interactive tools to simulate different retirement scenarios in Uganda Shillings."
            color="red"
          />
          <UgandaFeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="PSPF Compliant"
            description="Fully compliant with Uganda's Public Service Pension Fund regulations and requirements."
            color="black"
          />
          <UgandaFeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Local Investment Guidance"
            description="AI-driven investment recommendations for Uganda's financial markets."
            color="grass"
          />
          <UgandaFeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Multi-Ministry Access"
            description="Seamless coordination across all Uganda government ministries and departments."
            color="sky"
          />
          <UgandaFeatureCard
            icon={<Clock className="w-8 h-8" />}
            title="Lifetime Support"
            description="Continuous monitoring and support throughout your retirement journey in Uganda."
            color="sun"
          />
        </div>
      </section>

      {/* AI Assistant Preview */}
      <section className="bg-uganda-cream dark:bg-uganda-charcoal py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge
                variant="secondary"
                className="mb-4 bg-uganda-red text-white border-uganda-red"
              >
                AI Assistant
              </Badge>
              <h2 className="text-4xl font-bold text-uganda-charcoal dark:text-white mb-6">
                Meet PensionPal AI
              </h2>
              <p className="text-lg text-uganda-slate dark:text-uganda-silver mb-8 leading-relaxed">
                Our advanced AI assistant understands Uganda&apos;s pension laws
                and provides personalized retirement guidance in multiple local
                languages.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-uganda-grass" />
                  <span className="text-uganda-charcoal dark:text-uganda-silver">
                    24/7 personalized support
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-uganda-grass" />
                  <span className="text-uganda-charcoal dark:text-uganda-silver">
                    Uganda shilling calculations
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-uganda-grass" />
                  <span className="text-uganda-charcoal dark:text-uganda-silver">
                    Local language support
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-uganda-grass" />
                  <span className="text-uganda-charcoal dark:text-uganda-silver">
                    PSPF regulation compliant
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="bg-uganda-savannah border-0 shadow-2xl">
                <CardContent className="p-6">
                  <div className="bg-white dark:bg-uganda-slate rounded-lg p-4 shadow-lg mb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-8 h-8 bg-uganda-pride rounded-full flex items-center justify-center">
                        <Brain className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-uganda-charcoal dark:text-white">
                          PensionPal AI
                        </div>
                        <div className="text-xs text-uganda-slate">
                          Online - Speaks Luganda & English
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-uganda-yellow/20 rounded-lg p-3 text-sm text-uganda-charcoal">
                        Hello! I can help you calculate your estimated monthly
                        pension in Uganda Shillings.
                      </div>
                      <div className="bg-uganda-silver rounded-lg p-3 text-sm text-uganda-charcoal ml-8">
                        I have 25 years of service and my final salary is UGX
                        1,500,000. What will my pension be?
                      </div>
                      <div className="bg-uganda-yellow/20 rounded-lg p-3 text-sm text-uganda-charcoal">
                        Based on PSPF guidelines, your estimated monthly pension
                        would be approximately UGX 562,500. Oli mukwano?
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-uganda-pride py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Secure Your Retirement?
          </h2>
          <p className="text-xl text-uganda-sunlight mb-8 max-w-2xl mx-auto">
            Join Uganda&apos;s civil servants who trust U-Retire for their
            retirement planning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-uganda-charcoal hover:bg-uganda-sunlight px-8 py-3 text-lg"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-uganda-charcoal px-8 py-3 text-lg"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-uganda-black text-uganda-silver py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-uganda-pride rounded flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
                <span className="text-white font-bold">U-Retire</span>
              </div>
              <p className="text-sm">
                AI-powered retirement management for Uganda&apos;s civil
                servants. Secure your future with intelligent planning.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="hover:text-uganda-yellow transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-uganda-yellow transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-uganda-yellow transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-uganda-yellow transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-uganda-yellow transition-colors"
                  >
                    Contact PSPF
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-uganda-yellow transition-colors"
                  >
                    Ministry Guidelines
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="hover:text-uganda-yellow transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-uganda-yellow transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-uganda-yellow transition-colors"
                  >
                    PSPF Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-uganda-charcoal mt-8 pt-8 text-center text-sm">
            <p>
              &copy; 2024 U-Retire. Proudly serving Uganda&apos;s Civil Service.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Uganda-themed Feature Card Component
const UgandaFeatureCard = ({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: "yellow" | "red" | "black" | "grass" | "sky" | "sun"
}) => {
  const colorClasses = {
    yellow: "bg-uganda-yellow text-uganda-charcoal",
    red: "bg-uganda-red text-white",
    black: "bg-uganda-black text-white",
    grass: "bg-uganda-grass text-white",
    sky: "bg-uganda-sky text-white",
    sun: "bg-uganda-sun text-uganda-charcoal",
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-uganda-slate">
        <CardContent className="p-6">
          <div
            className={`w-12 h-12 ${colorClasses[color]} rounded-lg flex items-center justify-center mb-4`}
          >
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-uganda-charcoal dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-uganda-slate dark:text-uganda-silver leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Step Card Component
const StepCard = ({
  step,
  title,
  description,
  icon,
}: {
  step: string
  title: string
  description: string
  icon: React.ReactNode
}) => (
  <div className="text-center">
    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
      {step}
    </div>
    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-400">{description}</p>
  </div>
)
