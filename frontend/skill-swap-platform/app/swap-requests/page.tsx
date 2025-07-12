"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, X, Trash2, Clock, User, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock swap requests data
const mockSwapRequests = {
  received: [
    {
      id: 1,
      from: "Marcus Johnson",
      photo: "/placeholder.svg?height=40&width=40",
      skillOffered: "Python",
      skillWanted: "React",
      message:
        "Hi! I'd love to help you learn Python in exchange for React lessons. I have 3 years of experience with Python and data science.",
      status: "pending",
      date: "2 hours ago",
    },
    {
      id: 2,
      from: "Elena Rodriguez",
      photo: "/placeholder.svg?height=40&width=40",
      skillOffered: "UI/UX Design",
      skillWanted: "TypeScript",
      message:
        "Hello! I'm a UX designer looking to learn TypeScript. I can teach you design principles and Figma in return.",
      status: "pending",
      date: "1 day ago",
    },
  ],
  sent: [
    {
      id: 3,
      to: "David Kim",
      photo: "/placeholder.svg?height=40&width=40",
      skillOffered: "React",
      skillWanted: "Machine Learning",
      message: "Hi David! I saw you're experienced in ML. I'd love to learn from you and can teach React in return.",
      status: "pending",
      date: "3 days ago",
    },
    {
      id: 4,
      to: "Lisa Thompson",
      photo: "/placeholder.svg?height=40&width=40",
      skillOffered: "Node.js",
      skillWanted: "Digital Marketing",
      message:
        "Hi Lisa! I'm interested in learning digital marketing strategies. I can help you with backend development.",
      status: "accepted",
      date: "1 week ago",
    },
  ],
}

export default function SwapRequestsPage() {
  const [requests, setRequests] = useState(mockSwapRequests)
  const { toast } = useToast()

  const handleAccept = (requestId: number) => {
    setRequests((prev) => ({
      ...prev,
      received: prev.received.map((req) => (req.id === requestId ? { ...req, status: "accepted" } : req)),
    }))

    toast({
      title: "Request Accepted!",
      description: "You can now start coordinating your skill swap.",
    })
  }

  const handleReject = (requestId: number) => {
    setRequests((prev) => ({
      ...prev,
      received: prev.received.map((req) => (req.id === requestId ? { ...req, status: "rejected" } : req)),
    }))

    toast({
      title: "Request Rejected",
      description: "The request has been declined.",
    })
  }

  const handleDelete = (requestId: number, type: "received" | "sent") => {
    setRequests((prev) => ({
      ...prev,
      [type]: prev[type].filter((req) => req.id !== requestId),
    }))

    toast({
      title: "Request Deleted",
      description: "The request has been removed.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-blue-600">
                SkillSwap
              </Link>
            </div>
            <div className="flex items-center space-x-4">
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Swap Requests</h1>
          <p className="text-gray-600">Manage your skill swap requests</p>
        </div>

        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="received">Received ({requests.received.length})</TabsTrigger>
            <TabsTrigger value="sent">Sent ({requests.sent.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4">
            {requests.received.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <User className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No requests received</h3>
                  <p className="text-gray-600 text-center">
                    When people want to swap skills with you, they'll appear here.
                  </p>
                </CardContent>
              </Card>
            ) : (
              requests.received.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={request.photo || "/placeholder.svg"} alt={request.from} />
                        <AvatarFallback>{request.from.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{request.from}</h3>
                            <p className="text-sm text-gray-600">{request.date}</p>
                          </div>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Offers:</span>
                            <Badge variant="secondary">{request.skillOffered}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Wants:</span>
                            <Badge variant="outline">{request.skillWanted}</Badge>
                          </div>
                        </div>

                        <p className="text-gray-700">{request.message}</p>

                        {request.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAccept(request.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="w-4 h-4 mr-1" />
                              Accept
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleReject(request.id)}>
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(request.id, "received")}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            {requests.sent.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Clock className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No requests sent</h3>
                  <p className="text-gray-600 text-center">
                    Start browsing profiles to send your first skill swap request!
                  </p>
                  <Link href="/">
                    <Button className="mt-4">Browse Profiles</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              requests.sent.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={request.photo || "/placeholder.svg"} alt={request.to} />
                        <AvatarFallback>{request.to.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">To: {request.to}</h3>
                            <p className="text-sm text-gray-600">{request.date}</p>
                          </div>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">You offered:</span>
                            <Badge variant="secondary">{request.skillOffered}</Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">You want:</span>
                            <Badge variant="outline">{request.skillWanted}</Badge>
                          </div>
                        </div>

                        <p className="text-gray-700">{request.message}</p>

                        {request.status === "pending" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(request.id, "sent")}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Cancel Request
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
