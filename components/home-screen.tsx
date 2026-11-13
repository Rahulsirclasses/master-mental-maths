"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MotivationalQuote } from "@/components/motivational-quote"
import { ArrowRight, Brain, Calculator, ChevronDown, Zap, Star, Trophy, Target } from "lucide-react"

export function HomeScreen() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features-section")
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative py-8 md:py-12 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-sky-500/5 to-transparent rounded-full"></div>
        </div>

        {/* Floating Math Symbols */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 text-6xl text-sky-500/20 animate-float-slow">∑</div>
          <div className="absolute top-3/4 right-1/4 text-4xl text-purple-500/20 animate-float-slow delay-500">π</div>
          <div className="absolute top-1/2 left-1/6 text-5xl text-pink-500/20 animate-float-slow delay-1000">∞</div>
          <div className="absolute bottom-1/4 left-3/4 text-3xl text-orange-500/20 animate-float-slow delay-1500">
            √
          </div>
        </div>

        <div className="container relative z-10 px-4 mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1 text-center lg:text-left">
              {/* Enhanced Title */}
              <div className="mb-4">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight mb-3 leading-tight">
                  <span className="bg-gradient-to-r from-sky-400 via-sky-500 to-purple-500 bg-clip-text text-transparent animate-gradient">
                    Master
                  </span>
                  <br />
                  <span className="text-white">Speed Maths</span>
                </h1>
                <div className="h-1 w-24 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full mx-auto lg:mx-0 animate-pulse"></div>
              </div>

              <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Transform your calculation speed with{" "}
                <span className="text-sky-400 font-semibold">proven techniques</span> from Rahul Sir Classes. Calculate
                faster than a calculator.
              </p>

              {/* Enhanced CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/practice">
                  <Button
                    size="lg"
                    className="group text-base px-8 py-4 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white border-0 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Start Training Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-4 border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-sky-500 rounded-2xl backdrop-blur-sm transition-all duration-300 bg-transparent"
                  onClick={scrollToFeatures}
                >
                  Learn More
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Enhanced Feature Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {[
                  { icon: Zap, text: "Boost calculation speed", color: "text-sky-400" },
                  { icon: Brain, text: "Enhance calculation agility", color: "text-purple-400" },
                  { icon: Calculator, text: "Master percentage tricks", color: "text-pink-400" },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all duration-300 hover:scale-105"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 flex items-center justify-center">
                      <feature.icon className={`h-4 w-4 ${feature.color}`} />
                    </div>
                    <span className="text-xs font-medium text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Hero Image */}
            <div className="lg:flex-1 w-full max-w-md mx-auto relative">
              <div className="relative z-10">
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-2xl blur-xl opacity-30 animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-2 rounded-2xl border border-gray-700/50">
                  <img
                    src="/rahul-sir-hero.png"
                    alt="Rahul Sir - Speed Maths Expert and Founder"
                    className="w-full h-auto object-cover rounded-xl shadow-2xl"
                  />
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-sky-400 to-sky-600 rounded-xl opacity-20 animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl opacity-20 animate-float delay-1000"></div>
              <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full opacity-20 animate-bounce-slow"></div>
            </div>
          </div>

          {/* Enhanced Quote Section */}
          <div className="mt-12 max-w-3xl mx-auto">
            <MotivationalQuote />
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features-section" className="py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-950/50 to-transparent"></div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full mb-4">
              <Star className="h-3 w-3 text-sky-400" />
              <span className="text-xs font-medium text-sky-400">Why Choose Us</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
              Speed Maths <span className="text-sky-400">Mastery</span>
            </h2>
            <p className="text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Our proven methodology has helped thousands of students excel in competitive exams and real-world
              scenarios.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                href: "/practice",
                icon: "🔢",
                title: "Start Practice",
                description: "Train your speed calculation skills with various exercises",
                color: "sky",
                gradient: "from-sky-500/10 to-sky-600/10",
                border: "border-sky-500/20",
                hover: "hover:border-sky-400",
              },
              {
                href: "/flashcards",
                icon: "🔄",
                title: "Flashcards",
                description: "Master concepts with interactive flashcards",
                color: "purple",
                gradient: "from-purple-500/10 to-purple-600/10",
                border: "border-purple-500/20",
                hover: "hover:border-purple-400",
              },
              {
                href: "/analytics",
                icon: "📈",
                title: "Analytics",
                description: "Track your progress and identify areas for improvement",
                color: "pink",
                gradient: "from-pink-500/10 to-pink-600/10",
                border: "border-pink-500/20",
                hover: "hover:border-pink-400",
              },
              {
                href: "/settings",
                icon: "⚙️",
                title: "Settings",
                description: "Customize your experience and preferences",
                color: "orange",
                gradient: "from-orange-500/10 to-orange-600/10",
                border: "border-orange-500/20",
                hover: "hover:border-orange-400",
              },
            ].map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card
                  className={`group h-full bg-gradient-to-br ${feature.gradient} backdrop-blur-sm border ${feature.border} ${feature.hover} transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
                >
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 text-${feature.color}-400`}>{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/learning">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 px-6 py-3 border-2 border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-sky-500 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105 bg-transparent"
              >
                <span className="text-base">🧠</span>
                <span>Explore Learning Zone</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonial Section */}
      <section className="py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-purple-500/5"></div>

        <div className="container px-4 mx-auto relative z-10">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="relative w-24 h-24 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full blur-lg opacity-30"></div>
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-gray-600 shadow-2xl">
                      <img src="/rahul-sir-hero.png" alt="Rahul Sir" className="object-cover w-full h-full" />
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1">
                    <div className="w-6 h-6 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full flex items-center justify-center">
                      <Trophy className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/10 border border-sky-500/20 rounded-full mb-3">
                    <Target className="h-3 w-3 text-sky-400" />
                    <span className="text-xs font-medium text-sky-400">Founder's Message</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">Rahul Sir's Methodology</h3>
                </div>

                <blockquote className="text-lg italic mb-6 text-gray-300 leading-relaxed">
                  "Speed maths isn't about being a genius. It's about learning patterns and practicing techniques that
                  anyone can master with the right guidance."
                </blockquote>

                <div className="flex items-center justify-center gap-2">
                  <div className="h-1 w-6 bg-gradient-to-r from-sky-500 to-purple-500 rounded-full"></div>
                  <p className="text-sm text-gray-500 font-medium">Founder, Rahul Sir Classes</p>
                  <div className="h-1 w-6 bg-gradient-to-r from-purple-500 to-sky-500 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
