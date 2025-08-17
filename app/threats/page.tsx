"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AlertTriangle, Search, Filter, Plus, Eye, Shield, RefreshCw, Download, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

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
    affected: 247,
    status: "active",
    tags: ["APT", "C&C", "Malware", "Banking"],
    location: "Russia",
    campaign: "APT-Mumbai-2024",
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
    affected: 89,
    status: "mitigated",
    tags: ["Phishing", "Banking", "Social Engineering"],
    location: "China",
    campaign: "Banking-Phish-Q1",
  },
  {
    id: 3,
    type: "Hash",
    value: "a1b2c3d4e5f6789abcdef123456789",
    severity: "Medium",
    source: "Bangalore Tech Cluster",
    timestamp: "15 minutes ago",
    description: "Ransomware payload detected in email attachments",
    cve: "CVE-2024-3579",
    confidence: 92,
    affected: 34,
    status: "investigating",
    tags: ["Ransomware", "Email", "Payload"],
    location: "Unknown",
    campaign: "Crypto-Lock-2024",
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
    affected: 67,
    status: "blocked",
    tags: ["Trojan", "Fake Update", "Distribution"],
    location: "Netherlands",
    campaign: "FakeUpdate-2024",
  },
]

export default function ThreatsPage() {
  const [threats, setThreats] = useState(mockThreats)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setThreats((prev) => {
        const updated = [...prev]
        // Randomly update timestamps
        const randomIndex = Math.floor(Math.random() * updated.length)
        updated[randomIndex] = {
          ...updated[randomIndex],
          timestamp: "Just now",
        }
        return updated
      })
    }, 30000)

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

  const filteredThreats = threats.filter((threat) => {
    const matchesSearch =
      threat.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.source.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = filterSeverity === "all" || threat.severity === filterSeverity
    const matchesStatus = filterStatus === "all" || threat.status === filterStatus
    const matchesType = filterType === "all" || threat.type === filterType

    return matchesSearch && matchesSeverity && matchesStatus && matchesType
  })

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const stats = {
    total: threats.length,
    critical: threats.filter((t) => t.severity === "Critical").length,
    active: threats.filter((t) => t.status === "active").length,
    mitigated: threats.filter((t) => t.status === "mitigated").length,
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Live Threat Feed</h1>
            <p className="text-gray-600 mt-1">Real-time threat intelligence from the MSME network</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Link href="/threats/submit">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Report Threat
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Threats</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Threats</p>
                  <p className="text-3xl font-bold text-red-600">{stats.critical}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Threats</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.active}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Mitigated</p>
                  <p className="text-3xl font-bold text-green-600">{stats.mitigated}</p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="feed" className="space-y-6">
          <TabsList>
            <TabsTrigger value="feed">Live Feed</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search threats, IOCs, descriptions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="IP">IP</SelectItem>
                      <SelectItem value="Domain">Domain</SelectItem>
                      <SelectItem value="Hash">Hash</SelectItem>
                      <SelectItem value="URL">URL</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severity</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="mitigated">Mitigated</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Threat Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Threat Feed ({filteredThreats.length} threats)</CardTitle>
                <CardDescription>Latest threats detected across the MSME network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredThreats.map((threat) => (
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
                        <div className="font-medium text-gray-900 mb-1 font-mono text-sm">{threat.value}</div>
                        <div className="text-sm text-gray-600 mb-2">{threat.description}</div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                          <span>Source: {threat.source}</span>
                          <span>CVE: {threat.cve}</span>
                          <span>Confidence: {threat.confidence}%</span>
                          <span>Affected: {threat.affected} MSMEs</span>
                          <span>Location: {threat.location}</span>
                        </div>
                        <div className="flex gap-1 mb-3">
                          {threat.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/threats/analysis?id=${threat.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Analyze
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            <Shield className="h-4 w-4 mr-1" />
                            Block
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

          <TabsContent value="trending" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Trending Threats</CardTitle>
                <CardDescription>Most active threats in the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threats
                    .sort((a, b) => b.affected - a.affected)
                    .slice(0, 3)
                    .map((threat, index) => (
                      <div key={threat.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{threat.type}</Badge>
                            <Badge variant={threat.severity === "Critical" ? "destructive" : "secondary"}>
                              {threat.severity}
                            </Badge>
                          </div>
                          <div className="font-mono text-sm font-medium">{threat.value}</div>
                          <div className="text-sm text-gray-600">{threat.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-red-600">{threat.affected}</div>
                          <div className="text-xs text-gray-500">MSMEs affected</div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Campaigns</CardTitle>
                <CardDescription>Coordinated threat campaigns targeting MSMEs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(new Set(threats.map((t) => t.campaign))).map((campaign) => {
                    const campaignThreats = threats.filter((t) => t.campaign === campaign)
                    const totalAffected = campaignThreats.reduce((sum, t) => sum + t.affected, 0)
                    return (
                      <div key={campaign} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{campaign}</h3>
                          <Badge variant="destructive">{campaignThreats.length} threats</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Total MSMEs affected: <span className="font-semibold">{totalAffected}</span>
                        </div>
                        <div className="flex gap-2">
                          {campaignThreats.map((threat) => (
                            <Badge key={threat.id} variant="outline" className="text-xs">
                              {threat.type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Sources</CardTitle>
                <CardDescription>Organizations contributing to the threat feed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from(new Set(threats.map((t) => t.source))).map((source) => {
                    const sourceThreats = threats.filter((t) => t.source === source)
                    return (
                      <div key={source} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{source}</div>
                          <div className="text-sm text-gray-600">{sourceThreats.length} threats reported</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                          <div className="text-sm text-gray-500">Last: 2 min ago</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
