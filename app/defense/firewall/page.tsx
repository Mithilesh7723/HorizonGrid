"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Shield, Lock, CheckCircle, AlertTriangle, Globe, Users, HelpCircle, Settings, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"

const simpleFirewallSettings = [
  {
    id: 1,
    name: "Block Dangerous Websites",
    description: "Stop employees from visiting harmful websites",
    icon: Globe,
    enabled: true,
    level: "High Security",
    blocked: 1247,
    color: "bg-red-500",
    userFriendly: "Prevents access to websites with viruses, phishing, or inappropriate content",
  },
  {
    id: 2,
    name: "Allow Work Applications",
    description: "Let employees use necessary business software",
    icon: CheckCircle,
    enabled: true,
    level: "Essential",
    blocked: 0,
    color: "bg-green-500",
    userFriendly: "Ensures your team can access email, cloud storage, and work tools",
  },
  {
    id: 3,
    name: "Block Social Media",
    description: "Restrict access to social media during work hours",
    icon: Users,
    enabled: false,
    level: "Optional",
    blocked: 89,
    color: "bg-blue-500",
    userFriendly: "Helps maintain productivity by limiting social media access",
  },
  {
    id: 4,
    name: "Secure Remote Access",
    description: "Safe connection for employees working from home",
    icon: Lock,
    enabled: true,
    level: "Critical",
    blocked: 23,
    color: "bg-purple-500",
    userFriendly: "Creates a secure tunnel for remote workers to access company resources",
  },
]

const networkStatus = [
  {
    name: "Main Office",
    location: "Mumbai",
    status: "Protected",
    devices: 25,
    threats: 12,
    color: "green",
  },
  {
    name: "Branch Office",
    location: "Delhi",
    status: "Protected",
    devices: 15,
    threats: 8,
    color: "green",
  },
  {
    name: "Remote Workers",
    location: "Various",
    status: "Secure",
    devices: 45,
    threats: 3,
    color: "blue",
  },
]

export default function SimpleFirewallPage() {
  const [settings, setSettings] = useState(simpleFirewallSettings)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const toggleSetting = (settingId: number) => {
    setSettings((prev) =>
      prev.map((setting) => (setting.id === settingId ? { ...setting, enabled: !setting.enabled } : setting)),
    )
  }

  const enabledSettings = settings.filter((s) => s.enabled).length
  const totalBlocked = settings.reduce((sum, s) => sum + s.blocked, 0)
  const protectionLevel = Math.round((enabledSettings / settings.length) * 100)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Simple Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Network Firewall</h1>
          <p className="text-gray-600 text-lg">
            Your digital security guard that controls what goes in and out of your network
          </p>
        </div>

        {/* Firewall Status */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-800">Firewall is Active</h2>
                  <p className="text-green-700">Your network is protected from external threats</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-800">{totalBlocked.toLocaleString()}</div>
                <div className="text-green-700">Threats Blocked Today</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Network Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {networkStatus.map((network) => (
            <Card key={network.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">{network.name}</h3>
                    <p className="text-sm text-gray-600">{network.location}</p>
                  </div>
                  <Badge
                    className={network.color === "green" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}
                  >
                    {network.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Devices:</span>
                    <span className="font-medium">{network.devices}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Threats Blocked:</span>
                    <span className="font-medium text-red-600">{network.threats}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Help Alert */}
        <Alert>
          <HelpCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>What is a Firewall?</strong> Think of it as a security guard for your internet connection. It
            decides what websites and applications your employees can access, keeping the dangerous ones out.
          </AlertDescription>
        </Alert>

        {/* Firewall Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
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
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
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
                                : setting.level === "High Security"
                                  ? "border-orange-500 text-orange-700"
                                  : setting.level === "Essential"
                                    ? "border-green-500 text-green-700"
                                    : "border-blue-500 text-blue-700"
                            }
                          >
                            {setting.level}
                          </Badge>
                          {setting.blocked > 0 && (
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <span className="text-red-700">{setting.blocked.toLocaleString()} blocked today</span>
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

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Recent Security Activity
            </CardTitle>
            <CardDescription>What your firewall has been protecting you from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  time: "2 minutes ago",
                  action: "Blocked dangerous website",
                  details: "Prevented access to a phishing site trying to steal passwords",
                  severity: "high",
                },
                {
                  time: "15 minutes ago",
                  action: "Allowed work application",
                  details: "Employee accessed Microsoft Office 365 safely",
                  severity: "low",
                },
                {
                  time: "1 hour ago",
                  action: "Blocked malware download",
                  details: "Stopped a virus from being downloaded from email attachment",
                  severity: "critical",
                },
                {
                  time: "2 hours ago",
                  action: "Secure remote connection",
                  details: "Employee connected safely from home office",
                  severity: "low",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${
                      activity.severity === "critical"
                        ? "bg-red-500"
                        : activity.severity === "high"
                          ? "bg-orange-500"
                          : "bg-green-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">{activity.action}</span>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{activity.details}</p>
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
            Optimize Protection
          </Button>
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            <Settings className="h-5 w-5 mr-2" />
            Custom Settings
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
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Your Firewall</h3>
                <p className="text-blue-800 mb-3">
                  Your firewall works 24/7 to protect your business. It's like having a security guard who never sleeps,
                  checking every website visit and file download to keep you safe.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="bg-white">
                    Watch Tutorial
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    Get Expert Help
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    Download Guide
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
