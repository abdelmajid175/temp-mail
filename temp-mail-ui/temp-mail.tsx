"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Copy, RefreshCw, Mail, Clock, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function TempMail() {
  const [tempEmail] = useState("user.temp.2024@tempmail.io")
  const [generatedAt] = useState("14:32:15")
  const { toast } = useToast()

  const mockEmails = [
    {
      id: 1,
      sender: "noreply@github.com",
      subject: "Welcome to GitHub! Please verify your email address",
      time: "2 minutes ago",
      isNew: true,
    },
    {
      id: 2,
      sender: "support@netflix.com",
      subject: "Your Netflix account has been created",
      time: "5 minutes ago",
      isNew: true,
    },
    {
      id: 3,
      sender: "hello@stripe.com",
      subject: "Confirm your email address",
      time: "12 minutes ago",
      isNew: false,
    },
    {
      id: 4,
      sender: "team@figma.com",
      subject: "You've been invited to join a team",
      time: "1 hour ago",
      isNew: false,
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tempEmail)
      toast({
        title: "Email copied!",
        description: "The temporary email address has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy email address to clipboard.",
        variant: "destructive",
      })
    }
  }

  const generateNewEmail = () => {
    toast({
      title: "New email generated!",
      description: "A new temporary email address has been created.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-blue-400" />
            <h1 className="text-xl font-bold text-white">TempMail</h1>
            <Badge variant="secondary" className="ml-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
              Free
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Email Generator Section */}
        <Card className="mb-8 bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-400" />
              Your Temporary Email Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  value={tempEmail}
                  readOnly
                  className="bg-gray-800 border-gray-700 text-white font-mono text-sm sm:text-base"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={generateNewEmail}
                  variant="outline"
                  className="border-gray-700 bg-gray-800 hover:bg-gray-700 text-white"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  New
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Generated at: {generatedAt}</span>
            </div>
          </CardContent>
        </Card>

        {/* Inbox Section */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-400" />
                Inbox
                <Badge variant="secondary" className="ml-2 bg-blue-500/10 text-blue-400 border-blue-500/20">
                  {mockEmails.length}
                </Badge>
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {mockEmails.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg mb-2">No emails yet</p>
                <p className="text-sm">Emails sent to your temporary address will appear here</p>
              </div>
            ) : (
              <div className="space-y-3">
                {mockEmails.map((email) => (
                  <div
                    key={email.id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-gray-800 bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-white truncate">{email.sender}</p>
                        {email.isNew && (
                          <Badge
                            variant="secondary"
                            className="bg-green-500/10 text-green-400 border-green-500/20 text-xs"
                          >
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 mb-1 line-clamp-1">{email.subject}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{email.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-400">
            <p>© 2024 TempMail. Temporary email addresses for your privacy.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
