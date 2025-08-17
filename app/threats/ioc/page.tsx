"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  Search,
  Download,
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

const mockIOCs = [
  {
    id: 1,
    value: "203.0.113.42",
    type: "IP",
    severity: "Critical",
    confidence: 95,
    status: "active",
    source: "Mumbai MSME Network",
    firstSeen: "2024-01-15T08:30:00Z",
    lastSeen: "2024-01-15T14:45:00Z",
    tags: ["APT", "C&C", "Malware"],
    tlp: "RED",
    hits: 247,
  },
  {
    id: 2,
    value: "phishing-bank.malicious.com",
    type: "Domain",
    severity: "High",
    confidence: 88,
    status: "mitigated",
    source: "Delhi Financial District",
    firstSeen: "2024-01-14T16:20:00Z",
    lastSeen: "2024-01-15T09:15:00Z",
    tags: ["Phishing", "Banking"],
    tlp: "AMBER",
    hits: 89,
  },
  {
    id: 3,
    value: "a1b2c3d4e5f6789abcdef123456789",
    type: "Hash",
    severity: "Medium",
    confidence: 92,
    status: "verified",
    source: "Bangalore Tech Cluster",
    firstSeen: "2024-01-14T12:10:00Z",
    lastSeen: "2024-01-15T08:30:00Z",
    tags: ["Ransomware", "Encryption"],
    tlp: "GREEN",
    hits: 34,
  },
  {
    id: 4,
    value: "https://fake-update.malware.net/download",
    type: "URL",
    severity: "High",
    confidence: 90,
    status: "blocked",
    source: "Chennai Industrial Zone",
    firstSeen: "2024-01-13T14:45:00Z",
    lastSeen: "2024-01-14T22:30:00Z",
    tags: ["Trojan", "Fake Update"],
    tlp: "AMBER",
    hits: 67,
  },
  {
    id: 5,
    value: "malware@attacker.com",
    type: "Email",
    severity: "Medium",
    confidence: 85,
    status: "investigating",
    source: "Pune Manufacturing Hub",
    firstSeen: "2024-01-13T09:20:00Z",
    lastSeen: "2024-01-14T18:45:00Z",
    tags: ["Spear Phishing", "Social Engineering"],
    tlp: "WHITE",
    hits: 23,
  },
]

export default function IOCDatabasePage() {
  const [iocs, setIOCs] = useState(mockIOCs)
  const [selectedIOCs, setSelectedIOCs] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")

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
      case "verified":
        return "text-purple-600 bg-purple-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getTLPColor = (tlp: string) => {
    switch (tlp) {
      case "RED":
        return "bg-red-600 text-white"
      case "AMBER":
        return "bg-amber-600 text-white"
      case "GREEN":
        return "bg-green-600 text-white"
      case "WHITE":
        return "bg-gray-600 text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const filteredIOCs = iocs.filter((ioc) => {
    const matchesSearch =
      ioc.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ioc.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ioc.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === "all" || ioc.type === filterType
    const matchesStatus = filterStatus === "all" || ioc.status === filterStatus
    const matchesSeverity = filterSeverity === "all" || ioc.severity === filterSeverity

    return matchesSearch && matchesType && matchesStatus && matchesSeverity
  })

  const handleSelectIOC = (iocId: number) => {
    setSelectedIOCs((prev) => (prev.includes(iocId) ? prev.filter((id) => id !== iocId) : [...prev, iocId]))
  }

  const handleSelectAll = () => {
    setSelectedIOCs(selectedIOCs.length === filteredIOCs.length ? [] : filteredIOCs.map((ioc) => ioc.id))
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">IOC Database</h1>
            <p className="text-gray-600 mt-1">Comprehensive database of Indicators of Compromise</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add IOC
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total IOCs</p>
                  <p className="text-2xl font-bold text-gray-900">{iocs.length.toLocaleString()}</p>
                </div>
                <Database className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Threats</p>
                  <p className="text-2xl font-bold text-red-600">
                    {iocs.filter((ioc) => ioc.status === "active").length}
                  </p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Mitigated</p>
                  <p className="text-2xl font-bold text-green-600">
                    {iocs.filter((ioc) => ioc.status === "mitigated").length}
                  </p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Under Investigation</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {iocs.filter((ioc) => ioc.status === "investigating").length}
                  </p>
                </div>
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Blocked</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {iocs.filter((ioc) => ioc.status === "blocked").length}
                  </p>
                </div>
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search IOCs, sources, tags..."
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
                  <SelectItem value="Email">Email</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="mitigated">Mitigated</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                <SelectTrigger className="w-40">
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

              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>

            {selectedIOCs.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                <span className="text-sm text-blue-800">
                  {selectedIOCs.length} IOC{selectedIOCs.length > 1 ? "s" : ""} selected
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Bulk Block
                  </Button>
                  <Button size="sm" variant="outline">
                    Export Selected
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                    Delete Selected
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* IOC Table */}
        <Card>
          <CardHeader>
            <CardTitle>IOC Database ({filteredIOCs.length} entries)</CardTitle>
            <CardDescription>Comprehensive list of threat indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedIOCs.length === filteredIOCs.length && filteredIOCs.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>IOC Value</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>TLP</TableHead>
                    <TableHead>Hits</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Last Seen</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIOCs.map((ioc) => (
                    <TableRow key={ioc.id} className="hover:bg-gray-50">
                      <TableCell>
                        <Checkbox
                          checked={selectedIOCs.includes(ioc.id)}
                          onCheckedChange={() => handleSelectIOC(ioc.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getSeverityColor(ioc.severity)}`} />
                          <span className="font-mono text-sm max-w-xs truncate">{ioc.value}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{ioc.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={ioc.severity === "Critical" ? "destructive" : "secondary"}>
                          {ioc.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(ioc.status)}>{ioc.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{ioc.confidence}%</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTLPColor(ioc.tlp)}>{ioc.tlp}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">{ioc.hits}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 max-w-xs truncate">{ioc.source}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">{new Date(ioc.lastSeen).toLocaleDateString()}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
