"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, X, Plus, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

// Mock current user data
const mockCurrentUser = {
  name: "Sarah Chen",
  email: "sarah.chen@email.com",
  location: "San Francisco, CA",
  photo: "/placeholder.svg?height=120&width=120",
  bio: "Full-stack developer with 5 years of experience. Passionate about modern web technologies and always eager to learn new skills.",
  skillsOffered: ["React", "TypeScript", "Node.js"],
  skillsWanted: ["Python", "Machine Learning"],
  availability: "Weekends",
  isPublic: true,
}

const availabilityOptions = ["Weekends", "Evenings", "Flexible", "Weekdays", "Mornings"]
const commonSkills = [
  "React",
  "TypeScript",
  "JavaScript",
  "Python",
  "Node.js",
  "Java",
  "C++",
  "Machine Learning",
  "Data Science",
  "UI/UX Design",
  "Digital Marketing",
  "SEO",
  "Content Writing",
  "Photography",
  "Video Editing",
  "Graphic Design",
]

export default function EditProfilePage() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState(mockCurrentUser)
  const [newSkillOffered, setNewSkillOffered] = useState("")
  const [newSkillWanted, setNewSkillWanted] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = (type: "skillsOffered" | "skillsWanted", skill: string) => {
    if (skill.trim() && !formData[type].includes(skill.trim())) {
      setFormData((prev) => ({
        ...prev,
        [type]: [...prev[type], skill.trim()],
      }))

      if (type === "skillsOffered") {
        setNewSkillOffered("")
      } else {
        setNewSkillWanted("")
      }
    }
  }

  const removeSkill = (type: "skillsOffered" | "skillsWanted", skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((skill) => skill !== skillToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Profile Updated!",
      description: "Your profile has been successfully updated.",
    })

    setIsSaving(false)
    router.push("/profile/me")
  }

  const handleDiscard = () => {
    setFormData(mockCurrentUser)
    toast({
      title: "Changes Discarded",
      description: "All changes have been reverted.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Link href="/" className="text-xl font-bold text-blue-600">
                SkillSwap
              </Link>
              <Link
                href="/"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Edit Profile</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Photo */}
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={formData.photo || "/placeholder.svg"} alt={formData.name} />
                  <AvatarFallback className="text-2xl">{formData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell others about yourself and your experience..."
                  rows={4}
                />
              </div>

              {/* Skills Offered */}
              <div>
                <Label>Skills Offered</Label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {formData.skillsOffered.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent"
                          onClick={() => removeSkill("skillsOffered", skill)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Select value={newSkillOffered} onValueChange={setNewSkillOffered}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Add a skill you can teach" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonSkills
                          .filter((skill) => !formData.skillsOffered.includes(skill))
                          .map((skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addSkill("skillsOffered", newSkillOffered)}
                      disabled={!newSkillOffered}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Skills Wanted */}
              <div>
                <Label>Skills Wanted</Label>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {formData.skillsWanted.map((skill) => (
                      <Badge key={skill} variant="outline" className="flex items-center gap-1">
                        {skill}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 hover:bg-transparent"
                          onClick={() => removeSkill("skillsWanted", skill)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Select value={newSkillWanted} onValueChange={setNewSkillWanted}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Add a skill you want to learn" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonSkills
                          .filter((skill) => !formData.skillsWanted.includes(skill))
                          .map((skill) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addSkill("skillsWanted", newSkillWanted)}
                      disabled={!newSkillWanted}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) => handleInputChange("availability", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Profile Visibility */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="visibility">Public Profile</Label>
                  <p className="text-sm text-gray-600">Allow others to find and contact you</p>
                </div>
                <Switch
                  id="visibility"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
                <Button type="button" variant="outline" onClick={handleDiscard}>
                  Discard
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
