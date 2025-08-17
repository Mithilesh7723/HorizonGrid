"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Crown,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  Database,
  Zap,
  Globe,
  Shield,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BarChart3 } from "lucide-react" // Import BarChart3

const mockThreats = [
  {
    id: 1,
    ioc: "203.0.113.42",
    type: "IP",
    severity: "Critical",
    status: "verified",
    confidence: 95,
    source: "Mumbai MSME Network",
    enrichment: {
      cve: "CVE-2024-1337",
      malwareFamily: "Cobalt Strike",
      campaign: "APT-Mumbai-2024",
      geolocation: "Russia",
      asn: "AS12345",
      tags: ["APT", "C&C", "Malware", "Banking"],
    },
    submittedBy: "admin@horizongrid.com",
    submittedAt: "2024-01-15T10:30:00Z",
    lastEnriched: "2024-01-15T11:45:00Z",
    affectedMsmes: 247,
  },
  {
    id: 2,
    ioc: "phishing-bank.malicious.com",
    type: "Domain",
    severity: "High",
    status: "pending",
    confidence: 88,
    source: "Delhi Financial District",
    enrichment: {
      cve: "CVE-2024-2468",
      malwareFamily: "PhishKit",
      campaign: "Banking-Phish-Q1",
      geolocation: "China",
      registrar: "Malicious Registrar Inc",
      tags: ["Phishing", "Banking", "Credential Theft"],
    },
    submittedBy: "analyst@msme.com",
    submittedAt: "2024-01-15T09:15:00Z",
    lastEnriched: null,
    affectedMsmes: 89,
  },
  {
    id: 3,
    ioc: "a1b2c3d4e5f6789abcdef123456789",
    type: "Hash",
    severity: "Medium",
    status: "verified",
    confidence: 92,
    source: "Bangalore Tech Cluster",
    enrichment: {
      cve: "CVE-2024-3579",
      malwareFamily: "Ransomware.Generic",
      campaign: "Crypto-Lock-2024",
      fileType: "PE32",
      size: "2.4MB",
      tags: ["Ransomware", "Encryption", "Payment"],
    },
    submittedBy: "security@techcorp.com",
    submittedAt: "2024-01-15T08:20:00Z",
    lastEnriched: "2024-01-15T10:15:00Z",
    affectedMsmes: 34,
  },
]

const enrichmentSources = [
  { name: "VirusTotal", status: "active", lastSync: "2 min ago" },
  { name: "AlienVault OTX", status: "active", lastSync: "5 min ago" },
  { name: "MISP", status: "active", lastSync: "1 min ago" },
  { name: "Shodan", status: "active", lastSync: "3 min ago" },
  { name: "URLVoid", status: "maintenance", lastSync: "2 hours ago" },
  { name: "Hybrid Analysis", status: "active", lastSync: "4 min ago" },
]

export default function ThreatEnrichmentPage() {
  const [threats, setThreats] = useState(mockThreats)
  const [selectedThreat, setSelectedThreat] = useState<any>(null)
  const [isEnriching, setIsEnriching] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const handleEnrichThreat = async (threatId: number) => {
    setIsEnriching(true)
    // Simulate enrichment process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setThreats((prev) =>
      prev.map((threat) =>
        threat.id === threatId
          ? {
              ...threat,
              status: "verified",
              confidence: Math.min(100, threat.confidence + 5),
              lastEnriched: new Date().toISOString(),
            }
          : threat,
      ),
    )
    setIsEnriching(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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

  const filteredThreats = threats.filter((threat) => {
    const matchesSearch =
      threat.ioc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      threat.source.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || threat.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8 text-amber-500" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Threat Enrichment Center</h1>
              <p className="text-gray-600 mt-1">AI-powered threat intelligence enrichment and verification</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sync Sources
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
                  <p className="text-sm font-medium text-gray-600">Total IOCs</p>
                  <p className="text-3xl font-bold text-gray-900">15,247</p>
                </div>
                <Database className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Enriched Today</p>
                  <p className="text-3xl font-bold text-gray-900">1,456</p>
                </div>
                <Zap className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-gray-900">89</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Accuracy Rate</p>
                  <p className="text-3xl font-bold text-gray-900">94.7%</p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="threats" className="space-y-6">
          <TabsList>
            <TabsTrigger value="threats">Threat Management</TabsTrigger>
            <TabsTrigger value="sources">Enrichment Sources</TabsTrigger>
            <TabsTrigger value="rules">Auto-Enrichment Rules</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="threats" className="space-y-6">
            {/* Search and Filter */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search IOCs, sources, campaigns..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Threats Table */}
            <Card>
              <CardHeader>
                <CardTitle>Threat Intelligence Database</CardTitle>
                <CardDescription>Manage and enrich threat indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredThreats.map((threat) => (
                    <div key={threat.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`} />
                            <Badge variant="outline">{threat.type}</Badge>
                            <Badge className={getStatusColor(threat.status)}>{threat.status}</Badge>
                            <Badge variant="secondary">{threat.severity}</Badge>
                            <span className="text-sm text-gray-500">Confidence: {threat.confidence}%</span>
                          </div>

                          <div className="font-mono text-sm font-medium text-gray-900 mb-2">{threat.ioc}</div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Source:</span> {threat.source}
                            </div>
                            <div>
                              <span className="font-medium">CVE:</span> {threat.enrichment.cve}
                            </div>
                            <div>
                              <span className="font-medium">Campaign:</span> {threat.enrichment.campaign}
                            </div>
                            <div>
                              <span className="font-medium">Affected:</span> {threat.affectedMsmes} MSMEs
                            </div>
                          </div>

                          <div className="flex gap-1 mb-3">
                            {threat.enrichment.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="text-xs text-gray-500">
                            Submitted by {threat.submittedBy} •
                            {threat.lastEnriched
                              ? ` Last enriched ${new Date(threat.lastEnriched).toLocaleString()}`
                              : " Not enriched"}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedThreat(threat)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Threat Details</DialogTitle>
                                <DialogDescription>Complete threat intelligence information</DialogDescription>
                              </DialogHeader>
                              {selectedThreat && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>IOC Value</Label>
                                      <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                                        {selectedThreat.ioc}
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Type</Label>
                                      <div className="text-sm">{selectedThreat.type}</div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Malware Family</Label>
                                      <div className="text-sm">{selectedThreat.enrichment.malwareFamily}</div>
                                    </div>
                                    <div>
                                      <Label>Campaign</Label>
                                      <div className="text-sm">{selectedThreat.enrichment.campaign}</div>
                                    </div>
                                  </div>

                                  <div>
                                    <Label>Tags</Label>
                                    <div className="flex gap-1 mt-1">
                                      {selectedThreat.enrichment.tags.map((tag: string) => (
                                        <Badge key={tag} variant="outline" className="text-xs">
                                          {tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <Label>Additional Context</Label>
                                    <Textarea placeholder="Add enrichment notes..." className="mt-1" />
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEnrichThreat(threat.id)}
                            disabled={isEnriching}
                          >
                            <Zap className="h-4 w-4" />
                          </Button>

                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Enrichment Sources</CardTitle>
                <CardDescription>Manage external threat intelligence sources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {enrichmentSources.map((source) => (
                    <Card key={source.name} className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{source.name}</h3>
                          <Badge
                            className={
                              source.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {source.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Last sync: {source.lastSync}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Configure
                          </Button>
                          <Switch checked={source.status === "active"} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Auto-Enrichment Rules</CardTitle>
                <CardDescription>Configure automatic enrichment workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">High Confidence IP Enrichment</h3>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Automatically enrich IP addresses with confidence &gt; 90% using VirusTotal and Shodan
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">IP</Badge>
                      <Badge variant="outline">Confidence &gt; 90%</Badge>
                      <Badge variant="outline">VirusTotal</Badge>
                      <Badge variant="outline">Shodan</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Domain Reputation Check</h3>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Check domain reputation using URLVoid and AlienVault OTX for all submitted domains
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Domain</Badge>
                      <Badge variant="outline">URLVoid</Badge>
                      <Badge variant="outline">AlienVault OTX</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Hash Analysis Pipeline</h3>
                      <Switch defaultChecked />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Automatically analyze file hashes using Hybrid Analysis and VirusTotal
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Hash</Badge>
                      <Badge variant="outline">Hybrid Analysis</Badge>
                      <Badge variant="outline">VirusTotal</Badge>
                    </div>
                  </div>

                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Rule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrichment Performance</CardTitle>
                  <CardDescription>Source accuracy and response times</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Performance charts coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Threat Categories</CardTitle>
                  <CardDescription>Distribution of enriched threats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Globe className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Category breakdown coming soon</p>
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
