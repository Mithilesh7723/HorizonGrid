"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Play, Save, Share, Clock, Target, Database, Filter, Code, AlertTriangle, CheckCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const huntingQueries = [
  {
    id: 1,
    name: "Suspicious PowerShell Activity",
    description: "Detect encoded PowerShell commands and suspicious execution patterns",
    query: `process_name:"powershell.exe" AND (command_line:*-EncodedCommand* OR command_line:*-enc* OR command_line:*DownloadString* OR command_line:*IEX*)`,
    category: "Malware Detection",
    severity: "High",
    lastRun: "2024-01-15T14:30:00Z",
    results: 23,
    status: "active",
    author: "Security Team",
  },
  {
    id: 2,
    name: "Lateral Movement Detection",
    description: "Identify potential lateral movement using WMI and remote services",
    query: `(process_name:"wmic.exe" OR process_name:"psexec.exe" OR process_name:"winrs.exe") AND network_connection:true`,
    category: "Lateral Movement",
    severity: "Critical",
    lastRun: "2024-01-15T13:45:00Z",
    results: 7,
    status: "active",
    author: "Threat Hunter",
  },
  {
    id: 3,
    name: "Credential Dumping Attempts",
    description: "Detect attempts to dump credentials from memory or registry",
    query: `(process_name:"mimikatz.exe" OR command_line:*sekurlsa* OR command_line:*lsadump* OR file_path:*SAM OR file_path:*SYSTEM)`,
    category: "Credential Access",
    severity: "Critical",
    lastRun: "2024-01-15T12:20:00Z",
    results: 3,
    status: "scheduled",
    author: "Security Analyst",
  },
  {
    id: 4,
    name: "Suspicious Network Connections",
    description: "Identify connections to known malicious IPs and domains",
    query: `network_connection:true AND (destination_ip:203.0.113.* OR destination_domain:*.malicious.com OR destination_port:4444)`,
    category: "Command & Control",
    severity: "High",
    lastRun: "2024-01-15T11:15:00Z",
    results: 45,
    status: "completed",
    author: "Network Analyst",
  },
]

const huntingResults = [
  {
    id: 1,
    queryId: 1,
    timestamp: "2024-01-15T14:32:15Z",
    source: "MSME-Mumbai-001",
    event: "PowerShell execution with encoded command detected",
    severity: "High",
    details: {
      process: "powershell.exe",
      commandLine: "powershell.exe -EncodedCommand SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQA...",
      user: "SYSTEM",
      parentProcess: "winword.exe",
    },
    status: "investigating",
  },
  {
    id: 2,
    queryId: 2,
    timestamp: "2024-01-15T13:47:22Z",
    source: "MSME-Delhi-005",
    event: "WMI remote execution detected",
    severity: "Critical",
    details: {
      process: "wmic.exe",
      commandLine: "wmic /node:192.168.1.50 process call create cmd.exe",
      user: "admin",
      targetHost: "192.168.1.50",
    },
    status: "confirmed",
  },
  {
    id: 3,
    queryId: 4,
    timestamp: "2024-01-15T11:18:45Z",
    source: "MSME-Bangalore-012",
    event: "Connection to known C&C server",
    severity: "Critical",
    details: {
      process: "svchost.exe",
      destinationIp: "203.0.113.42",
      destinationPort: "4444",
      protocol: "TCP",
    },
    status: "blocked",
  },
]

export default function ThreatHuntingPage() {
  const [queries, setQueries] = useState(huntingQueries)
  const [results, setResults] = useState(huntingResults)
  const [selectedQuery, setSelectedQuery] = useState<any>(null)
  const [customQuery, setCustomQuery] = useState("")
  const [isRunning, setIsRunning] = useState(false)

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
        return "text-green-600 bg-green-50"
      case "scheduled":
        return "text-blue-600 bg-blue-50"
      case "completed":
        return "text-gray-600 bg-gray-50"
      case "investigating":
        return "text-yellow-600 bg-yellow-50"
      case "confirmed":
        return "text-red-600 bg-red-50"
      case "blocked":
        return "text-purple-600 bg-purple-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const handleRunQuery = async (queryId?: number) => {
    setIsRunning(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRunning(false)
    // Simulate adding new results
    if (queryId) {
      setQueries((prev) =>
        prev.map((q) =>
          q.id === queryId
            ? {
                ...q,
                lastRun: new Date().toISOString(),
                results: q.results + Math.floor(Math.random() * 5),
                status: "completed",
              }
            : q,
        ),
      )
    }
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Threat Hunting</h1>
            <p className="text-gray-600 mt-1">Proactive threat detection and investigation platform</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save Query
            </Button>
            <Button variant="outline">
              <Share className="h-4 w-4 mr-2" />
              Share Hunt
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Hunts</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {queries.filter((q) => q.status === "active").length}
                  </p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Detections</p>
                  <p className="text-3xl font-bold text-red-600">{results.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Confirmed Threats</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {results.filter((r) => r.status === "confirmed").length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Data Sources</p>
                  <p className="text-3xl font-bold text-green-600">12</p>
                </div>
                <Database className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="queries" className="space-y-6">
          <TabsList>
            <TabsTrigger value="queries">Hunt Queries</TabsTrigger>
            <TabsTrigger value="results">Detection Results</TabsTrigger>
            <TabsTrigger value="custom">Custom Hunt</TabsTrigger>
            <TabsTrigger value="analytics">Hunt Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="queries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Threat Hunting Queries</CardTitle>
                <CardDescription>Pre-built and custom queries for proactive threat detection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {queries.map((query) => (
                    <div key={query.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{query.name}</h3>
                            <Badge variant="outline">{query.category}</Badge>
                            <Badge variant={query.severity === "Critical" ? "destructive" : "secondary"}>
                              {query.severity}
                            </Badge>
                            <Badge className={getStatusColor(query.status)}>{query.status}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{query.description}</p>
                          <div className="bg-gray-100 p-3 rounded-lg mb-3">
                            <code className="text-sm font-mono">{query.query}</code>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Author: {query.author}</span>
                            <span>Last run: {new Date(query.lastRun).toLocaleString()}</span>
                            <span>Results: {query.results}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRunQuery(query.id)}
                            disabled={isRunning}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            {isRunning ? "Running..." : "Run"}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setSelectedQuery(query)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Detection Results</CardTitle>
                    <CardDescription>Recent threat hunting findings and alerts</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Results</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {results.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getSeverityColor(result.severity)}`} />
                          <div>
                            <h3 className="font-semibold">{result.event}</h3>
                            <div className="text-sm text-gray-600">
                              Source: {result.source} • {new Date(result.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={result.severity === "Critical" ? "destructive" : "secondary"}>
                            {result.severity}
                          </Badge>
                          <Badge className={getStatusColor(result.status)}>{result.status}</Badge>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium mb-2">Event Details:</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          {Object.entries(result.details).map(([key, value]) => (
                            <div key={key}>
                              <span className="font-medium text-gray-600">
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                              </span>
                              <span className="ml-2 font-mono">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">
                          Investigate
                        </Button>
                        <Button size="sm" variant="outline">
                          Create Rule
                        </Button>
                        <Button size="sm" variant="outline">
                          Mark False Positive
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Custom Threat Hunt</CardTitle>
                <CardDescription>Create and execute custom hunting queries</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Query Name</label>
                  <Input placeholder="Enter query name..." />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Description</label>
                  <Input placeholder="Describe what this query detects..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="malware">Malware Detection</SelectItem>
                        <SelectItem value="lateral">Lateral Movement</SelectItem>
                        <SelectItem value="credential">Credential Access</SelectItem>
                        <SelectItem value="command">Command & Control</SelectItem>
                        <SelectItem value="exfiltration">Data Exfiltration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Severity</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Hunt Query</label>
                  <Textarea
                    placeholder="Enter your hunting query using KQL syntax..."
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    rows={6}
                    className="font-mono"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Query Syntax Help:</h4>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>• Use field:value for exact matches</div>
                    <div>• Use wildcards (*) for partial matches</div>
                    <div>• Combine with AND, OR, NOT operators</div>
                    <div>• Use parentheses for grouping</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => handleRunQuery()} disabled={isRunning || !customQuery}>
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? "Running Hunt..." : "Run Hunt"}
                  </Button>
                  <Button variant="outline">
                    <Code className="h-4 w-4 mr-2" />
                    Validate Query
                  </Button>
                  <Button variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save Query
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hunt Performance</CardTitle>
                  <CardDescription>Query execution and detection metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Target className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Hunt analytics coming soon</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Detection Timeline</CardTitle>
                  <CardDescription>Threat detection trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Timeline visualization coming soon</p>
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
