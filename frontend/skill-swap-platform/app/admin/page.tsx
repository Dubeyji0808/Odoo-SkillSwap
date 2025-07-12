"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Eye,
  Shield,
  Users,
  Home,
  MoreHorizontal,
  Download,
  MessageCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Send,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  // Mock admin data - in real app this would come from API
  // Moved inside the component to ensure state is managed locally and not re-initialized by global constant on HMR
  const initialUsers = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      photo: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, CA",
      skillsOffered: ["React", "TypeScript", "Node.js"],
      skillsWanted: ["Python", "Machine Learning"],
      rating: 4.8,
      totalSwaps: 23,
      joinDate: "2024-01-15",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      email: "marcus.johnson@email.com",
      photo: "/placeholder.svg?height=40&width=40",
      location: "New York, NY",
      skillsOffered: ["Python", "Data Science", "SQL"],
      skillsWanted: ["React", "Frontend Development"],
      rating: 4.9,
      totalSwaps: 31,
      joinDate: "2023-11-20",
      status: "active",
      lastActive: "1 day ago",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      photo: "/placeholder.svg?height=40&width=40",
      location: "Seattle, WA",
      skillsOffered: ["Machine Learning", "TensorFlow", "Python"],
      skillsWanted: ["Cloud Computing", "AWS"],
      rating: 4.6,
      totalSwaps: 15,
      joinDate: "2024-03-05",
      status: "suspended",
      lastActive: "1 week ago",
    },
  ]

  const initialSwaps = [
    {
      id: 1,
      requester: "Sarah Chen",
      provider: "Marcus Johnson",
      skillOffered: "React",
      skillWanted: "Python",
      status: "pending",
      date: "2024-01-20",
    },
    {
      id: 2,
      requester: "Elena Rodriguez",
      provider: "David Kim",
      skillOffered: "UI/UX Design",
      skillWanted: "Machine Learning",
      status: "accepted",
      date: "2024-01-18",
    },
    {
      id: 3,
      requester: "Ahmed Hassan",
      provider: "Lisa Thompson",
      skillOffered: "DevOps",
      skillWanted: "Digital Marketing",
      status: "cancelled",
      date: "2024-01-15",
    },
  ]

  const initialReports = [
    {
      id: 1,
      type: "Inappropriate Content",
      reporter: "Sarah Chen",
      reported: "John Doe",
      description: "User posted inappropriate skill description",
      date: "2024-01-20",
      status: "pending",
    },
    {
      id: 2,
      type: "Spam",
      reporter: "Marcus Johnson",
      reported: "Jane Smith",
      description: "User sending spam messages",
      date: "2024-01-19",
      status: "resolved",
    },
  ]

  const [users, setUsers] = useState(initialUsers)
  const [swaps, setSwaps] = useState(initialSwaps)
  const [reports, setReports] = useState(initialReports)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [broadcastMessage, setBroadcastMessage] = useState("")
  const { toast } = useToast()

  // Filter users based on search and status
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleDeleteUser = (userId: number) => {
    console.log("Attempting to delete user with ID:", userId)
    const userToDelete = users.find((user) => user.id === userId)

    setUsers((prevUsers) => {
      const newUsers = prevUsers.filter((user) => user.id !== userId)
      console.log("New users state after filter:", newUsers)
      return newUsers
    })

    toast({
      title: "User Deleted",
      description: `${userToDelete?.name} has been permanently deleted from the system.`,
      variant: "destructive",
    })
  }

  const handleBanUser = (userId: number) => {
    const userToBan = users.find((user) => user.id === userId)
    setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, status: "banned" } : user)))
    toast({
      title: "User Banned",
      description: `${userToBan?.name} has been banned for policy violations.`,
      variant: "destructive",
    })
  }

  const handleSuspendUser = (userId: number) => {
    const userToSuspend = users.find((user) => user.id === userId)
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: user.status === "suspended" ? "active" : "suspended" } : user,
      ),
    )
    toast({
      title: userToSuspend?.status === "suspended" ? "User Reactivated" : "User Suspended",
      description: `${userToSuspend?.name} has been ${
        userToSuspend?.status === "suspended" ? "reactivated" : "suspended"
      }.`,
    })
  }

  const handleResolveReport = (reportId: number) => {
    setReports((prevReports) =>
      prevReports.map((report) => (report.id === reportId ? { ...report, status: "resolved" } : report)),
    )
    toast({
      title: "Report Resolved",
      description: "The report has been marked as resolved.",
    })
  }

  const handleSendBroadcast = () => {
    if (!broadcastMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to broadcast.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Broadcast Sent!",
      description: `Message sent to all ${users.length} users.`,
    })
    setBroadcastMessage("")
  }

  const handleDownloadReport = (type: string) => {
    toast({
      title: "Download Started",
      description: `${type} report is being generated and will download shortly.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "suspended":
        return <Badge className="bg-yellow-100 text-yellow-800">Suspended</Badge>
      case "banned":
        return <Badge className="bg-red-100 text-red-800">Banned</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getSwapStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Accepted
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalUsers = users.length
  const activeUsers = users.filter((user) => user.status === "active").length
  const suspendedUsers = users.filter((user) => user.status === "suspended").length
  const pendingReports = reports.filter((report) => report.status === "pending").length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="swaps">Swaps</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalUsers}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">{activeUsers}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Suspended</CardTitle>
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">{suspendedUsers}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">{pendingReports}</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search users by name, email, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="sm:w-48">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="banned">Banned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Users ({filteredUsers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.photo || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{user.name}</h3>
                            {getStatusBadge(user.status)}
                          </div>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">⭐ {user.rating}</span>
                            <span className="text-sm text-gray-500">({user.totalSwaps} swaps)</span>
                          </div>
                          <p className="text-xs text-gray-500">Joined: {user.joinDate}</p>
                          <p className="text-xs text-gray-500">Last active: {user.lastActive}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Link href={`/profile/${user.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </Link>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
                                {user.status === "suspended" ? "Reactivate User" : "Suspend User"}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleBanUser(user.id)} className="text-orange-600">
                                Ban User
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/users/${user.id}`}>Edit User</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <span className="cursor-pointer">Delete User</span>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete{" "}
                                        <strong>{user.name}'s</strong> account and remove all their data from our
                                        servers.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-600 hover:bg-red-700"
                                      >
                                        Delete User
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Swaps Tab */}
          <TabsContent value="swaps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Swap Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {swaps.map((swap) => (
                    <div key={swap.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{swap.requester}</span>
                          <span className="text-gray-500">→</span>
                          <span className="font-medium">{swap.provider}</span>
                          {getSwapStatusBadge(swap.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>
                            Offering: <Badge variant="secondary">{swap.skillOffered}</Badge>
                          </span>
                          <span>
                            Wanting: <Badge variant="outline">{swap.skillWanted}</Badge>
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">Date: {swap.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Moderation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">{report.type}</Badge>
                          <span className="text-sm">
                            <strong>{report.reporter}</strong> reported <strong>{report.reported}</strong>
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{report.description}</p>
                        <p className="text-xs text-gray-500">Date: {report.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {report.status === "pending" && (
                          <Button size="sm" onClick={() => handleResolveReport(report.id)}>
                            Resolve
                          </Button>
                        )}
                        <Badge
                          className={
                            report.status === "resolved"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Broadcast Tab */}
          <TabsContent value="broadcast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform-wide Messages</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Broadcast Message</label>
                  <Textarea
                    placeholder="Enter your message to all users (e.g., feature updates, maintenance alerts)..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    rows={4}
                  />
                </div>
                <Button onClick={handleSendBroadcast} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send to All Users ({users.length})
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Download Reports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => handleDownloadReport("User Activity")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    User Activity Report
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => handleDownloadReport("Feedback Logs")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Feedback Logs
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent"
                    onClick={() => handleDownloadReport("Swap Statistics")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Swap Statistics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Platform Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Swaps</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Rating</span>
                    <span className="font-bold text-yellow-600">4.7⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Today</span>
                    <span className="font-bold">{activeUsers}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics Dashboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <FileText className="w-4 h-4 mr-2" />
                    Generate Monthly Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Review Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
