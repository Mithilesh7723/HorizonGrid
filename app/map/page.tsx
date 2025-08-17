"use client"

import { useState } from "react"
import { Shield, ArrowLeft, RefreshCw, AlertTriangle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock threat data for different Indian states
const mockThreatData = [
  { state: "Maharashtra", threats: 234, severity: "High", lat: 19.7515, lng: 75.7139 },
  { state: "Karnataka", threats: 189, severity: "Medium", lat: 15.3173, lng: 75.7139 },
  { state: "Tamil Nadu", threats: 156, severity: "High", lat: 11.1271, lng: 78.6569 },
  { state: "Gujarat", threats: 143, severity: "Medium", lat: 22.2587, lng: 71.1924 },
  { state: "Delhi", threats: 198, severity: "Critical", lat: 28.7041, lng: 77.1025 },
  { state: "West Bengal", threats: 167, severity: "High", lat: 22.9868, lng: 87.855 },
  { state: "Rajasthan", threats: 89, severity: "Low", lat: 27.0238, lng: 74.2179 },
  { state: "Uttar Pradesh", threats: 201, severity: "High", lat: 26.8467, lng: 80.9462 },
]

const recentIncidents = [
  {
    id: 1,
    location: "Mumbai, Maharashtra",
    type: "Phishing Campaign",
    affected: 45,
    time: "12 minutes ago",
    severity: "High",
  },
  {
    id: 2,
    location: "Bangalore, Karnataka",
    type: "Malware Distribution",
    affected: 23,
    time: "28 minutes ago",
    severity: "Critical",
  },
  {
    id: 3,
    location: "Chennai, Tamil Nadu",
    type: "DDoS Attack",
    affected: 67,
    time: "1 hour ago",
    severity: "Medium",
  },
  {
    id: 4,
    location: "Delhi NCR",
    type: "Ransomware Attempt",
    affected: 12,
    time: "2 hours ago",
    severity: "Critical",
  },
]

export default function ThreatMapPage() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "High":
        return "destructive"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "outline"
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const filteredData =
    filter === "all" ? mockThreatData : mockThreatData.filter((item) => item.severity.toLowerCase() === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">HorizonGrid</span>
            </Link>
            <div className="flex items-center gap-2 text-gray-600">
              <ArrowLeft className="h-4 w-4" />
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <span>/</span>
              <span>Threat Map</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Real-Time Threat Map</h1>
              <p className="text-gray-600">Live visualization of cyber threats across India's MSME network</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Threats</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Visualization */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>India Threat Heatmap</CardTitle>
                <CardDescription>Click on states to view detailed threat information</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Simplified India Map Visualization */}
                <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 h-96 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🗺️</div>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">Interactive Map Coming Soon</h3>
                      <p className="text-gray-600">Real-time threat visualization across Indian states</p>
                    </div>
                  </div>

                  {/* Threat Indicators */}
                  <div className="absolute top-4 left-4 space-y-2">
                    {filteredData.slice(0, 4).map((item, index) => (
                      <div
                        key={item.state}
                        className={`w-4 h-4 rounded-full ${getSeverityColor(item.severity)} animate-pulse cursor-pointer`}
                        style={{
                          left: `${20 + index * 15}%`,
                          top: `${30 + index * 10}%`,
                        }}
                        title={`${item.state}: ${item.threats} threats`}
                        onClick={() => setSelectedState(item.state)}
                      />
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-sm">
                    <h4 className="text-sm font-semibold mb-2">Threat Levels</h4>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span>Critical</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-orange-500" />
                        <span>High</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span>Medium</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span>Low</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* State Statistics */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredData.slice(0, 4).map((item) => (
                    <div
                      key={item.state}
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedState === item.state
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedState(selectedState === item.state ? null : item.state)}
                    >
                      <div className="text-sm font-medium text-gray-900">{item.state}</div>
                      <div className="text-lg font-bold text-gray-900">{item.threats}</div>
                      <Badge variant={getSeverityBadgeVariant(item.severity)} className="text-xs">
                        {item.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Incidents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Recent Incidents
                </CardTitle>
                <CardDescription>Latest threats detected across the network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIncidents.map((incident) => (
                    <div key={incident.id} className="border-l-4 border-orange-500 pl-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{incident.type}</span>
                        <Badge variant={getSeverityBadgeVariant(incident.severity)} className="text-xs">
                          {incident.severity}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{incident.location}</div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{incident.affected} MSMEs affected</span>
                        <span>{incident.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Threat Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Threat Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Active Threats</span>
                    <span className="font-bold text-lg">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">States Affected</span>
                    <span className="font-bold text-lg">28</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">MSMEs Protected</span>
                    <span className="font-bold text-lg">8,934</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Rules Deployed</span>
                    <span className="font-bold text-lg">456</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected State Details */}
            {selectedState && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedState} Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const stateData = mockThreatData.find((item) => item.state === selectedState)
                    if (!stateData) return null

                    return (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Active Threats</span>
                          <span className="font-bold">{stateData.threats}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Severity Level</span>
                          <Badge variant={getSeverityBadgeVariant(stateData.severity)}>{stateData.severity}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">MSMEs in Network</span>
                          <span className="font-bold">{Math.floor(stateData.threats * 4.2)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Last Update</span>
                          <span className="text-sm text-gray-600">2 min ago</span>
                        </div>
                        <Button className="w-full mt-4" size="sm">
                          View Detailed Report
                        </Button>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
