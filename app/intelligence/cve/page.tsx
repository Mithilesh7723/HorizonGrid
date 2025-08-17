"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Search, Filter, Download, ExternalLink, AlertTriangle, Shield, TrendingUp, Database, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

const mockCVEs = [
  {
    id: "CVE-2024-1337",
    description: "Remote code execution vulnerability in web application frameworks",
    severity: "Critical",
    score: 9.8,
    published: "2024-01-15",
    modified: "2024-01-16",
    vendor: "Multiple Vendors",
    product: "Web Frameworks",
    affectedMsmes: 1247,
    exploitAvailable: true,
    patchAvailable: true,
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-1337"],
    tags: ["RCE", "Web Application", "Authentication Bypass"],
    cwe: "CWE-78",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
  },
  {
    id: "CVE-2024-2468",
    description: "SQL injection vulnerability in database management systems",
    severity: "High",
    score: 8.1,
    published: "2024-01-14",
    modified: "2024-01-15",
    vendor: "Database Corp",
    product: "DB Management System",
    affectedMsmes: 892,
    exploitAvailable: false,
    patchAvailable: true,
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-2468"],
    tags: ["SQL Injection", "Database", "Data Breach"],
    cwe: "CWE-89",
    vector: "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N",
  },
  {
    id: "CVE-2024-3579",
    description: "Buffer overflow in network service daemon",
    severity: "High",
    score: 7.5,
    published: "2024-01-13",
    modified: "2024-01-14",
    vendor: "Network Solutions",
    product: "Service Daemon",
    affectedMsmes: 456,
    exploitAvailable: true,
    patchAvailable: false,
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-3579"],
    tags: ["Buffer Overflow", "Network Service", "DoS"],
    cwe: "CWE-120",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H",
  },
  {
    id: "CVE-2024-4680",
    description: "Cross-site scripting vulnerability in web applications",
    severity: "Medium",
    score: 6.1,
    published: "2024-01-12",
    modified: "2024-01-13",
    vendor: "Web Solutions Inc",
    product: "Web Application Suite",
    affectedMsmes: 234,
    exploitAvailable: false,
    patchAvailable: true,
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-4680"],
    tags: ["XSS", "Web Application", "Client-side"],
    cwe: "CWE-79",
    vector: "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N",
  },
]

export default function CVEDatabasePage() {
  const [cves, setCVEs] = useState(mockCVEs)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

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

  const filteredCVEs = cves.filter((cve) => {
    const matchesSearch =
      cve.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cve.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cve.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cve.product.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSeverity = filterSeverity === "all" || cve.severity === filterSeverity
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "patched" && cve.patchAvailable) ||
      (filterStatus === "unpatched" && !cve.patchAvailable) ||
      (filterStatus === "exploited" && cve.exploitAvailable)

    return matchesSearch && matchesSeverity && matchesStatus
  })

  const stats = {
    total: cves.length,
    critical: cves.filter((c) => c.severity === "Critical").length,
    high: cves.filter((c) => c.severity === "High").length,
    exploitable: cves.filter((c) => c.exploitAvailable).length,
    patched: cves.filter((c) => c.patchAvailable).length,
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CVE Database</h1>
            <p className="text-gray-600 mt-1">Common Vulnerabilities and Exposures affecting MSMEs</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CVEs
            </Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              NVD Portal
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total CVEs</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Database className="h-8 w-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical</p>
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
                  <p className="text-sm font-medium text-gray-600">High Severity</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.high}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Exploitable</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.exploitable}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Patched</p>
                  <p className="text-3xl font-bold text-green-600">{stats.patched}</p>
                </div>
                <Shield className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search CVE ID, description, vendor, product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

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

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="patched">Patched</SelectItem>
                  <SelectItem value="unpatched">Unpatched</SelectItem>
                  <SelectItem value="exploited">Exploitable</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CVE Table */}
        <Card>
          <CardHeader>
            <CardTitle>CVE Database ({filteredCVEs.length} entries)</CardTitle>
            <CardDescription>Comprehensive vulnerability database with MSME impact analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>CVE ID</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>CVSS Score</TableHead>
                    <TableHead>Affected MSMEs</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCVEs.map((cve) => (
                    <TableRow key={cve.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getSeverityColor(cve.severity)}`} />
                          <span className="font-mono font-medium">{cve.id}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-md">
                          <div className="text-sm font-medium text-gray-900 mb-1">{cve.description}</div>
                          <div className="text-xs text-gray-500">
                            {cve.vendor} - {cve.product}
                          </div>
                          <div className="flex gap-1 mt-1">
                            {cve.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getSeverityBadgeVariant(cve.severity)}>{cve.severity}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{cve.score}</span>
                          <Progress value={cve.score * 10} className="w-16 h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-red-600">{cve.affectedMsmes}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {cve.patchAvailable && (
                            <Badge className="bg-green-100 text-green-800 text-xs">Patch Available</Badge>
                          )}
                          {cve.exploitAvailable && (
                            <Badge className="bg-red-100 text-red-800 text-xs">Exploit Available</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          <div>{new Date(cve.published).toLocaleDateString()}</div>
                          <div className="text-xs">Modified: {new Date(cve.modified).toLocaleDateString()}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
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
