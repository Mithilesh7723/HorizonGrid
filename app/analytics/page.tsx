"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  RefreshCw,
  Users,
  Shield,
  AlertTriangle,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const mockAnalytics = {
  overview: {
    totalThreats: 15247,
    threatsBlocked: 14892,
    msmeProtected: 28934,
    avgResponseTime: 2.3,
    threatGrowth: 12.5,
    blockingEfficiency: 97.7,
  },
  threatsByType: [
    { type: "IP", count: 5847, percentage: 38.4 },
    { type: "Domain", count: 4123, percentage: 27.0 },
    { type: "Hash", count: 2891, percentage: 19.0 },
    { type: "URL", count: 1734, percentage: 11.4 },
    { type: "Email", count: 652, percentage: 4.2 },
  ],
  threatsBySeverity: [
    { severity: "Critical", count: 1524, percentage: 10.0, color: "bg-red-500" },
    { severity: "High", count: 4573, percentage: 30.0, color: "bg-orange-500" },
    { severity: "Medium", count: 6099, percentage: 40.0, color: "bg-yellow-500" },
    { severity: "Low", count: 3051, percentage: 20.0, color: "bg-blue-500" },
  ],
  topSources: [
    { name: "Mumbai Manufacturing Hub", threats: 2847, growth: 15.2 },
    { name: "Delhi Financial District", threats: 2134, growth: 8.7 },
    { name: "Bangalore Tech Cluster", threats: 1923, growth: -3.4 },
    { name: "Chennai Industrial Zone", threats: 1678, growth: 22.1 },
    { name: "Pune Manufacturing Hub", threats: 1456, growth: 11.8 },
  ],
  regionalData: [
    { region: "Maharashtra", threats: 3847, msmes: 8934, efficiency: 98.2 },
    { region: "Karnataka", threats: 2934, msmes: 6782, efficiency: 97.8 },
    { region: "Tamil Nadu", threats: 2456, msmes: 5643, efficiency: 96.9 },
    { region: "Delhi", threats: 2134, msmes: 4567, efficiency: 98.5 },
    { region: "Gujarat", threats: 1876, msmes: 4123, efficiency: 97.3 },
  ],
  timeSeriesData: [
    { date: "2024-01-08", threats: 234, blocked: 228 },
    { date: "2024-01-09", threats: 267, blocked: 261 },
    { date: "2024-01-10", threats: 189, blocked: 185 },
    { date: "2024-01-11", threats: 312, blocked: 305 },
    { date: "2024-01-12", threats: 278, blocked: 272 },
    { date: "2024-01-13", threats: 345, blocked: 337 },
    { date: "2024-01-14", threats: 298, blocked: 291 },
    { date: "2024-01-15", threats: 423, blocked: 414 },
  ],
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [selectedMetric, setSelectedMetric] = useState("threats")
  const [isRefreshing, setIsRefreshing] = useState(false)

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
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">Comprehensive threat intelligence and network performance analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">Total Threats</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {mockAnalytics.overview.totalThreats.toLocaleString()}
                  </p>
                  <div className="flex items-center text-xs text-blue-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />+{mockAnalytics.overview.threatGrowth}% from last period
                  </div>
                </div>
                <AlertTriangle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">Threats Blocked</p>
                  <p className="text-3xl font-bold text-green-700">
                    {mockAnalytics.overview.threatsBlocked.toLocaleString()}
                  </p>
                  <div className="flex items-center text-xs text-green-600 mt-1">
                    <Shield className="h-3 w-3 mr-1" />
                    {mockAnalytics.overview.blockingEfficiency}% efficiency
                  </div>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-800">MSMEs Protected</p>
                  <p className="text-3xl font-bold text-purple-700">
                    {mockAnalytics.overview.msmeProtected.toLocaleString()}
                  </p>
                  <div className="flex items-center text-xs text-purple-600 mt-1">
                    <Users className="h-3 w-3 mr-1" />
                    Across 28 states
                  </div>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-800">Avg Response Time</p>
                  <p className="text-3xl font-bold text-orange-700">{mockAnalytics.overview.avgResponseTime}s</p>
                  <div className="flex items-center text-xs text-orange-600 mt-1">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -0.3s improvement
                  </div>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
            <TabsTrigger value="regional">Regional Data</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Threat Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Threats by Type</CardTitle>
                  <CardDescription>Distribution of threat indicators by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.threatsByType.map((item) => (
                      <div key={item.type} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{item.type}</Badge>
                          <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={item.percentage} className="w-20 h-2" />
                          <span className="text-sm font-medium w-12">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Severity Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Threats by Severity</CardTitle>
                  <CardDescription>Threat severity level distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.threatsBySeverity.map((item) => (
                      <div key={item.severity} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="font-medium">{item.severity}</span>
                          <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={item.percentage} className="w-20 h-2" />
                          <span className="text-sm font-medium w-12">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Sources */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Threat Sources</CardTitle>
                  <CardDescription>Organizations reporting the most threats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalytics.topSources.map((source, index) => (
                      <div key={source.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-medium">{source.name}</div>
                            <div className="text-sm text-gray-600">{source.threats} threats</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          {source.growth > 0 ? (
                            <TrendingUp className="h-4 w-4 text-green-500" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-500" />
                          )}
                          <span className={source.growth > 0 ? "text-green-600" : "text-red-600"}>
                            {Math.abs(source.growth)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Threat Timeline</CardTitle>
                  <CardDescription>Daily threat detection and blocking activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Interactive timeline chart coming soon</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Showing {mockAnalytics.timeSeriesData.length} days of data
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="threats" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Threat Categories</CardTitle>
                  <CardDescription>Breakdown of threats by attack category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Malware", count: 4567, percentage: 30.0 },
                      { category: "Phishing", count: 3421, percentage: 22.4 },
                      { category: "C&C Communication", count: 2890, percentage: 19.0 },
                      { category: "Suspicious Activity", count: 2134, percentage: 14.0 },
                      { category: "Data Exfiltration", count: 1678, percentage: 11.0 },
                      { category: "Other", count: 557, percentage: 3.6 },
                    ].map((item) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{item.category}</span>
                          <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={item.percentage} className="w-20 h-2" />
                          <span className="text-sm font-medium w-12">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Attack Vectors</CardTitle>
                  <CardDescription>Common attack methods and entry points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { vector: "Email Attachments", count: 3456, percentage: 35.2 },
                      { vector: "Web Downloads", count: 2890, percentage: 29.4 },
                      { vector: "Network Intrusion", count: 1678, percentage: 17.1 },
                      { vector: "USB/Removable Media", count: 1234, percentage: 12.6 },
                      { vector: "Social Engineering", count: 567, percentage: 5.7 },
                    ].map((item) => (
                      <div key={item.vector} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{item.vector}</span>
                          <span className="text-sm text-gray-600">{item.count.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={item.percentage} className="w-20 h-2" />
                          <span className="text-sm font-medium w-12">{item.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="regional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regional Threat Distribution</CardTitle>
                <CardDescription>Threat activity and protection efficiency by Indian states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAnalytics.regionalData.map((region) => (
                    <div key={region.region} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-blue-500" />
                          <h3 className="font-semibold text-lg">{region.region}</h3>
                        </div>
                        <Badge className="bg-green-100 text-green-800">{region.efficiency}% efficiency</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Threats Detected:</span>
                          <div className="font-semibold text-red-600">{region.threats.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">MSMEs Protected:</span>
                          <div className="font-semibold text-blue-600">{region.msmes.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Protection Rate:</span>
                          <div className="font-semibold text-green-600">{region.efficiency}%</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={region.efficiency} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                  <CardDescription>Platform performance and reliability metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">API Response Time</span>
                      <span className="text-sm font-semibold">45ms</span>
                    </div>
                    <Progress value={85} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">System Uptime</span>
                      <span className="text-sm font-semibold">99.97%</span>
                    </div>
                    <Progress value={99.97} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Threat Processing Rate</span>
                      <span className="text-sm font-semibold">1,247/min</span>
                    </div>
                    <Progress value={92} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">False Positive Rate</span>
                      <span className="text-sm font-semibold">0.02%</span>
                    </div>
                    <Progress value={2} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Network Health</CardTitle>
                  <CardDescription>MSME network connectivity and participation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active MSMEs</span>
                      <span className="text-sm font-semibold">28,934</span>
                    </div>
                    <Progress value={89} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Data Sharing Rate</span>
                      <span className="text-sm font-semibold">94.3%</span>
                    </div>
                    <Progress value={94.3} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Rule Deployment Success</span>
                      <span className="text-sm font-semibold">98.7%</span>
                    </div>
                    <Progress value={98.7} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Network Coverage</span>
                      <span className="text-sm font-semibold">28/28 states</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Threat Trends</CardTitle>
                  <CardDescription>Emerging threat patterns and predictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Trend analysis coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Predictive Analytics</CardTitle>
                  <CardDescription>AI-powered threat forecasting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Predictive models coming soon</p>
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
