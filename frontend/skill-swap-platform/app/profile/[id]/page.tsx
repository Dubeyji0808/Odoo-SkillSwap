"use client"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Star, MapPin, Clock, MessageSquare, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Extended mock profile data with all users
const mockProfileData = {
  1: {
    id: 1,
    name: "Sarah Chen",
    photo: "/placeholder.svg?height=120&width=120",
    location: "San Francisco, CA",
    skillsOffered: ["React", "TypeScript", "Node.js", "GraphQL"],
    skillsWanted: ["Python", "Machine Learning", "Data Science"],
    rating: 4.8,
    totalSwaps: 23,
    availability: "Weekends",
    bio: "Full-stack developer with 5 years of experience. Passionate about modern web technologies and always eager to learn new skills. I love helping others grow while expanding my own knowledge.",
    feedback: [
      {
        id: 1,
        from: "Marcus Johnson",
        rating: 5,
        comment: "Sarah is an excellent teacher! She helped me understand React hooks in just one session.",
        skill: "React",
        date: "2 weeks ago",
      },
      {
        id: 2,
        from: "Elena Rodriguez",
        rating: 5,
        comment: "Very patient and knowledgeable. Great at explaining complex TypeScript concepts.",
        skill: "TypeScript",
        date: "1 month ago",
      },
      {
        id: 3,
        from: "David Kim",
        rating: 4,
        comment: "Helpful session on Node.js. Would definitely swap skills again!",
        skill: "Node.js",
        date: "2 months ago",
      },
    ],
  },
  2: {
    id: 2,
    name: "Marcus Johnson",
    photo: "/placeholder.svg?height=120&width=120",
    location: "New York, NY",
    skillsOffered: ["Python", "Data Science", "SQL", "Machine Learning"],
    skillsWanted: ["React", "Frontend Development", "UI/UX Design"],
    rating: 4.9,
    totalSwaps: 31,
    availability: "Evenings",
    bio: "Data scientist with a background in machine learning and analytics. Looking to expand into frontend development to become more well-rounded.",
    feedback: [
      {
        id: 1,
        from: "Sarah Chen",
        rating: 5,
        comment: "Marcus taught me Python fundamentals brilliantly. Very clear explanations!",
        skill: "Python",
        date: "1 week ago",
      },
      {
        id: 2,
        from: "Lisa Thompson",
        rating: 5,
        comment: "Amazing data science mentor. Helped me understand complex algorithms easily.",
        skill: "Data Science",
        date: "3 weeks ago",
      },
    ],
  },
  3: {
    id: 3,
    name: "Elena Rodriguez",
    photo: "/placeholder.svg?height=120&width=120",
    location: "Austin, TX",
    skillsOffered: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
    skillsWanted: ["JavaScript", "Web Development", "React"],
    rating: 4.7,
    totalSwaps: 18,
    availability: "Flexible",
    bio: "UX designer with 4 years of experience creating user-centered designs. Passionate about accessibility and inclusive design. Always excited to learn new technologies.",
    feedback: [
      {
        id: 1,
        from: "Ahmed Hassan",
        rating: 5,
        comment: "Elena's design insights transformed our project. Excellent teacher!",
        skill: "UI/UX Design",
        date: "1 week ago",
      },
    ],
  },
  4: {
    id: 4,
    name: "David Kim",
    photo: "/placeholder.svg?height=120&width=120",
    location: "Seattle, WA",
    skillsOffered: ["Machine Learning", "TensorFlow", "Python", "AI"],
    skillsWanted: ["Cloud Computing", "AWS", "DevOps"],
    rating: 4.6,
    totalSwaps: 15,
    availability: "Weekends",
    bio: "Machine learning engineer with expertise in deep learning and neural networks. Currently working on AI applications and looking to expand cloud computing skills.",
    feedback: [
      {
        id: 1,
        from: "Sarah Chen",
        rating: 4,
        comment: "Great ML knowledge, helped me understand TensorFlow basics.",
        skill: "Machine Learning",
        date: "2 weeks ago",
      },
    ],
  },
  5: {
    id: 5,
    name: "Lisa Thompson",
    photo: "/placeholder.svg?height=120&width=120",
    location: "Chicago, IL",
    skillsOffered: ["Digital Marketing", "SEO", "Content Strategy", "Social Media"],
    skillsWanted: ["Analytics", "Data Visualization", "Python"],
    rating: 4.8,
    totalSwaps: 27,
    availability: "Evenings",
    bio: "Digital marketing specialist with 6 years of experience. Expert in SEO, content marketing, and social media strategy. Looking to add data analysis skills to my toolkit.",
    feedback: [
      {
        id: 1,
        from: "Marcus Johnson",
        rating: 5,
        comment: "Lisa's marketing strategies boosted our engagement by 300%!",
        skill: "Digital Marketing",
        date: "1 month ago",
      },
    ],
  },
  6: {
    id: 6,
    name: "Ahmed Hassan",
    photo: "/placeholder.svg?height=120&width=120",
    location: "Boston, MA",
    skillsOffered: ["DevOps", "Docker", "Kubernetes", "AWS"],
    skillsWanted: ["Mobile Development", "React Native", "Flutter"],
    rating: 4.9,
    totalSwaps: 22,
    availability: "Flexible",
    bio: "DevOps engineer with extensive experience in containerization and cloud infrastructure. Passionate about automation and scalable systems. Interested in mobile development.",
    feedback: [
      {
        id: 1,
        from: "Elena Rodriguez",
        rating: 5,
        comment: "Ahmed helped me set up our entire CI/CD pipeline. Incredible expertise!",
        skill: "DevOps",
        date: "2 weeks ago",
      },
    ],
  },
}

export default function ProfileDetailPage() {
  const params = useParams()
  const router = useRouter()
  const profileId = params.id as string
  const profile = mockProfileData[Number(profileId) as keyof typeof mockProfileData]

  if (!profile) {
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

        {/* Profile Not Found */}
        <main className="flex items-center justify-center py-20">
          <div className="max-w-md w-full text-center">
            <Card>
              <CardContent className="p-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
                <p className="text-gray-600 mb-8">
                  Sorry, we couldn't find the profile you're looking for. The user may have deactivated their account or
                  the link might be incorrect.
                </p>
                <div className="space-y-4">
                  <Link href="/">
                    <Button className="w-full">
                      <Home className="w-4 h-4 mr-2" />
                      Browse All Profiles
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => router.back()} className="w-full">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Go Back
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={profile.photo || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold">{profile.rating}</span>
                        <span className="text-gray-600 ml-1">({profile.totalSwaps} swaps)</span>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {profile.location}
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {profile.availability}
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{profile.bio}</p>

                    <Link href={`/swap-request/${profile.id}`}>
                      <Button size="lg" className="w-full sm:w-auto">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Request Skill Swap
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills Offered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsOffered.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills Wanted</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skillsWanted.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.feedback.map((feedback, index) => (
                  <div key={feedback.id}>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{feedback.from}</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm">{feedback.rating}</span>
                        </div>
                      </div>

                      <Badge variant="secondary" className="text-xs">
                        {feedback.skill}
                      </Badge>

                      <p className="text-sm text-gray-600">{feedback.comment}</p>

                      <span className="text-xs text-gray-400">{feedback.date}</span>
                    </div>

                    {index < profile.feedback.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
