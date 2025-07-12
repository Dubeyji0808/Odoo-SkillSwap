"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Star, User, ChevronLeft, ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for demonstration
const mockProfiles = [
  {
    id: 1,
    name: "Sarah Chen",
    photo: "/placeholder.svg?height=80&width=80",
    skillsOffered: ["React", "TypeScript", "Node.js"],
    skillsWanted: ["Python", "Machine Learning"],
    rating: 4.8,
    availability: "Weekends",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    photo: "/placeholder.svg?height=80&width=80",
    skillsOffered: ["Python", "Data Science", "SQL"],
    skillsWanted: ["React", "Frontend Development"],
    rating: 4.9,
    availability: "Evenings",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    photo: "/placeholder.svg?height=80&width=80",
    skillsOffered: ["UI/UX Design", "Figma", "Prototyping"],
    skillsWanted: ["JavaScript", "Web Development"],
    rating: 4.7,
    availability: "Flexible",
  },
  {
    id: 4,
    name: "David Kim",
    photo: "/placeholder.svg?height=80&width=80",
    skillsOffered: ["Machine Learning", "TensorFlow", "Python"],
    skillsWanted: ["Cloud Computing", "AWS"],
    rating: 4.6,
    availability: "Weekends",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    photo: "/placeholder.svg?height=80&width=80",
    skillsOffered: ["Digital Marketing", "SEO", "Content Strategy"],
    skillsWanted: ["Analytics", "Data Visualization"],
    rating: 4.8,
    availability: "Evenings",
  },
  {
    id: 6,
    name: "Ahmed Hassan",
    photo: "/placeholder.svg?height=80&width=80",
    skillsOffered: ["DevOps", "Docker", "Kubernetes"],
    skillsWanted: ["Mobile Development", "React Native"],
    rating: 4.9,
    availability: "Flexible",
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const profilesPerPage = 6
  const totalPages = Math.ceil(mockProfiles.length / profilesPerPage)

  // Filter profiles based on search and availability
  const filteredProfiles = mockProfiles.filter((profile) => {
    const matchesSearch =
      searchTerm === "" ||
      profile.skillsOffered.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      profile.skillsWanted.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      profile.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAvailability =
      availabilityFilter === "all" || profile.availability.toLowerCase() === availabilityFilter.toLowerCase()

    return matchesSearch && matchesAvailability
  })

  // Paginate filtered results
  const startIndex = (currentPage - 1) * profilesPerPage
  const paginatedProfiles = filteredProfiles.slice(startIndex, startIndex + profilesPerPage)

  const handleSearch = () => {
    setCurrentPage(1) // Reset to first page when searching
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                SkillSwap
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/landing" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/swap-requests" className="text-gray-600 hover:text-gray-900">
                Swap Requests
              </Link>
              <Link
                href="/"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profile" />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem asChild>
                      <Link href="/profile/1">My Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/edit-profile">Edit Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/swap-requests">Swap Requests</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Skills</h1>
          <p className="text-gray-600">Find people to swap skills with and grow together</p>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by skill or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="sm:w-48">
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Availability</SelectItem>
                  <SelectItem value="weekends">Weekends</SelectItem>
                  <SelectItem value="evenings">Evenings</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSearch} className="sm:w-auto">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Profile Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedProfiles.map((profile) => (
            <Card key={profile.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  {/* Profile Photo and Basic Info */}
                  <div className="flex flex-col items-center sm:items-start">
                    <Link href={`/profile/${profile.id}`}>
                      <Avatar className="w-16 h-16 cursor-pointer hover:opacity-80">
                        <AvatarImage src={profile.photo || "/placeholder.svg"} alt={profile.name} />
                        <AvatarFallback>
                          <User className="w-8 h-8" />
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="mt-2 text-center sm:text-left">
                      <Link href={`/profile/${profile.id}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                          {profile.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-center sm:justify-start mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{profile.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills and Details */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Skills Offered</h4>
                      <div className="flex flex-wrap gap-1">
                        {profile.skillsOffered.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Skills Wanted</h4>
                      <div className="flex flex-wrap gap-1">
                        {profile.skillsWanted.map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{profile.availability}</span>
                      <Link href={`/swap-request/${profile.id}`}>
                        <Button size="sm">Request</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* No Results Message */}
        {filteredProfiles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No profiles found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
