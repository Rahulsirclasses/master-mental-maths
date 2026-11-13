"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MotivationalQuote } from "@/components/motivational-quote"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Award, Target } from "lucide-react"

const weeklyData = [
  { day: "Mon", cpm: 12, accuracy: 85 },
  { day: "Tue", cpm: 18, accuracy: 88 },
  { day: "Wed", cpm: 15, accuracy: 90 },
  { day: "Thu", cpm: 22, accuracy: 92 },
  { day: "Fri", cpm: 26, accuracy: 89 },
  { day: "Sat", cpm: 24, accuracy: 94 },
  { day: "Sun", cpm: 30, accuracy: 95 },
]

const weakestConcepts = [
  { name: "Successive % Changes", progress: 35 },
  { name: "Cube Roots", progress: 42 },
  { name: "Reverse % Change", progress: 58 },
]

export function AnalyticsScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="container px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-full mb-4">
              <BarChart3 className="h-3 w-3 text-pink-400" />
              <span className="text-xs font-medium text-pink-400">Analytics Dashboard</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white">Analytics Dashboard</h1>
            <p className="text-gray-400 mb-4 text-sm">Track your progress and identify areas for improvement</p>
          </div>
          <div className="w-full md:w-auto">
            <MotivationalQuote />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="bg-gradient-to-br from-sky-500/10 to-sky-600/10 backdrop-blur-sm border border-sky-500/20 hover:border-sky-400 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Calculations Per Minute</CardTitle>
              <CardDescription className="text-gray-500 text-xs">Average speed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">24 CPM</div>
              <p className="text-xs text-gray-400">
                <span className="text-sky-400">↑ 12%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Accuracy</CardTitle>
              <CardDescription className="text-gray-500 text-xs">Correct answers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">92%</div>
              <p className="text-xs text-gray-400">
                <span className="text-purple-400">↑ 4%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 backdrop-blur-sm border border-pink-500/20 hover:border-pink-400 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Current Streak</CardTitle>
              <CardDescription className="text-gray-500 text-xs">Consecutive days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">5 days</div>
              <p className="text-xs text-gray-400">Keep it up! 💪</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-sm border border-orange-500/20 hover:border-orange-400 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">XP Points</CardTitle>
              <CardDescription className="text-gray-500 text-xs">Experience points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-white">1,250 XP</div>
              <p className="text-xs text-gray-400">
                <span className="text-orange-400">↑ 320</span> this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Progress */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="md:col-span-2 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-sky-400" />
                Weekly Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="cpm">
                <TabsList className="mb-4 bg-gray-900/50 border border-gray-700/50">
                  <TabsTrigger
                    value="cpm"
                    className="text-gray-300 data-[state=active]:bg-sky-600 data-[state=active]:text-white text-xs rounded-lg transition-all duration-300"
                  >
                    Calculations/Min
                  </TabsTrigger>
                  <TabsTrigger
                    value="accuracy"
                    className="text-gray-300 data-[state=active]:bg-purple-600 data-[state=active]:text-white text-xs rounded-lg transition-all duration-300"
                  >
                    Accuracy
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="cpm">
                  <ChartContainer
                    config={{
                      cpm: {
                        label: "CPM",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyData}>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="cpm"
                          stroke="var(--color-cpm)"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>

                <TabsContent value="accuracy">
                  <ChartContainer
                    config={{
                      accuracy: {
                        label: "Accuracy %",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyData}>
                        <XAxis dataKey="day" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="accuracy"
                          stroke="var(--color-accuracy)"
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-400" />
                Weakest Concepts
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs">Areas that need improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weakestConcepts.map((concept) => (
                  <div key={concept.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-300">{concept.name}</span>
                      <span className="text-xs text-gray-400">{concept.progress}%</span>
                    </div>
                    <Progress value={concept.progress} className="h-2 bg-gray-800" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements and Milestones */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Award className="h-4 w-4 text-sky-400" />
                Achievements
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs">Badges and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-sky-500/10 text-sky-400 border-sky-500/30 text-xs">
                  5-Day Streak
                </Badge>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 text-xs">
                  Speed Demon
                </Badge>
                <Badge variant="outline" className="bg-pink-500/10 text-pink-400 border-pink-500/30 text-xs">
                  Percentage Pro
                </Badge>
                <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30 text-xs">
                  100 Problems Solved
                </Badge>
                <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
                  90%+ Accuracy
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">Next Milestones</CardTitle>
              <CardDescription className="text-gray-400 text-xs">Goals to achieve</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-300">10-Day Streak</span>
                    <span className="text-xs text-gray-400">5/10 days</span>
                  </div>
                  <Progress value={50} className="h-2 bg-gray-800" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-300">Master Cube Roots</span>
                    <span className="text-xs text-gray-400">42%</span>
                  </div>
                  <Progress value={42} className="h-2 bg-gray-800" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-300">Reach 30 CPM</span>
                    <span className="text-xs text-gray-400">80%</span>
                  </div>
                  <Progress value={80} className="h-2 bg-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
