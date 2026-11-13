"use client"

import { useState } from "react"
import { Bell, Camera, Upload, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { MotivationalQuote } from "@/components/motivational-quote"

export function SettingsScreen() {
  const [showQuotes, setShowQuotes] = useState(true)
  const [dailyReminders, setDailyReminders] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="container px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-500/10 border border-gray-500/20 rounded-full mb-4">
              <Settings className="h-3 w-3 text-gray-400" />
              <span className="text-xs font-medium text-gray-400">Settings</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3 text-white">Settings</h1>
            <p className="text-gray-400 mb-4 text-sm">Customize your experience and preferences</p>
          </div>
          <div className="w-full md:w-auto">
            <MotivationalQuote />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Card */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <User className="h-4 w-4 text-sky-400" />
                Profile
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs">Manage your profile settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full overflow-hidden bg-gradient-to-br from-sky-500/20 to-purple-500/20 border-2 border-gray-600">
                    <img src="/student-avatar.png" alt="Profile" className="h-full w-full object-cover" />
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-gray-800 border border-gray-600 hover:bg-gray-700"
                  >
                    <Camera className="h-3 w-3" />
                    <span className="sr-only">Change profile photo</span>
                  </Button>
                </div>
                <Button variant="outline" className="gap-2 border-gray-600 text-gray-300 hover:bg-gray-800 text-xs">
                  <Upload className="h-3 w-3" />
                  <span>Upload Photo</span>
                </Button>
              </div>

              <Separator className="bg-gray-700" />

              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-xs text-gray-300">
                    Display Name
                  </Label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    className="flex h-8 w-full rounded-md border border-gray-600 bg-gray-900/50 px-3 py-2 text-xs text-white ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-xs text-gray-300">
                    Email
                  </Label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="flex h-8 w-full rounded-md border border-gray-600 bg-gray-900/50 px-3 py-2 text-xs text-white ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-white text-lg">Preferences</CardTitle>
              <CardDescription className="text-gray-400 text-xs">Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="quotes-toggle" className="text-xs text-gray-300">
                      Motivational Quotes
                    </Label>
                    <p className="text-xs text-gray-500">Show Rahul Sir's motivational quotes</p>
                  </div>
                  <Switch id="quotes-toggle" checked={showQuotes} onCheckedChange={setShowQuotes} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reminders-toggle" className="text-xs text-gray-300">
                      Daily Reminders
                    </Label>
                    <p className="text-xs text-gray-500">Receive daily practice reminders</p>
                  </div>
                  <Switch id="reminders-toggle" checked={dailyReminders} onCheckedChange={setDailyReminders} />
                </div>

                <Separator className="bg-gray-700" />

                <div className="space-y-2">
                  <Label htmlFor="reminder-time" className="text-xs text-gray-300">
                    Reminder Time
                  </Label>
                  <div className="flex items-center gap-2">
                    <Bell className="h-3 w-3 text-gray-400" />
                    <select
                      id="reminder-time"
                      className="flex h-8 w-full rounded-md border border-gray-600 bg-gray-900/50 px-3 py-2 text-xs text-white ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!dailyReminders}
                    >
                      <option value="morning">Morning (8:00 AM)</option>
                      <option value="afternoon">Afternoon (2:00 PM)</option>
                      <option value="evening">Evening (6:00 PM)</option>
                      <option value="night">Night (9:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
