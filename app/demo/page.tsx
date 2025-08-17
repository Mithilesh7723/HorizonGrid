"use client"

import { useState, useEffect } from "react"
import { Shield, Play, Pause, RotateCcw, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const demoSteps = [
  {
    id: 1,
    title: "Threat Detected",
    description: "MSME in Mumbai reports suspicious IP activity",
    icon: AlertTriangle,
    color: "text-red-600",
    data: { ip: "203.0.113.42", location: "Mumbai", msme: "TechCorp Solutions" },
  },
  {
    id: 2,
    title: "AI Analysis",
    description: "HorizonGrid AI analyzes and enriches the threat",
    icon: Shield,
    color: "text-blue-600",
    data: { cve: "CVE-2024-1337", riskScore: "8.5/10", category: "Malware C&C" },
  },
  {
    id: 3,
    title: "Network Alert",
    description: "Real-time alert sent to all connected MSMEs",
    icon: Clock,
    color: "text-orange-600",
    data: { notified: "2,847 MSMEs", regions: "Maharashtra, Karnataka, Tamil Nadu" },
  },
  {
    id: 4,
    title: "Auto-Defense",
    description: "Firewall rules automatically generated and deployed",
    icon: CheckCircle,
    color: "text-green-600",
    data: { rules: "iptables, pfSense, Suricata", deployed: "1,234 systems" },
  },
]

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStep((current) => {
              const next = (current + 1) % demoSteps.length
              return next
            })
            return 0
          }
          return prev + 2
        })
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentStep])

  const handlePlay = () => setIsPlaying(!isPlaying)
  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
  }

  const currentStepData = demoSteps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">HorizonGrid</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">See HorizonGrid in Action</h1>
          <p className="text-xl text-gray-600 mb-8">Watch how our AI-powered platform protects MSMEs in real-time</p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <Button onClick={handlePlay} size="lg">
              {isPlaying ? (
                <>
                  <Pause className="h-5 w-5 mr-2" />
                  Pause Demo
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Start Demo
                </>
              )}
            </Button>
            <Button onClick={handleReset} variant="outline" size="lg">
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Demo Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Current Step Display */}
          <div className="lg:col-span-2">
            <Card className="h-96">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <currentStepData.icon className={`h-6 w-6 ${currentStepData.color}`} />
                    Step {currentStep + 1}: {currentStepData.title}
                  </CardTitle>
                  <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
                </div>
                <CardDescription>{currentStepData.description}</CardDescription>
                <Progress value={progress} className="mt-2" />
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm h-64 overflow-y-auto">
                  <div className="space-y-2">
                    <div className="text-blue-400"># HorizonGrid Threat Intelligence Demo</div>
                    <div>{">"} Initializing threat detection system...</div>
                    <div className="text-yellow-400">{">"} System ready. Monitoring network traffic...</div>

                    {currentStep >= 0 && (
                      <>
                        <div className="text-red-400 mt-4">{">"} ALERT: Suspicious activity detected!</div>
                        <div>
                          {">"} Source IP: {currentStepData.data.ip || "N/A"}
                        </div>
                        <div>
                          {">"} Location: {currentStepData.data.location || "N/A"}
                        </div>
                        <div>
                          {">"} Reporting MSME: {currentStepData.data.msme || "N/A"}
                        </div>
                      </>
                    )}

                    {currentStep >= 1 && (
                      <>
                        <div className="text-blue-400 mt-4">{">"} Initiating AI analysis...</div>
                        <div>
                          {">"} CVE Match: {currentStepData.data.cve || "N/A"}
                        </div>
                        <div>
                          {">"} Risk Score: {currentStepData.data.riskScore || "N/A"}
                        </div>
                        <div>
                          {">"} Category: {currentStepData.data.category || "N/A"}
                        </div>
                      </>
                    )}

                    {currentStep >= 2 && (
                      <>
                        <div className="text-orange-400 mt-4">{">"} Broadcasting alert to network...</div>
                        <div>
                          {">"} MSMEs Notified: {currentStepData.data.notified || "N/A"}
                        </div>
                        <div>
                          {">"} Regions: {currentStepData.data.regions || "N/A"}
                        </div>
                      </>
                    )}

                    {currentStep >= 3 && (
                      <>
                        <div className="text-green-400 mt-4">{">"} Auto-generating defense rules...</div>
                        <div>
                          {">"} Rule Formats: {currentStepData.data.rules || "N/A"}
                        </div>
                        <div>
                          {">"} Systems Protected: {currentStepData.data.deployed || "N/A"}
                        </div>
                        <div className="text-green-400">{">"} Threat neutralized successfully!</div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Step Progress */}
          <div className="space-y-4">
            {demoSteps.map((step, index) => (
              <Card
                key={step.id}
                className={`transition-all duration-300 ${
                  index === currentStep
                    ? "border-blue-500 bg-blue-50"
                    : index < currentStep
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index < currentStep
                          ? "bg-green-500 text-white"
                          : index === currentStep
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index < currentStep ? <CheckCircle className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{step.title}</div>
                      <div className="text-xs text-gray-600">{step.description}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Demo Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.3s</div>
              <div className="text-sm text-gray-600">Threat Detection Time</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">2,847</div>
              <div className="text-sm text-gray-600">MSMEs Protected</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1,234</div>
              <div className="text-sm text-gray-600">Rules Deployed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Threat Blocked</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Protect Your MSME?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of MSMEs already protected by HorizonGrid's AI-powered defense network
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" variant="secondary" className="px-8">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
