"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Phone,
  HelpCircle,
  Settings,
  Play,
  FileText,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

const emergencyPlans = [
  {
    id: 1,
    name: "Virus Attack Response",
    description: "What to do when a virus infects your computers",
    icon: Shield,
    enabled: true,
    color: "bg-red-500",
    steps: [
      "Disconnect infected computers from internet",
      "Run virus scan on all computers",
      "Contact IT support team",
      "Restore files from backup if needed",
      "Update all security software",
    ],
    estimatedTime: "2-4 hours",
    lastUsed: "Never",
    priority: "Critical",
  },
  {
    id: 2,
    name: "Data Theft Response",
    description: "Steps to take if someone steals your business data",
    icon: AlertTriangle,
    enabled: true,
    color: "bg-orange-500",
    steps: [
      "Change all passwords immediately",
      "Contact customers about potential breach",
      "File police report if needed",
      "Review what data was stolen",
      "Improve security to prevent future theft",
    ],
    estimatedTime: "1-2 days",
    lastUsed: "Never",
    priority: "Critical",
  },
  {
    id: 3,
    name: "Website Down Response",
    description: "Quick actions when your website stops working",
    icon: Clock,
    enabled: true,
    color: "bg-blue-500",
    steps: [
      "Check if internet connection is working",
      "Contact website hosting company",
      "Inform customers via social media",
      "Switch to backup website if available",
      "Monitor until website is restored",
    ],
    estimatedTime: "30 minutes - 2 hours",
    lastUsed: "2 weeks ago",
    priority: "High",
  },
  {
    id: 4,
    name: "Employee Account Hacked",
    description: "What to do if an employee's account is compromised",
    icon: Users,
    enabled: true,
    color: "bg-purple-500",
    steps: [
      "Immediately disable the compromised account",
      "Reset password for the account",
      "Check what the hacker accessed",
      "Inform other employees to be careful",
      "Review and update security training",
    ],
    estimatedTime: "1-3 hours",
    lastUsed: "1 month ago",
    priority: "High",
  },
]

const emergencyContacts = [
  {
    name: "IT Support Team",
    role: "Technical Help",
    phone: "1800-123-4567",
    email: "support@horizongrid.com",
    available: "24/7",
    speciality: "Virus removal, system recovery",
  },
  {
    name: "Security Expert",
    role: "Cyber Security",
    phone: "1800-123-4568",
    email: "security@horizongrid.com",
    available: "24/7",
    speciality: "Data breaches, hacker attacks",
  },
  {
    name: "Legal Advisor",
    role: "Legal Compliance",
    phone: "1800-123-4569",
    email: "legal@horizongrid.com",
    available: "Business Hours",
    speciality: "Data protection laws, reporting",
  },
]

const currentIncidents = [
  {
    id: 1,
    title: "Suspicious Email Detected",
    plan: "Email Security Response",
    status: "investigating",
    startTime: "10 minutes ago",
    progress: 60,
    assignedTo: "Security Team",
    severity: "Medium",
  },
]

export default function SimpleResponsePage() {
  const [plans, setPlans] = useState(emergencyPlans)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const activePlans = plans.filter((p) => p.enabled).length

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Simple Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Response Plans</h1>
          <p className="text-gray-600 text-lg">Step-by-step guides for handling cyber security emergencies</p>
        </div>

        {/* Status Overview */}
        <Card className="border-2 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-800">Emergency Plans Ready</h2>
                  <p className="text-green-700">Your business is prepared for cyber security incidents</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-800">{activePlans}</div>
                <div className="text-green-700">Active Response Plans</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Incidents */}
        {currentIncidents.length > 0 && (
          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <AlertTriangle className="h-5 w-5" />
                Active Security Incident
              </CardTitle>
            </CardHeader>
            <CardContent>
              {currentIncidents.map((incident) => (
                <div key={incident.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-orange-900">{incident.title}</h3>
                    <Badge className="bg-orange-100 text-orange-800">{incident.status}</Badge>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-orange-700">Started:</span>
                      <div className="text-orange-900">{incident.startTime}</div>
                    </div>
                    <div>
                      <span className="font-medium text-orange-700">Assigned to:</span>
                      <div className="text-orange-900">{incident.assignedTo}</div>
                    </div>
                    <div>
                      <span className="font-medium text-orange-700">Severity:</span>
                      <div className="text-orange-900">{incident.severity}</div>
                    </div>
                    <div>
                      <span className="font-medium text-orange-700">Progress:</span>
                      <div className="text-orange-900">{incident.progress}%</div>
                    </div>
                  </div>
                  <Progress value={incident.progress} className="h-2" />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-white">
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white">
                      Contact Team
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Help Alert */}
        <Alert>
          <HelpCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>What are Response Plans?</strong> These are simple, step-by-step instructions that tell you exactly
            what to do during a cyber security emergency. Think of them as emergency procedures for your digital
            business.
          </AlertDescription>
        </Alert>

        {/* Emergency Plans */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Emergency Response Plans</h2>
            <Button variant="outline" onClick={() => setShowAdvanced(!showAdvanced)} className="bg-transparent">
              {showAdvanced ? "Simple View" : "Detailed View"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="border-2 border-gray-200 hover:border-blue-200 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${plan.color} rounded-full flex items-center justify-center`}>
                      <plan.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                        <Badge
                          className={
                            plan.priority === "Critical" ? "bg-red-100 text-red-800" : "bg-orange-100 text-orange-800"
                          }
                        >
                          {plan.priority}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{plan.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="font-medium text-gray-600">Time Needed:</span>
                          <div className="text-gray-900">{plan.estimatedTime}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Last Used:</span>
                          <div className="text-gray-900">{plan.lastUsed}</div>
                        </div>
                      </div>

                      {showAdvanced && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-700 mb-2">Emergency Steps:</h4>
                          <div className="space-y-2">
                            {plan.steps.slice(0, 3).map((step, index) => (
                              <div key={index} className="flex items-start gap-2 text-sm">
                                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                                  {index + 1}
                                </div>
                                <span className="text-gray-700">{step}</span>
                              </div>
                            ))}
                            {plan.steps.length > 3 && (
                              <div className="text-sm text-gray-500 ml-8">+{plan.steps.length - 3} more steps...</div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          View Full Plan
                        </Button>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          Practice Run
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-500" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>People to call during a cyber security emergency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emergencyContacts.map((contact) => (
                <Card key={contact.name} className="border-2">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-gray-900 mb-1">{contact.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{contact.role}</p>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-center gap-2">
                          <Phone className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-blue-600">{contact.phone}</span>
                        </div>
                        <div className="text-gray-600">{contact.email}</div>
                        <Badge variant="outline" className="text-xs">
                          {contact.available}
                        </Badge>
                      </div>

                      <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-600">{contact.speciality}</div>

                      <Button size="sm" className="mt-3 w-full">
                        <Phone className="h-4 w-4 mr-1" />
                        Call Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button size="lg" className="px-8 bg-red-600 hover:bg-red-700">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Report Emergency
          </Button>
          <Button variant="outline" size="lg" className="px-8 bg-transparent">
            <Settings className="h-5 w-5 mr-2" />
            Customize Plans
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
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Emergency Preparedness</h3>
                <p className="text-blue-800 mb-3">
                  Just like having a fire escape plan, these cyber security response plans help you act quickly and
                  correctly during a digital emergency. The faster you respond, the less damage occurs.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="bg-white">
                    Download Emergency Guide
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    Schedule Training
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    Test Your Plans
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
