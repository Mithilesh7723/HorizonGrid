"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Shield,
  LayoutDashboard,
  AlertTriangle,
  Globe,
  Settings,
  BarChart3,
  FileText,
  Database,
  Bell,
  Crown,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    current: false,
  },
  {
    name: "Threats",
    icon: AlertTriangle,
    current: false,
    children: [
      { name: "Live Feed", href: "/threats" },
      { name: "Submit Threat", href: "/threats/submit" },
      { name: "Threat Analysis", href: "/threats/analysis" },
      { name: "IOC Database", href: "/threats/ioc" },
    ],
  },
  {
    name: "Intelligence",
    icon: Database,
    current: false,
    children: [
      { name: "Threat Map", href: "/map" },
      { name: "CVE Database", href: "/intelligence/cve" },
      { name: "Threat Hunting", href: "/intelligence/hunting" },
      { name: "OSINT Sources", href: "/intelligence/osint" },
    ],
  },
  {
    name: "Defense",
    icon: Shield,
    current: false,
    children: [
      { name: "Auto Rules", href: "/defense/rules" },
      { name: "Firewall Config", href: "/defense/firewall" },
      { name: "IDS/IPS", href: "/defense/ids" },
      { name: "Response Plans", href: "/defense/response" },
    ],
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    current: false,
  },
  {
    name: "Network",
    icon: Globe,
    current: false,
    children: [
      { name: "MSME Directory", href: "/network/msmes" },
      { name: "Collaboration", href: "/network/collaboration" },
      { name: "Trust Score", href: "/network/trust" },
      { name: "Regional Hubs", href: "/network/hubs" },
    ],
  },
  {
    name: "Alerts",
    href: "/alerts",
    icon: Bell,
    current: false,
    badge: "12",
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
    current: false,
  },
]

const adminNavigation = [
  {
    name: "Admin Panel",
    icon: Crown,
    current: false,
    children: [
      { name: "User Management", href: "/admin/users" },
      { name: "Threat Enrichment", href: "/admin/enrichment" },
      { name: "System Config", href: "/admin/config" },
      { name: "API Management", href: "/admin/api" },
      { name: "Audit Logs", href: "/admin/logs" },
    ],
  },
]

interface SidebarProps {
  user: any
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>(["Threats", "Intelligence"])

  const toggleSection = (name: string) => {
    setOpenSections((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))
  }

  const isAdmin = user?.role === "admin" || user?.email === "admin@horizongrid.com"

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6 border-b border-gray-200">
        <Shield className="h-8 w-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-900">HorizonGrid</span>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{user?.name || "User"}</div>
            <div className="text-xs text-gray-500 truncate">{user?.company || "Company"}</div>
          </div>
        </div>
        <div className="mt-2">
          <Badge variant="outline" className="text-xs">
            {user?.plan || "Free"} Plan
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            if (item.children) {
              const isOpen = openSections.includes(item.name)
              return (
                <Collapsible key={item.name} open={isOpen} onOpenChange={() => toggleSection(item.name)}>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" className="w-full justify-between text-left font-normal hover:bg-gray-100">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{item.name}</span>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="h-4 w-4 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="ml-6 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-left font-normal text-sm ${
                            pathname === child.href
                              ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                              : "text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {child.name}
                        </Button>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <Link key={item.name} href={item.href!}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-left font-normal ${
                    pathname === item.href
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-sm">{item.name}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="ml-auto text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Admin Section */}
        {isAdmin && (
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Administration</div>
            {adminNavigation.map((item) => (
              <Collapsible
                key={item.name}
                open={openSections.includes(item.name)}
                onOpenChange={() => toggleSection(item.name)}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between text-left font-normal hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-amber-500" />
                      <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                    {openSections.includes(item.name) ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="ml-6 mt-1 space-y-1">
                  {item.children?.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start text-left font-normal text-sm ${
                          pathname === child.href
                            ? "bg-amber-50 text-amber-700 border-r-2 border-amber-600"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {child.name}
                      </Button>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200">
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start text-left font-normal">
            <Settings className="mr-3 h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">Settings</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
