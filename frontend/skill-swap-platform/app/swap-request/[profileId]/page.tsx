"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Send, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Mock data
const mockUserSkills = ["React", "TypeScript", "Node.js", "JavaScript", "CSS"]
const mockProfiles = {
  1: {
    name: "Sarah Chen",
    photo: "/placeholder.svg?height=60&width=60",
    skillsWanted: ["Python", "Machine Learning", "Data Science"],
  },
  2: {
    name: "Marcus Johnson",
    photo: "/placeholder.svg?height=60&width=60",
    skillsWanted: ["React", "Frontend Development", "UI/UX Design"],
  },
}

export default function SwapRequestPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const profileId = params.profileId as string
  const targetProfile = mockProfiles[Number(profileId) as keyof typeof mockProfiles]

  const [selectedMySkill, setSelectedMySkill] = useState("")
  const [selectedTheirSkill, setSelectedTheirSkill] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!targetProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedMySkill || !selectedTheirSkill || !message.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Swap Request Sent!",
      description: `Your request to swap ${selectedMySkill} for ${selectedTheirSkill} has been sent to ${targetProfile.name}.`,
    })

    setIsSubmitting(false)
    router.push("/")
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
            <CardTitle className="text-2xl">Request Skill Swap</CardTitle>

            {/* Target Profile Info */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <Avatar className="w-12 h-12">
                <AvatarImage src={targetProfile.photo || "/placeholder.svg"} alt={targetProfile.name} />
                <AvatarFallback>{targetProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{targetProfile.name}</h3>
                <p className="text-sm text-gray-600">Wants to learn:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {targetProfile.skillsWanted.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Your Skill Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose one of your skills to offer
                </label>
                <Select value={selectedMySkill} onValueChange={setSelectedMySkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill you can teach" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockUserSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Their Skill Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a skill you want to learn from them
                </label>
                <Select value={selectedTheirSkill} onValueChange={setSelectedTheirSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill you want to learn" />
                  </SelectTrigger>
                  <SelectContent>
                    {targetProfile.skillsWanted.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea
                  placeholder="Introduce yourself and explain what you'd like to learn and teach..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending Request..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Swap Request
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
