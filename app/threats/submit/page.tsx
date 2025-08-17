"use client"

import type React from "react"

import { useState } from "react"
import { Shield, AlertTriangle, Upload, CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function SubmitThreatPage() {
  const [formData, setFormData] = useState({
    type: "",
    value: "",
    severity: "",
    description: "",
    source: "",
    evidence: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate AI analysis and submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSubmitted(true)
    setIsSubmitting(false)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b">
          <div className="px-6 py-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">HorizonGrid</span>
            </Link>
          </div>
        </header>

        <div className="p-6 max-w-2xl mx-auto">
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Threat Submitted Successfully!</h1>
              <p className="text-gray-600 mb-6">
                Your threat intelligence has been processed and shared with the MSME network.
              </p>

              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-green-800 mb-2">AI Analysis Results:</h3>
                <div className="space-y-2 text-sm text-green-700">
                  <div className="flex justify-between">
                    <span>Threat Type:</span>
                    <Badge>{formData.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Score:</span>
                    <Badge variant="destructive">8.5/10</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>CVE Match:</span>
                    <Badge variant="outline">CVE-2024-{Math.floor(Math.random() * 9999)}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>MSMEs Notified:</span>
                    <Badge className="bg-blue-100 text-blue-800">1,247</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Link href="/dashboard">
                  <Button>Return to Dashboard</Button>
                </Link>
                <Button variant="outline" onClick={() => setSubmitted(false)}>
                  Submit Another
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">HorizonGrid</span>
            </Link>
            <div className="flex items-center gap-2 text-gray-600">
              <ArrowLeft className="h-4 w-4" />
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <span>/</span>
              <span>Submit Threat</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Cyber Threat</h1>
          <p className="text-gray-600">Help protect the MSME community by sharing threat intelligence</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Threat Details
            </CardTitle>
            <CardDescription>Provide as much detail as possible for accurate AI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Threat Type</Label>
                  <Select onValueChange={(value) => updateFormData("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select threat type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ip">Malicious IP</SelectItem>
                      <SelectItem value="domain">Suspicious Domain</SelectItem>
                      <SelectItem value="hash">File Hash</SelectItem>
                      <SelectItem value="email">Phishing Email</SelectItem>
                      <SelectItem value="url">Malicious URL</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="severity">Severity Level</Label>
                  <Select onValueChange={(value) => updateFormData("severity", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Indicator of Compromise (IOC)</Label>
                <Input
                  id="value"
                  placeholder="e.g., 192.168.1.100, malicious-site.com, file-hash..."
                  value={formData.value}
                  onChange={(e) => updateFormData("value", e.target.value)}
                  required
                />
                <p className="text-sm text-gray-500">Enter the specific IP, domain, hash, or other identifier</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Threat Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the threat, attack method, impact, and any relevant context..."
                  value={formData.description}
                  onChange={(e) => updateFormData("description", e.target.value)}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Detection Source</Label>
                <Input
                  id="source"
                  placeholder="e.g., Firewall logs, IDS alert, manual investigation..."
                  value={formData.source}
                  onChange={(e) => updateFormData("source", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidence">Additional Evidence</Label>
                <Textarea
                  id="evidence"
                  placeholder="Log entries, screenshots, or other supporting evidence..."
                  value={formData.evidence}
                  onChange={(e) => updateFormData("evidence", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• AI analysis will enrich your threat with CVE mappings</li>
                  <li>• Threat will be verified and scored for accuracy</li>
                  <li>• Relevant MSMEs will be notified in real-time</li>
                  <li>• Auto-defense rules will be generated and distributed</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing & Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Submit Threat
                    </>
                  )}
                </Button>
                <Link href="/dashboard">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
