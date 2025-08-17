"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Shield, Play, CheckCircle, AlertTriangle, Info, Settings, HelpCircle, Zap, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

const simpleRules = [
  {
    id: 1,
    name: "Block Bad Websites",
    description: "Automatically blocks websites that try to steal your information or install viruses",
    icon: Globe,
    enabled: true,
    protection: "High",
    threatsBlocked: 1247,
    color: "bg-blue-500",
    simple: true,
    userFriendly: "Protects you from dangerous websites and phishing attempts",
  },
  {
    id: 2,
    name: "Stop Virus Files",
    description: "Prevents harmful files from running on your computers",
    icon: Shield,
    enabled: true,
    protection: "Critical",
    threatsBlocked: 89,
    color: "bg-red-500",
    simple: true,
    userFriendly: "Blocks viruses, ransomware, and other malicious software",
  },
  {
    id: 3,
    name: "Email Protection",
    description: "Checks all emails for suspicious links and attachments",
    icon: AlertTriangle,
    enabled: true,
    protection: "High",
    threatsBlocked: 456,
    color: "bg-orange-500",
    simple: true,
    userFriendly: "Keeps dangerous emails away from your inbox",
  },
  {
    id: 4,
    name: "Network Guardian",
    description: "Monitors your internet connection for suspicious activity",
    icon: Zap,
    enabled: false,
    protection: "Medium",
    threatsBlocked: 23,
    color: "bg-yellow-500",
    simple: true,
    userFriendly: "Watches for hackers trying to break into your network",
  },
  {
    id: 5,
    name: "Safe Browsing",
    description: "Warns you before visiting potentially dangerous websites",
    icon: Info,
    enabled: true,
    protection: "Medium",
    threatsBlocked: 234,
    color: "bg-green-500",
    simple: true,
    userFriendly: "Shows warnings when websites might be unsafe",
  },
]

export default function SimpleAutoRulesPage() {
  const [rules, setRules] = useState(simpleRules)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const toggleRule = (ruleId: number) => {
    setRules((prev) => prev.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const enabledRules = rules.filter((r) => r.enabled).length
  const totalThreatsBlocked = rules.reduce((sum, r) => sum + r.threatsBlocked, 0)
  const protectionLevel = Math.round((enabledRules / rules.length) * 100)

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Simple Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Security Protection</h1>
          <p className="text-gray-600 text-lg">Simple controls to keep your business safe from cyber threats</p>
        </div>

        {/* Protection Status */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-800">Your Business is Protected</h2>
                  <p className="text-green-700">
                    {enabledRules} out of {rules.length} security features are active
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-800">{protectionLevel}%</div>
                <div className="text-green-700">Protection Level</div>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={protectionLevel} className="h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalThreatsBlocked.toLocaleString()}</div>
              <div className="text-gray-600">Threats Blocked Today</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{enabledRules}</div>
              <div className="text-gray-600">Active Protections</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2,847</div>
              <div className="text-gray-600">Businesses Protected</div>
            </CardContent>
          </Card>
        </div>

        {/* Help Alert */}
        <Alert>
          <HelpCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>How it works:</strong> These security features automatically protect your business 24/7. You can
            turn them on or off with a simple switch. Green means active protection, gray means turned off.
          </AlertDescription>
        </Alert>

        {/* Security Features */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Security Features</h2>
            <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)} className="bg-transparent">
              {showAdvanced ? "Simple View" : "Advanced View"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {rules.map((rule) => (
              <Card key={rule.id} className={`border-2 ${rule.enabled ? "border-green-200" : "border-gray-200"}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${rule.color} rounded-full flex items-center justify-center`}>
                        <rule.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                          {rule.enabled ? (
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          ) : (
                            <Badge variant="secondary">Off</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{rule.userFriendly}</p>

                        {rule.enabled && (
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-green-700">
                                {rule.threatsBlocked.toLocaleString()} threats blocked
                              </span>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                rule.protection === "Critical"
                                  ? "border-red-500 text-red-700"
                                  : rule.protection === "High"
                                    ? "border-orange-500 text-orange-700"
                                    : "border-yellow-500 text-yellow-700"
                              }
                            >
                              {rule.protection} Protection
                            </Badge>
                          </div>
                        )}

                        {showAdvanced && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">{rule.description}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => toggleRule(rule.id)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span className="text-xs text-gray-500">{rule.enabled ? "ON" : "OFF"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button size="lg" className="px-8">
            <Play className="h-5 w-5 mr-2" />
            Enable All Protection
          </Button>
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            <Settings className="h-5 w-5 mr-2" />
            Customize Settings
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
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-blue-800 mb-3">
                  Our security experts are here to help you understand and configure your protection.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="bg-white">
                    Call Support: 1800-123-4567
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    Live Chat
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    Video Tutorial
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
