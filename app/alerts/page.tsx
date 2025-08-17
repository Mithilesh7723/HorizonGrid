"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Bell, AlertTriangle, Clock, Filter, Search, Settings, Trash2, Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockAlerts = [
  {
    id: 1,
    title: "Critical Threat Detected",
    description: "Malicious IP 203.0.113.42 detected communicating with multiple MSMEs",
    severity: "Critical",
    category: "Threat Detection",
    timestamp: "2024-01-15T14:45:00Z",
    status: "unread",
    source: "Mumbai Manufacturing Hub",
    affectedMsmes: 247,
    actions: ["Block IP", "Generate Rules", "Notify Network"],
    details: {
      threatType: "C&C Communication",
      confidence: 95,
      cve: "CVE-2024-1337",
    },
  },
  {
    id: 2,
    title: "Phishing Campaign Alert",
    description: "Banking phishing domain detected targeting financial MSMEs",
    severity: "High",
    category: "Phishing",
    timestamp: "2024-01-15T13:30:00Z",
    status: "acknowledged",
    source: "Delhi Financial District",
    affectedMsmes: 89,
    actions: ["Block Domain", "Update Filters"],
    details: {
      threatType: "Phishing",
      confidence: 88,
      domain: "phishing-bank.malicious.com",
    },
  },
  {
    id: 3,
    title: "Ransomware Signature Detected",
    description: "Known ransomware hash found in email attachments",
    severity: "High",
    category: "Malware",
    timestamp: "2024-01-15T12:15:00Z",
    status: "resolved",
    source: "Bangalore Tech Cluster",
    affectedMsmes: 34,
    actions: ["Quarantine Files", "Update AV"],
    details: {
      threatType: "Ransomware",
      confidence: 92,
      hash: "a1b2c3d4e5f6789...",
    },
  },
  {
    id: 4,
    title: "Suspicious Network Activity",
    description: "Unusual outbound connections detected from MSME network",
    severity: "Medium",
    category: "Network Anomaly",
    timestamp: "2024-01-15T11:20:00Z",
    status: "investigating",
    source: "Chennai Industrial Zone",
    affectedMsmes: 12,
    actions: ["Monitor Traffic", "Check Logs"],
    details: {
      threatType: "Network Anomaly",
      confidence: 75,
      connections: 45,
    },
  },
  {
    id: 5,
    title: "System Performance Alert",
    description: "High CPU usage detected on threat analysis servers",
    severity: "Low",
    category: "System",
    timestamp: "2024-01-15T10:45:00Z",
    status: "resolved",
    source: "HorizonGrid System",
    affectedMsmes: 0,
    actions: ["Scale Resources", "Optimize Queries"],
    details: {
      threatType: "System Performance",
      confidence: 100,
      cpuUsage: "89%",
    },
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [selectedAlerts, setSelectedAlerts] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")

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
      case "unread":
        return "text-red-600 bg-red-50"
      case "acknowledged":
        return "text-yellow-600 bg-yellow-50"
      case "investigating":
        return "text-blue-600 bg-blue-50"
      case "resolved":
        return "text-green-600 bg-green-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Threat Detection":
        return "bg-red-100 text-red-800"
      case "Phishing":
        return "bg-orange-100 text-orange-800"
      case "Malware":
        return "bg-purple-100 text-purple-800"
      case "Network Anomaly":
        return "bg-blue-100 text-blue-800"
      case "System":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.source.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    const matchesCategory = filterCategory === "all" || alert.category === filterCategory

    return matchesSearch && matchesSeverity && matchesStatus && matchesCategory
  })

  const handleSelectAlert = (alertId: number) => {
    setSelectedAlerts((prev) => (prev.includes(alertId) ? prev.filter((id) => id !== alertId) : [...prev, alertId]))
  }

  const handleSelectAll = () => {
    setSelectedAlerts(selectedAlerts.length === filteredAlerts.length ? [] : filteredAlerts.map((alert) => alert.id))
  }

  const handleMarkAsRead = (alertIds: number[]) => {
    setAlerts((prev) =>
      prev.map((alert) => (alertIds.includes(alert.id) ? { ...alert, status: "acknowledged" } : alert)),
    )
    setSelectedAlerts([])
  }

  const handleResolve = (alertIds: number[]) => {
    setAlerts((prev) => prev.map((alert) => (alertIds.includes(alert.id) ? { ...alert, status: "resolved" } : alert)))
    setSelectedAlerts([])
  }

  const stats = {
    total: alerts.length,
    unread: alerts.filter((a) => a.status === "unread").length,
    critical: alerts.filter((a) => a.severity === "Critical").length,
    investigating: alerts.filter((a) => a.status === "investigating").length,
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Alert Center</h1>
            <p className="text-gray-600 mt-1">Monitor and manage security alerts across the MSME network</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Alert Settings
            </Button>
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Notification Rules
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Alerts</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Bell className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unread</p>
                  <p className="text-3xl font-bold text-red-600">{stats.unread}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.critical}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Investigating</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.investigating}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="unread">Unread ({stats.unread})</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="investigating">Investigating</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

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
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="Threat Detection">Threat Detection</SelectItem>
                      <SelectItem value="Phishing">Phishing</SelectItem>
                      <SelectItem value="Malware">Malware</SelectItem>
                      <SelectItem value="Network Anomaly">Network Anomaly</SelectItem>
                      <SelectItem value="System">System</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced
                  </Button>
                </div>

                {selectedAlerts.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                    <span className="text-sm text-blue-800">
                      {selectedAlerts.length} alert{selectedAlerts.length > 1 ? "s" : ""} selected
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleMarkAsRead(selectedAlerts)}>
                        Mark as Read
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleResolve(selectedAlerts)}>
                        Resolve
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Alerts List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Security Alerts ({filteredAlerts.length})</CardTitle>
                    <CardDescription>Latest security alerts and notifications</CardDescription>
                  </div>
                  <Checkbox
                    checked={selectedAlerts.length === filteredAlerts.length && filteredAlerts.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`border rounded-lg p-4 transition-colors ${
                        alert.status === "unread" ? "bg-blue-50/50 border-blue-200" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={selectedAlerts.includes(alert.id)}
                          onCheckedChange={() => handleSelectAlert(alert.id)}
                          className="mt-1"
                        />

                        <div className={`w-3 h-3 rounded-full ${getSeverityColor(alert.severity)} mt-2`} />

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{alert.title}</h3>
                            <Badge className={getCategoryColor(alert.category)}>{alert.category}</Badge>
                            <Badge variant={alert.severity === "Critical" ? "destructive" : "secondary"}>
                              {alert.severity}
                            </Badge>
                            <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                          </div>

                          <p className="text-gray-600 mb-3">{alert.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500 mb-3">
                            <div>
                              <span className="font-medium">Source:</span> {alert.source}
                            </div>
                            <div>
                              <span className="font-medium">Time:</span> {new Date(alert.timestamp).toLocaleString()}
                            </div>
                            <div>
                              <span className="font-medium">Affected MSMEs:</span> {alert.affectedMsmes}
                            </div>
                            <div>
                              <span className="font-medium">Confidence:</span> {alert.details.confidence}%
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              {alert.actions.slice(0, 2).map((action) => (
                                <Button key={action} size="sm" variant="outline">
                                  {action}
                                </Button>
                              ))}
                              {alert.actions.length > 2 && (
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button size="sm" variant="outline">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent>
                                    {alert.actions.slice(2).map((action) => (
                                      <DropdownMenuItem key={action}>{action}</DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              )}
                            </div>

                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tab contents would filter the alerts accordingly */}
          <TabsContent value="unread">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {stats.unread > 0 ? `You have ${stats.unread} unread alerts` : "No unread alerts at this time"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="critical">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-re-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {stats.critical > 0
                      ? `${stats.critical} critical alerts require immediate attention`
                      : "No critical alerts at this time"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investigating">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {stats.investigating > 0
                      ? `${stats.investigating} alerts are currently under investigation`
                      : "No alerts under investigation"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
