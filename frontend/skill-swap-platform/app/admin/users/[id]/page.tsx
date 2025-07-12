"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Shield, Home, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

// Mock user data - in real app this would come from API
const mockUserData = {
  1: {
    id: 1,
    name: "Sarah Chen",
    email: "sarah.chen@email.com",
    photo: "/placeholder.svg?height=120&width=120",
    location: "San Francisco, CA",
    skillsOffered: ["React", "TypeScript", "Node.js"],
    skillsWanted: ["Python", "Machine Learning"],
    rating: 4.8,
    totalSwaps: 23,
    joinDate: "2024-01-15",
    status: "active",
    lastActive: "2 hours ago",
    bio: "Full-stack developer with 5 years of experience. Passionate about modern web technologies and always eager to learn new skills.",
    isPublic: true,
    availability: "Weekends",
  },
}

export default function AdminEditUser() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const userId = params.id as string
  const user = mockUserData[userId as unknown as keyof typeof mockUserData]

  const [formData, setFormData] = useState(user || {})
  const [isSaving, setIsSaving] = useState(false)

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Not Found</h1>
          <Link href="/admin">
            <Button>Back to Admin</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "User Updated!",
      description: `${formData.name}'s profile has been successfully updated.`,
    })

    setIsSaving(false)
    router.push("/admin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Link href="/admin" className="text-xl font-bold text-red-600">
                <Shield className="w-6 h-6 inline mr-2" />
                Admin Panel
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Site
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit User: {user.name}</h1>
          <p className="text-gray-600">Modify user account details and settings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Info Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Profile Photo */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={formData.photo || "/placeholder.svg"} alt={formData.name} />
                      <AvatarFallback className="text-xl">{formData.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="City, State"
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio || ""}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Account Status */}
                  <div>
                    <Label htmlFor="status">Account Status</Label>
                    <Select
                      value={formData.status || "active"}
                      onValueChange={(value) => handleInputChange("status", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Profile Visibility */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="visibility">Public Profile</Label>
                      <p className="text-sm text-gray-600">Allow others to find this user</p>
                    </div>
                    <Switch
                      id="visibility"
                      checked={formData.isPublic || false}
                      onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4">
                    <Button type="submit" disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* User Stats */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Rating</Label>
                  <p className="text-2xl font-bold text-yellow-600">⭐ {user.rating}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Total Swaps</Label>
                  <p className="text-2xl font-bold">{user.totalSwaps}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Join Date</Label>
                  <p className="text-sm text-gray-600">{user.joinDate}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Last Active</Label>
                  <p className="text-sm text-gray-600">{user.lastActive}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium">Skills Offered</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.skillsOffered.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Skills Wanted</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.skillsWanted.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
