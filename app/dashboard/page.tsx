"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Users,
  Globe,
  Activity,
  Zap,
  Target,
  Clock,
  XCircle,
  ArrowUp,
  ArrowDown,
  Plus,
  Filter,
  RefreshCw,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

// Enhanced mock data
const mockStats = {
  threatsBlocked: 15247,
  msmeProtected: 28934,
  activeThreats: 47,
  riskScore: 68,
  responseTime: 2.3,
  uptime: 99.97,
  rulesDeployed: 1456,
  falsePositives: 0.02,
}

const mockThreats = [
  {
    id: 1,
    type: "IP",
    value: "203.0.113.42",
    severity: "Critical",
    source: "Mumbai Manufacturing Hub",
    timestamp: "2 minutes ago",
    description: "Advanced persistent threat detected - C&C communication",
    cve: "CVE-2024-1337",
    confidence: 95,
    affected: 23,
    status: "active",
    tags: ["APT", "C&C", "Malware"],
  },
  {
    id: 2,
    type: "Domain",
    value: "phishing-bank.malicious.com",
    severity: "High",
    source: "Delhi Financial District",
    timestamp: "8 minutes ago",
    description: "Banking phishing campaign targeting MSME accounts",
    cve: "CVE-2024-2468",
    confidence: 88,
    affected: 67,
    status: "mitigated",
    tags: ["Phishing", "Banking", "Social Engineering"],
  },
  {
    id: 3,
    type: "Hash",
    value: "a1b2c3d4e5f6789...",
    severity: "Medium",
    source: "Bangalore Tech Cluster",
    timestamp: "15 minutes ago",
    description: "Ransomware payload detected in email attachments",
    cve: "CVE-2024-3579",
    confidence: 92,
    affected: 12,
    status: "investigating",
    tags: ["Ransomware", "Email", "Payload"],
  },
  {
    id: 4,
    type: "URL",
    value: "https://fake-update.malware.net/download",
    severity: "High",
    source: "Chennai Industrial Zone",
    timestamp: "22 minutes ago",
    description: "Fake software update distributing trojans",
    cve: "CVE-2024-4680",
    confidence: 90,
    affected: 34,
    status: "blocked",
    tags: ["Trojan", "Fake Update", "Distribution"],
  },
]

const recentActivities = [
  {
    id: 1,
    type: "threat_blocked",
    message: "Blocked malicious IP 203.0.113.42 across 1,247 MSMEs",
    timestamp: "3 minutes ago",
    severity: "high",
  },
  {
    id: 2,
    type: "rule_deployed",
    message: "Auto-deployed firewall rules to 856 systems",
    timestamp: "7 minutes ago",
    severity: "medium",
  },
  {
    id: 3,
    type: "threat_submitted",
    message: "New threat submitted by TechCorp Solutions (Mumbai)",
    timestamp: "12 minutes ago",
    severity: "low",
  },
  {
    id: 4,
    type: "alert_sent",
    message: "Critical alert sent to 2,847 MSMEs in Maharashtra region",
    timestamp: "18 minutes ago",
    severity: "high",
  },
]

export default function DashboardPage() {
  const [stats, setStats] = useState(mockStats)
  const [threats, setThreats] = useState(mockThreats)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedTab, setSelectedTab] = useState("overview")

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        activeThreats: Math.max(1, prev.activeThreats + (Math.random() > 0.5 ? 1 : -1)),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-red-600 bg-red-50"
      case "mitigated":
        return "text-green-600 bg-green-50"
      case "investigating":
        return "text-yellow-600 bg-yellow-50"
      case "blocked":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cyber Defense Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time threat intelligence and network protection status</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Link href="/threats/submit">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Report Threat
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Threats Blocked</CardTitle>
              <Shield className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-700">{stats.threatsBlocked.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                +12.5% from last week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">MSMEs Protected</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-700">{stats.msmeProtected.toLocaleString()}</div>
              <div className="flex items-center text-xs text-blue-600 mt-1">
                <ArrowUp className="h-3 w-3 mr-1" />
                +8.2% growth
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Active Threats</CardTitle>
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-700">{stats.activeThreats}</div>
              <div className="flex items-center text-xs text-orange-600 mt-1">
                <ArrowDown className="h-3 w-3 mr-1" />
                -15% from yesterday
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Risk Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-700">{stats.riskScore}/100</div>
              <Progress value={stats.riskScore} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Time</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.responseTime}s</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">System Uptime</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.uptime}%</p>
                </div>
                <Activity className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rules Deployed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.rulesDeployed}</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">False Positives</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.falsePositives}%</p>
                </div>
                <Target className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="threats">Live Threats</TabsTrigger>
            <TabsTrigger value="activity">Activity Feed</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Threat Summary */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Threat Intelligence Summary</CardTitle>
                    <CardDescription>Latest threats and their impact across the network</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {threats.slice(0, 3).map((threat) => (
                        <div
                          key={threat.id}
                          className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)} mt-2`} />
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{threat.type}</Badge>
                              <Badge variant={threat.severity === "Critical" ? "destructive" : "secondary"}>
                                {threat.severity}
                              </Badge>
                              <Badge className={getStatusColor(threat.status)}>{threat.status}</Badge>
                              <span className="text-sm text-gray-500 ml-auto">{threat.timestamp}</span>
                            </div>
                            <div className="font-medium text-gray-900 mb-1">{threat.value}</div>
                            <div className="text-sm text-gray-600 mb-2">{threat.description}</div>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Source: {threat.source}</span>
                              <span>Confidence: {threat.confidence}%</span>
                              <span>Affected: {threat.affected} MSMEs</span>
                            </div>
                            <div className="flex gap-1 mt-2">
                              {threat.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Status */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Link href="/threats/submit">
                      <Button className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" />
                        Report New Threat
                      </Button>
                    </Link>
                    <Link href="/defense/rules">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Shield className="h-4 w-4 mr-2" />
                        Generate Rules
                      </Button>
                    </Link>
                    <Link href="/map">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Globe className="h-4 w-4 mr-2" />
                        View Threat Map
                      </Button>
                    </Link>
                    <Link href="/analytics">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        View Analytics
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Network Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Status</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <Badge className="bg-green-100 text-green-800">Operational</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Threat Feed</span>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-Rules</span>
                        <Badge className="bg-blue-100 text-blue-800">Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Last Sync</span>
                        <span className="text-sm text-gray-600">30s ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Live Threat Feed</CardTitle>
                    <CardDescription>Real-time threats detected across the MSME network</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threats.map((threat) => (
                    <div
                      key={threat.id}
                      className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)} mt-2`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{threat.type}</Badge>
                          <Badge variant={threat.severity === "Critical" ? "destructive" : "secondary"}>
                            {threat.severity}
                          </Badge>
                          <Badge className={getStatusColor(threat.status)}>{threat.status}</Badge>
                          <span className="text-sm text-gray-500 ml-auto">{threat.timestamp}</span>
                        </div>
                        <div className="font-medium text-gray-900 mb-1">{threat.value}</div>
                        <div className="text-sm text-gray-600 mb-2">{threat.description}</div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                          <span>Source: {threat.source}</span>
                          <span>CVE: {threat.cve}</span>
                          <span>Confidence: {threat.confidence}%</span>
                          <span>Affected: {threat.affected} MSMEs</span>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {threat.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            Block Now
                          </Button>
                          <Button size="sm" variant="outline">
                            Generate Rules
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions and events in your network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-3 border-l-4 border-blue-500 bg-blue-50/50"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {activity.type === "threat_blocked" && <XCircle className="h-4 w-4 text-red-500" />}
                        {activity.type === "rule_deployed" && <Shield className="h-4 w-4 text-blue-500" />}
                        {activity.type === "threat_submitted" && <AlertTriangle className="h-4 w-4 text-orange-500" />}
                        {activity.type === "alert_sent" && <Bell className="h-4 w-4 text-purple-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Threat Trends</CardTitle>
                  <CardDescription>Threat activity over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Interactive charts coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Threats by Indian states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Geographic visualization coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
