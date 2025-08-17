"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Download, Share, Shield, Globe, TrendingUp, Users, Database, Zap, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

const threatAnalysis = {
  id: "TH-2024-001337",
  ioc: "203.0.113.42",
  type: "IP",
  severity: "Critical",
  confidence: 95,
  firstSeen: "2024-01-15T08:30:00Z",
  lastSeen: "2024-01-15T14:45:00Z",
  status: "active",

  enrichment: {
    cve: ["CVE-2024-1337", "CVE-2024-1338"],
    malwareFamily: "Cobalt Strike",
    campaign: "APT-Mumbai-2024",
    geolocation: {
      country: "Russia",
      city: "Moscow",
      coordinates: [55.7558, 37.6176],
    },
    asn: {
      number: "AS12345",
      organization: "Malicious Hosting Ltd",
    },
    ports: [80, 443, 8080, 9999],
    protocols: ["HTTP", "HTTPS", "TCP"],
    tags: ["APT", "C&C", "Malware", "Banking", "Persistent"],
  },

  intelligence: {
    threatActor: "APT-Mumbai",
    motivation: "Financial Gain",
    sophistication: "High",
    attribution: "State-sponsored",
    ttps: [
      "T1071.001 - Application Layer Protocol: Web Protocols",
      "T1090 - Proxy",
      "T1573.002 - Encrypted Channel: Asymmetric Cryptography",
    ],
  },

  impact: {
    affectedMsmes: 247,
    affectedRegions: ["Maharashtra", "Karnataka", "Tamil Nadu"],
    estimatedLoss: "₹2.4 Crores",
    sectors: ["Manufacturing", "Finance", "Retail"],
  },

  timeline: [
    {
      timestamp: "2024-01-15T08:30:00Z",
      event: "First detection by Mumbai MSME Network",
      severity: "medium",
    },
    {
      timestamp: "2024-01-15T09:15:00Z",
      event: "AI analysis completed - classified as APT activity",
      severity: "high",
    },
    {
      timestamp: "2024-01-15T09:45:00Z",
      event: "Network alert sent to 2,847 MSMEs",
      severity: "high",
    },
    {
      timestamp: "2024-01-15T10:30:00Z",
      event: "Auto-defense rules deployed to 1,456 systems",
      severity: "medium",
    },
    {
      timestamp: "2024-01-15T14:45:00Z",
      event: "Last communication attempt blocked",
      severity: "low",
    },
  ],

  mitigation: {
    rulesDeployed: 1456,
    systemsProtected: 2847,
    blockedAttempts: 15234,
    effectiveness: 98.7,
  },
}

export default function ThreatAnalysisPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

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

  const getTimelineSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "border-red-500 bg-red-50"
      case "medium":
        return "border-yellow-500 bg-yellow-50"
      case "low":
        return "border-blue-500 bg-blue-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Threat Analysis</h1>
            <p className="text-gray-600 mt-1">Deep dive analysis of threat {threatAnalysis.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Block Now
            </Button>
          </div>
        </div>

        {/* Threat Overview */}
        <Card className="border-2 border-red-200 bg-red-50/50">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${getSeverityColor(threatAnalysis.severity)}`} />
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{threatAnalysis.ioc}</h2>
                    <Badge variant="outline">{threatAnalysis.type}</Badge>
                    <Badge variant="destructive">{threatAnalysis.severity}</Badge>
                    <Badge className="bg-red-100 text-red-800">{threatAnalysis.status}</Badge>
                  </div>
                  <p className="text-gray-600">
                    {threatAnalysis.enrichment.malwareFamily} • {threatAnalysis.enrichment.campaign} • Confidence:{" "}
                    {threatAnalysis.confidence}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Threat ID</div>
                <div className="font-mono text-lg font-semibold">{threatAnalysis.id}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Affected MSMEs</p>
                  <p className="text-3xl font-bold text-red-600">{threatAnalysis.impact.affectedMsmes}</p>
                </div>
                <Users className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Estimated Loss</p>
                  <p className="text-3xl font-bold text-orange-600">{threatAnalysis.impact.estimatedLoss}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rules Deployed</p>
                  <p className="text-3xl font-bold text-blue-600">{threatAnalysis.mitigation.rulesDeployed}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Effectiveness</p>
                  <p className="text-3xl font-bold text-green-600">{threatAnalysis.mitigation.effectiveness}%</p>
                </div>
                <Zap className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="intelligence">Intelligence</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">IOC Value</label>
                      <div className="font-mono text-sm bg-gray-100 p-2 rounded mt-1">{threatAnalysis.ioc}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Type</label>
                      <div className="text-sm mt-1">{threatAnalysis.type}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">First Seen</label>
                      <div className="text-sm mt-1">{new Date(threatAnalysis.firstSeen).toLocaleString()}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Last Seen</label>
                      <div className="text-sm mt-1">{new Date(threatAnalysis.lastSeen).toLocaleString()}</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">CVE References</label>
                    <div className="flex gap-2 mt-1">
                      {threatAnalysis.enrichment.cve.map((cve) => (
                        <Badge key={cve} variant="outline" className="cursor-pointer hover:bg-blue-50">
                          {cve}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Tags</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {threatAnalysis.enrichment.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Geolocation & Network</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Country</label>
                      <div className="text-sm mt-1 flex items-center gap-2">
                        🇷🇺 {threatAnalysis.enrichment.geolocation.country}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">City</label>
                      <div className="text-sm mt-1">{threatAnalysis.enrichment.geolocation.city}</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">ASN</label>
                    <div className="text-sm mt-1">
                      {threatAnalysis.enrichment.asn.number} - {threatAnalysis.enrichment.asn.organization}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Open Ports</label>
                    <div className="flex gap-2 mt-1">
                      {threatAnalysis.enrichment.ports.map((port) => (
                        <Badge key={port} variant="outline" className="font-mono">
                          {port}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Protocols</label>
                    <div className="flex gap-2 mt-1">
                      {threatAnalysis.enrichment.protocols.map((protocol) => (
                        <Badge key={protocol} variant="secondary">
                          {protocol}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="intelligence" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Threat Actor Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Actor</label>
                    <div className="text-lg font-semibold mt-1">{threatAnalysis.intelligence.threatActor}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Motivation</label>
                      <div className="text-sm mt-1">{threatAnalysis.intelligence.motivation}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Sophistication</label>
                      <Badge variant="destructive" className="mt-1">
                        {threatAnalysis.intelligence.sophistication}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Attribution</label>
                    <div className="text-sm mt-1">{threatAnalysis.intelligence.attribution}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>MITRE ATT&CK TTPs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {threatAnalysis.intelligence.ttps.map((ttp, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50/50">
                        <div className="font-mono text-sm font-medium text-blue-800">{ttp.split(" - ")[0]}</div>
                        <div className="text-sm text-gray-600">{ttp.split(" - ")[1]}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Timeline</CardTitle>
                <CardDescription>Chronological sequence of threat-related events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threatAnalysis.timeline.map((event, index) => (
                    <div key={index} className={`border-l-4 pl-4 py-3 ${getTimelineSeverityColor(event.severity)}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-medium text-gray-900">{event.event}</div>
                        <Badge variant="outline" className="text-xs">
                          {event.severity}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">{new Date(event.timestamp).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Business Impact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Affected MSMEs</label>
                    <div className="text-3xl font-bold text-red-600 mt-1">{threatAnalysis.impact.affectedMsmes}</div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Estimated Financial Loss</label>
                    <div className="text-2xl font-bold text-orange-600 mt-1">{threatAnalysis.impact.estimatedLoss}</div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Affected Regions</label>
                    <div className="flex gap-2 mt-1">
                      {threatAnalysis.impact.affectedRegions.map((region) => (
                        <Badge key={region} variant="outline">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Affected Sectors</label>
                    <div className="flex gap-2 mt-1">
                      {threatAnalysis.impact.sectors.map((sector) => (
                        <Badge key={sector} variant="secondary">
                          {sector}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Impact visualization coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mitigation" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mitigation Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium text-gray-600">Overall Effectiveness</label>
                      <span className="text-sm font-semibold">{threatAnalysis.mitigation.effectiveness}%</span>
                    </div>
                    <Progress value={threatAnalysis.mitigation.effectiveness} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Rules Deployed</label>
                      <div className="text-2xl font-bold text-blue-600 mt-1">
                        {threatAnalysis.mitigation.rulesDeployed}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Systems Protected</label>
                      <div className="text-2xl font-bold text-green-600 mt-1">
                        {threatAnalysis.mitigation.systemsProtected}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Blocked Attempts</label>
                    <div className="text-2xl font-bold text-red-600 mt-1">
                      {threatAnalysis.mitigation.blockedAttempts.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-50">
                      <div className="font-medium text-red-800">Immediate</div>
                      <div className="text-sm text-red-700">Block all traffic from this IP address</div>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50">
                      <div className="font-medium text-orange-800">Short-term</div>
                      <div className="text-sm text-orange-700">Update IDS signatures for Cobalt Strike detection</div>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50">
                      <div className="font-medium text-blue-800">Long-term</div>
                      <div className="text-sm text-blue-700">
                        Implement network segmentation to limit lateral movement
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="related" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Related Threats</CardTitle>
                <CardDescription>Similar threats and indicators from the same campaign</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Related threat analysis coming soon</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
