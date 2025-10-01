"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
    Settings as SettingsIcon,
    User,
    Bell,
    Shield,
    Palette,
    Globe,
    Database,
    Key,
    Save,
    Download,
    Upload
} from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async () => {
        setIsSaving(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsSaving(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted">
            <div className="container mx-auto px-4 py-20">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Settings
                        <span className="text-primary"> & Configuration</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Manage your application settings, preferences, and configurations.
                        All changes are saved automatically.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Profile Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="h-6 w-6" />
                                    Profile Settings
                                </CardTitle>
                                <CardDescription>
                                    Update your personal information and profile details
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" placeholder="Enter your first name" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" placeholder="Enter your last name" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" placeholder="Enter your email" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Tell us about yourself..."
                                        rows={4}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Notification Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bell className="h-6 w-6" />
                                    Notification Preferences
                                </CardTitle>
                                <CardDescription>
                                    Configure how and when you receive notifications
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Email Notifications</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Receive updates via email
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Enabled
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Push Notifications</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Receive push notifications in your browser
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Disabled
                                        </Button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">SMS Notifications</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Receive important updates via SMS
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            Enabled
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Appearance Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Palette className="h-6 w-6" />
                                    Appearance
                                </CardTitle>
                                <CardDescription>
                                    Customize the look and feel of your application
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="theme">Theme</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select theme" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="language">Language</Label>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select language" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="en">English</SelectItem>
                                                <SelectItem value="es">Spanish</SelectItem>
                                                <SelectItem value="fr">French</SelectItem>
                                                <SelectItem value="de">German</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="timezone">Timezone</Label>
                                    <Select>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select timezone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="utc">UTC</SelectItem>
                                            <SelectItem value="est">Eastern Time</SelectItem>
                                            <SelectItem value="pst">Pacific Time</SelectItem>
                                            <SelectItem value="cet">Central European Time</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Security Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-6 w-6" />
                                    Security & Privacy
                                </CardTitle>
                                <CardDescription>
                                    Manage your security settings and privacy preferences
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Two-Factor Authentication</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Add an extra layer of security to your account
                                            </p>
                                        </div>
                                        <Badge variant="secondary">Not Enabled</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Login Notifications</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Get notified when someone logs into your account
                                            </p>
                                        </div>
                                        <Badge variant="default">Enabled</Badge>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">Data Export</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Download a copy of your data
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Download className="h-4 w-4 mr-2" />
                                            Export
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* API Settings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Key className="h-6 w-6" />
                                    API & Integrations
                                </CardTitle>
                                <CardDescription>
                                    Manage your API keys and third-party integrations
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-medium">API Key</h4>
                                            <p className="text-sm text-muted-foreground">
                                                Your personal API key for accessing our services
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Key className="h-4 w-4 mr-2" />
                                            Generate New
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="webhook">Webhook URL</Label>
                                        <Input
                                            id="webhook"
                                            placeholder="https://your-domain.com/webhook"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Save Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex justify-end"
                    >
                        <Button
                            onClick={handleSave}
                            disabled={isSaving}
                            size="lg"
                            className="px-8"
                        >
                            {isSaving ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="mr-2"
                                    >
                                        <Save className="h-4 w-4" />
                                    </motion.div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
