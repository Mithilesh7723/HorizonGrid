"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Eye, Shield, AlertTriangle, CheckCircle, Zap, HelpCircle, Settings, Play, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"

const simpleDetectionSettings = [
  {
    id: 1,
    name: "Virus Detection",
    description: "Automatically spots and stops viruses trying to infect your computers",
    icon: Shield,
    enabled: true,
    level: "Critical",
    detected: 89,
    color: "bg-red-500",
    userFriendly: "Catches viruses, trojans, and malware before they can harm your business",
  },
  {
    id: 2,
    name: "Hacker Detection",
    description: "Watches for hackers trying to break into your network",
    icon: Eye,
    enabled: true,
    level: "High",
    detected: 23,
    color: "bg-orange-500",
    userFriendly: "Identifies suspicious login attempts and unauthorized access tries",
  },
  {
    id: 3,
    name: "Email Threat Scanner",
    description: "Checks all incoming emails for dangerous content",
    icon: Bell,
    enabled: true,
    level: "High",
    detected: 156,
    color: "bg-blue-500",
    userFriendly: "Scans email attachments and links for phishing and malware",
  },
  {
    id: 4,
    name: "Unusual Activity Monitor",
    description: "Notices when something strange happens on your network",
    icon: Zap,
    enabled: false,
    level: "Medium",
    detected: 12,
    color: "bg-purple-500",
    userFriendly: "Alerts you when employees access unusual files or systems",
  },
]

const recentThreats = [
  {
    id: 1,
    type: "Virus Blocked",
    description: "Stopped a ransomware virus from encrypting files",
    time: "5 minutes ago",
    severity: "critical",
    location: "Accounting Department",
    action: "Automatically blocked and quarantined",
  },
  {
    id: 2,
    type: "Hacker Attempt",
    description: "Someone tried to guess passwords to access your system",
    time: "1 hour ago",
    severity: "high",
    location: "Main Server",
    action: "IP address blocked for 24 hours",
  },
  {
    id: 3,
    type: "Phishing Email",
    description: "Fake bank email trying to steal login credentials",
    time: "2 hours ago",
    severity: "medium",
    location: "Sales Team",
    action: "Email quarantined and sender blocked",
  },
]

export default function SimpleIDSPage() {
  const [settings, setSettings] = useState(simpleDetectionSettings)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const toggleSetting = (settingId: number) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting)),
    )
  }

  const enabledSettings = settings.filter((s) => s.enabled).length
  const totalDetected = settings.reduce((sum, s) => sum + s.detected, 0)
  const protectionLevel = Math.round((enabledSettings / settings.length) * 100)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Simple Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Threat Detection System</h1>
          <p className="text-gray-600 text-lg">
            Your digital security camera that watches for suspicious activity 24/7
          </p>
        </div>

        {/* Detection Status */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-800">Detection System Active</h2>
                  <p className="text-green-700">Monitoring your network for threats and suspicious activity</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-800">{totalDetected.toLocaleString()}</div>
                <div className="text-green-700">Threats Detected Today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-gray-600">Viruses Stopped</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">23</div>
              <div className="text-gray-600">Hacker Attempts</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-gray-600">Bad Emails Blocked</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">99.8%</div>
              <div className="text-gray-600">Detection Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Help Alert */}
        <Alert>
          <HelpCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>How Detection Works:</strong> This system continuously monitors your network traffic, emails, and
            file downloads. When it spots something suspicious, it immediately alerts you and can automatically block
            the threat.
          </AlertDescription>
        </Alert>

        {/* Detection Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Detection Features</h2>
            <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)} className="bg-transparent">
              {showAdvanced ? "Simple View" : "Advanced View"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {settings.map((setting) => (
              <Card key={setting.id} className={`border-2 ${setting.enabled ? "border-green-200" : "border-gray-200"}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${setting.color} rounded-full flex items-center justify-center`}>
                        <setting.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{setting.name}</h3>
                          {setting.enabled ? (
                            <Badge className="bg-green-100 text-green-800">Watching</Badge>
                          ) : (
                            <Badge variant="secondary">Off</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{setting.userFriendly}</p>

                        <div className="flex items-center gap-4 text-sm">
                          <Badge
                            variant="outline"
                            className={
                              setting.level === "Critical"
                                ? "border-red-500 text-red-700"
                                : setting.level === "High"
                                  ? "border-orange-500 text-orange-700"
                                  : "border-yellow-500 text-yellow-700"
                            }
                          >
                            {setting.level} Priority
                          </Badge>
                          {setting.detected > 0 && (
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <span className="text-red-700">{setting.detected} detected today</span>
                            </div>
                          )}
                        </div>

                        {showAdvanced && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">{setting.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={() => toggleSetting(setting.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span className="text-xs text-gray-500">{setting.enabled ? "ON" : "OFF"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Threats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Recent Threats Detected
            </CardTitle>
            <CardDescription>Latest security threats that were automatically handled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentThreats.map((threat) => (
                <div key={threat.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-3 h-3 rounded-full mt-2 ${
                        threat.severity === "critical"
                          ? "bg-red-500"
                          : threat.severity === "high"
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                      }`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">{threat.type}</h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={
                              threat.severity === "critical"
                                ? "bg-red-100 text-red-800"
                                : threat.severity === "high"
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {threat.severity}
                          </Badge>
                          <span className="text-sm text-gray-500">{threat.time}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{threat.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Location:</span>
                          <span className="ml-2 text-gray-900">{threat.location}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Action Taken:</span>
                          <span className="ml-2 text-green-700">{threat.action}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button size="lg" className="px-8">
            <Play className="h-5 w-5 mr-2" />
            Run Security Scan
          </Button>
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            <Settings className="h-5 w-5 mr-2" />
            Adjust Sensitivity
          </Button>
        </div>

        {/* Help Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <HelpCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Threat Detection</h3>
                <p className="text-blue-800 mb-3">
                  Think of this system as a security camera for your digital business. It watches everything that
                  happens on your network and immediately alerts you if something looks suspicious or dangerous.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="bg-white">
                    Learn More
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    Contact Expert
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    View Reports
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
