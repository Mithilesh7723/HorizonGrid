"use client"

import { Shield, ArrowLeft, Code, Key, Database, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/v1/threats",
    description: "Retrieve real-time threat feed",
    params: ["limit", "severity", "type", "region"],
    response: "Array of threat objects with IOCs, severity, and metadata",
  },
  {
    method: "POST",
    endpoint: "/api/v1/threats",
    description: "Submit new threat intelligence",
    params: ["type", "value", "severity", "description", "source"],
    response: "Threat ID and processing status",
  },
  {
    method: "GET",
    endpoint: "/api/v1/rules",
    description: "Get auto-generated defense rules",
    params: ["format", "platform", "threat_id"],
    response: "Formatted rules for firewall/IDS deployment",
  },
  {
    method: "GET",
    endpoint: "/api/v1/analytics",
    description: "Access threat analytics and statistics",
    params: ["timeframe", "region", "metric"],
    response: "Analytics data and trend information",
  },
]

const codeExamples = {
  javascript: `// Get latest threats
const response = await fetch('https://api.horizongrid.in/v1/threats', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const threats = await response.json();
console.log(threats);`,

  python: `import requests

# Submit new threat
url = "https://api.horizongrid.in/v1/threats"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

data = {
    "type": "ip",
    "value": "192.168.1.100",
    "severity": "high",
    "description": "Suspicious scanning activity"
}

response = requests.post(url, json=data, headers=headers)
print(response.json())`,

  curl: `# Get defense rules
curl -X GET "https://api.horizongrid.in/v1/rules?format=iptables" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
}

export default function APIPage() {
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
              <span>API Documentation</span>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Documentation</h1>
          <p className="text-gray-600">Integrate HorizonGrid's threat intelligence into your systems</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Getting Started */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5 text-blue-600" />
                  Getting Started
                </CardTitle>
                <CardDescription>Quick setup guide for HorizonGrid API integration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">1. Get Your API Key</h3>
                  <p className="text-sm text-gray-600 mb-3">Generate your API key from the dashboard settings</p>
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">
                    API_KEY=hg_live_1234567890abcdef...
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">2. Base URL</h3>
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">https://api.horizongrid.in/v1</div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">3. Authentication</h3>
                  <p className="text-sm text-gray-600 mb-3">Include your API key in the Authorization header</p>
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-sm">Authorization: Bearer YOUR_API_KEY</div>
                </div>
              </CardContent>
            </Card>

            {/* API Endpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-green-600" />
                  API Endpoints
                </CardTitle>
                <CardDescription>Available endpoints for threat intelligence operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={endpoint.method === "GET" ? "secondary" : "default"}>{endpoint.method}</Badge>
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{endpoint.endpoint}</code>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                      <div className="text-xs text-gray-500">
                        <strong>Parameters:</strong> {endpoint.params.join(", ")}
                      </div>
                      <div className="text-xs text-gray-500">
                        <strong>Response:</strong> {endpoint.response}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Code Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  Code Examples
                </CardTitle>
                <CardDescription>Implementation examples in different programming languages</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>

                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang}>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <pre className="text-sm">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/settings" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Key className="h-4 w-4 mr-2" />
                    Generate API Key
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Code className="h-4 w-4 mr-2" />
                  SDK Downloads
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Zap className="h-4 w-4 mr-2" />
                  Webhook Setup
                </Button>
              </CardContent>
            </Card>

            {/* Rate Limits */}
            <Card>
              <CardHeader>
                <CardTitle>Rate Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Free Plan:</span>
                    <span className="font-medium">100/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Basic Plan:</span>
                    <span className="font-medium">1,000/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pro Plan:</span>
                    <span className="font-medium">10,000/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Enterprise:</span>
                    <span className="font-medium">Unlimited</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-600">Our technical team is here to help you integrate successfully.</p>
                <Button className="w-full">Contact Support</Button>
                <div className="text-xs text-gray-500 text-center">Response time: &lt; 2 hours</div>
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>API Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Health</span>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">45ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Uptime</span>
                    <span className="text-sm font-medium">99.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
