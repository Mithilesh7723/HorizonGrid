"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Globe,
  RefreshCw,
  Plus,
  Settings,
  Eye,
  ExternalLink,
  CheckCircle,
  Database,
  Shield,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const osintSources = [
  {
    id: 1,
    name: "VirusTotal",
    description: "File, URL, IP, and domain reputation service",
    category: "Malware Analysis",
    status: "active",
    lastSync: "2024-01-15T14:45:00Z",
    reliability: 95,
    dataPoints: 15247,
    apiKey: "configured",
    rateLimit: "4 requests/minute",
    cost: "Free Tier",
    feeds: ["File Hashes", "URLs", "IPs", "Domains"],
  },
  {
    id: 2,
    name: "AlienVault OTX",
    description: "Open Threat Exchange community-driven threat intelligence",
    category: "Threat Intelligence",
    status: "active",
    lastSync: "2024-01-15T14:42:00Z",
    reliability: 88,
    dataPoints: 8934,
    apiKey: "configured",
    rateLimit: "1000 requests/hour",
    cost: "Free",
    feeds: ["IOCs", "Pulses", "Malware Families"],
  },
  {
    id: 3,
    name: "Shodan",
    description: "Internet-connected device search engine",
    category: "Network Intelligence",
    status: "active",
    lastSync: "2024-01-15T14:38:00Z",
    reliability: 92,
    dataPoints: 3456,
    apiKey: "configured",
    rateLimit: "100 queries/month",
    cost: "Paid Plan",
    feeds: ["Open Ports", "Services", "Vulnerabilities"],
  },
  {
    id: 4,
    name: "MISP",
    description: "Malware Information Sharing Platform",
    category: "Information Sharing",
    status: "active",
    lastSync: "2024-01-15T14:35:00Z",
    reliability: 90,
    dataPoints: 12678,
    apiKey: "configured",
    rateLimit: "Unlimited",
    cost: "Free",
    feeds: ["Events", "Attributes", "Objects"],
  },
  {
    id: 5,
    name: "URLVoid",
    description: "URL reputation and safety checker",
    category: "URL Analysis",
    status: "maintenance",
    lastSync: "2024-01-15T10:20:00Z",
    reliability: 85,
    dataPoints: 2341,
    apiKey: "configured",
    rateLimit: "1000 requests/day",
    cost: "Free Tier",
    feeds: ["URL Reputation", "Domain Analysis"],
  },
  {
    id: 6,
    name: "Hybrid Analysis",
    description: "Automated malware analysis service",
    category: "Malware Analysis",
    status: "active",
    lastSync: "2024-01-15T14:40:00Z",
    reliability: 93,
    dataPoints: 5678,
    apiKey: "configured",
    rateLimit: "100 submissions/day",
    cost: "Free Tier",
    feeds: ["Malware Reports", "IOCs", "Behavioral Analysis"],
  },
]

const recentIntelligence = [
  {
    id: 1,
    source: "VirusTotal",
    type: "Malicious IP",
    value: "203.0.113.42",
    confidence: 95,
    timestamp: "2024-01-15T14:45:00Z",
    description: "IP flagged by 15/70 security vendors as malicious",
  },
  {
    id: 2,
    source: "AlienVault OTX",
    type: "Malware Family",
    value: "Cobalt Strike",
    confidence: 92,
    timestamp: "2024-01-15T14:42:00Z",
    description: "New pulse created for Cobalt Strike campaign targeting MSMEs",
  },
  {
    id: 3,
    source: "Shodan",
    type: "Vulnerable Service",
    value: "RDP on port 3389",
    confidence: 88,
    timestamp: "2024-01-15T14:38:00Z",
    description: "Exposed RDP services detected in MSME networks",
  },
  {
    id: 4,
    source: "MISP",
    type: "Threat Event",
    value: "Banking Trojan Campaign",
    confidence: 90,
    timestamp: "2024-01-15T14:35:00Z",
    description: "New banking trojan event shared by financial sector",
  },
]

export default function OSINTSourcesPage() {
  const [sources, setSources] = useState(osintSources)
  const [intelligence, setIntelligence] = useState(recentIntelligence)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-50"
      case "maintenance":
        return "text-yellow-600 bg-yellow-50"
      case "error":
        return "text-red-600 bg-red-50"
      case "disabled":
        return "text-gray-600 bg-gray-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Malware Analysis":
        return "bg-red-100 text-red-800"
      case "Threat Intelligence":
        return "bg-blue-100 text-blue-800"
      case "Network Intelligence":
        return "bg-purple-100 text-purple-800"
      case "Information Sharing":
        return "bg-green-100 text-green-800"
      case "URL Analysis":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleRefreshAll = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setSources((prev) =>
      prev.map((source) => ({
        ...source,
        lastSync: new Date().toISOString(),
        dataPoints: source.dataPoints + Math.floor(Math.random() * 100),
      })),
    )
    setIsRefreshing(false)
  }

  const toggleSource = (sourceId: number) => {
    setSources((prev) =>
      prev.map((source) =>
        source.id === sourceId
          ? {
              ...source,
              status: source.status === "active" ? "disabled" : "active",
            }
          : source,
      ),
    )
  }

  const stats = {
    totalSources: sources.length,
    activeSources: sources.filter((s) => s.status === "active").length,
    totalDataPoints: sources.reduce((sum, s) => sum + s.dataPoints, 0),
    avgReliability: Math.round(sources.reduce((sum, s) => sum + s.reliability, 0) / sources.length),
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">OSINT Sources</h1>
            <p className="text-gray-600 mt-1">Open Source Intelligence feeds and data sources</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleRefreshAll} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Syncing..." : "Sync All"}
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Source
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Sources</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalSources}</p>
                </div>
                <Database className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Sources</p>
                  <p className="text-3xl font-bold text-green-600">{stats.activeSources}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Data Points</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalDataPoints.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Reliability</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.avgReliability}%</p>
                </div>
                <Shield className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sources" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="intelligence">Recent Intelligence</TabsTrigger>
            <TabsTrigger value="analytics">Source Analytics</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sources.map((source) => (
                <Card key={source.id} className="border-2">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-6 w-6 text-blue-500" />
                        <div>
                          <CardTitle className="text-lg">{source.name}</CardTitle>
                          <CardDescription>{source.description}</CardDescription>
                        </div>
                      </div>
                      <Switch checked={source.status === "active"} onCheckedChange={() => toggleSource(source.id)} />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryColor(source.category)}>{source.category}</Badge>
                      <Badge className={getStatusColor(source.status)}>{source.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-600">Last Sync:</span>
                        <div className="text-gray-900">{new Date(source.lastSync).toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Data Points:</span>
                        <div className="text-gray-900">{source.dataPoints.toLocaleString()}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Rate Limit:</span>
                        <div className="text-gray-900">{source.rateLimit}</div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-600">Cost:</span>
                        <div className="text-gray-900">{source.cost}</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-600">Reliability</span>
                        <span className="text-sm font-semibold">{source.reliability}%</span>
                      </div>
                      <Progress value={source.reliability} className="h-2" />
                    </div>

                    <div>
                      <span className="text-sm font-medium text-gray-600 mb-2 block">Data Feeds:</span>
                      <div className="flex flex-wrap gap-1">
                        {source.feeds.map((feed) => (
                          <Badge key={feed} variant="outline" className="text-xs">
                            {feed}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View Data
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Portal
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Intelligence</CardTitle>
                <CardDescription>Latest threat intelligence from OSINT sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {intelligence.map((intel) => (
                    <div key={intel.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline">{intel.source}</Badge>
                            <Badge variant="secondary">{intel.type}</Badge>
                            <span className="text-sm text-gray-500">Confidence: {intel.confidence}%</span>
                            <span className="text-sm text-gray-500 ml-auto">
                              {new Date(intel.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <div className="font-medium text-gray-900 mb-1">{intel.value}</div>
                          <div className="text-sm text-gray-600">{intel.description}</div>
                        </div>
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
                  <CardTitle>Source Performance</CardTitle>
                  <CardDescription>Data collection and reliability metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Performance analytics coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Quality</CardTitle>
                  <CardDescription>Intelligence accuracy and freshness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Shield className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Quality metrics coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Configuration</CardTitle>
                <CardDescription>Configure OSINT source settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Sync Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Auto-sync enabled</label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Sync interval (minutes)</label>
                        <select className="border rounded px-2 py-1 text-sm">
                          <option>5</option>
                          <option>15</option>
                          <option>30</option>
                          <option>60</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Retry failed syncs</label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Data Processing</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Auto-enrich IOCs</label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Deduplicate data</label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Confidence threshold</label>
                        <select className="border rounded px-2 py-1 text-sm">
                          <option>70%</option>
                          <option>80%</option>
                          <option>90%</option>
                          <option>95%</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button>Save Configuration</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
