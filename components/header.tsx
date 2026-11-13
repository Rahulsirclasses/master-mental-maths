"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, LogIn, LogOut, User, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { FaviconLogo } from "@/components/favicon-logo"
import { useSession, signOut } from "next-auth/react"
import { triggerPWAInstall } from "@/components/pwa-install"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { href: "/practice", label: "Practice", color: "hover:text-sky-400" },
    { href: "/flashcards", label: "Flashcards", color: "hover:text-purple-400" },
    { href: "/analytics", label: "Analytics", color: "hover:text-pink-400" },
    { href: "/learning", label: "Learning Zone", color: "hover:text-orange-400" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${isScrolled ? "bg-black/90 backdrop-blur-xl shadow-2xl border-b border-gray-700/50" : "bg-transparent"
        }`}
    >
      <div className="container flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-purple-500 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 p-1">
                <FaviconLogo size={40} className="transition-all duration-300 group-hover:scale-110" />
              </div>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
              Speed Maths Mastery
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-all duration-300 text-gray-300 ${item.color} hover:scale-105 relative group`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
                    {/* PWA Install Button */}
          <button
            onClick={triggerPWAInstall}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/40 text-emerald-300 hover:text-white text-xs font-bold transition"
            title="Install App"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Install App</span>
            <span className="text-[10px] bg-emerald-500/30 px-1 rounded">APK</span>
          </button>

          {session?.user?.role === 'admin' && (
            <Link
              href="/dashboard/admin"
              className="text-sm font-bold transition-all duration-300 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 hover:scale-105 relative group"
            >
              Admin
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          )}

          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border border-gray-700">
                    <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-sky-500 to-purple-500 text-white">
                      {session.user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800 text-gray-200" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">{session.user?.name}</p>
                    <p className="text-xs leading-none text-gray-400">{session.user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
                    <User className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                {session.user.role === 'admin' && (
                  <>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Admin
                    </DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/admin" className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
                        <div className="flex items-center">
                          <span className="mr-2 h-4 w-4 text-sky-400 flex items-center justify-center font-bold">ðŸ›¡ï¸</span>
                          <span className="text-sky-400">User Management</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin" className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800">
                        <div className="flex items-center">
                          <span className="mr-2 h-4 w-4 text-purple-400 flex items-center justify-center font-bold">âš™ï¸</span>
                          <span className="text-purple-400">Content Panel</span>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem
                  className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-950/20 focus:bg-red-950/20 focus:text-red-300"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log in
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="btn-gradient">
                  Sign up
                </Button>
              </Link>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl transition-all duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Enhanced Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-700/50 backdrop-blur-xl">
          <nav className="flex flex-col p-6 space-y-4 bg-black/95">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="group px-4 py-3 text-sm font-medium rounded-xl hover:bg-gray-800/50 text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <span>{item.label}</span>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </Link>
            ))}
                      {/* PWA Install Button */}
          <button
            onClick={triggerPWAInstall}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/40 text-emerald-300 hover:text-white text-xs font-bold transition"
            title="Install App"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Install App</span>
            <span className="text-[10px] bg-emerald-500/30 px-1 rounded">APK</span>
          </button>

          {session?.user?.role === 'admin' && (
              <Link
                href="/dashboard/admin"
                className="group px-4 py-3 text-sm font-bold rounded-xl hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <span>Admin Panel</span>
                  <div className="w-2 h-2 rounded-full bg-yellow-500 opacity-100"></div>
                </div>
              </Link>
            )}

            <div className="border-t border-gray-800 pt-4 mt-2">
              {session ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2 mb-2">
                    <Avatar className="h-8 w-8 border border-gray-700">
                      <AvatarImage src={session.user?.image || ""} />
                      <AvatarFallback className="bg-gradient-to-br from-sky-500 to-purple-500 text-white">
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white">{session.user?.name}</span>
                      <span className="text-xs text-gray-400">{session.user?.email}</span>
                    </div>
                  </div>
                  <Link
                    href="/settings"
                    className="flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-gray-800/50 text-gray-300 hover:text-white transition-all duration-300"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl hover:bg-red-950/20 text-red-400 transition-all duration-300 text-left"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800">
                      <LogIn className="mr-2 h-4 w-4" />
                      Log in
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button className="w-full btn-gradient">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

