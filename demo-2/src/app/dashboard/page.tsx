"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Users,
    TrendingUp,
    DollarSign,
    ShoppingCart,
    Activity,
    BarChart3,
    PieChart,
    LineChart,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    Bell,
    Settings,
    Search
} from "lucide-react"
import { useState } from "react"

const stats = [
    {
        title: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1%",
        changeType: "positive" as const,
        icon: DollarSign,
        color: "text-green-600"
    },
    {
        title: "Subscriptions",
        value: "2,350",
        change: "+180.1%",
        changeType: "positive" as const,
        icon: Users,
        color: "text-blue-600"
    },
    {
        title: "Sales",
        value: "12,234",
        change: "+19%",
        changeType: "positive" as const,
        icon: ShoppingCart,
        color: "text-purple-600"
    },
    {
        title: "Active Now",
        value: "573",
        change: "-2%",
        changeType: "negative" as const,
        icon: Activity,
        color: "text-orange-600"
    }
]

const recentOrders = [
    {
        id: "ORD-001",
        customer: "John Doe",
        product: "Premium Plan",
        amount: "$99.00",
        status: "completed",
        date: "2024-01-15"
    },
    {
        id: "ORD-002",
        customer: "Jane Smith",
        product: "Basic Plan",
        amount: "$29.00",
        status: "pending",
        date: "2024-01-14"
    },
    {
        id: "ORD-003",
        customer: "Bob Johnson",
        product: "Enterprise Plan",
        amount: "$299.00",
        status: "processing",
        date: "2024-01-13"
    },
    {
        id: "ORD-004",
        customer: "Alice Brown",
        product: "Premium Plan",
        amount: "$99.00",
        status: "completed",
        date: "2024-01-12"
    }
]

const teamMembers = [
    {
        name: "John Doe",
        role: "CEO",
        avatar: "/avatars/john.jpg",
        status: "online"
    },
    {
        name: "Jane Smith",
        role: "CTO",
        avatar: "/avatars/jane.jpg",
        status: "away"
    },
    {
        name: "Bob Johnson",
        role: "Designer",
        avatar: "/avatars/bob.jpg",
        status: "offline"
    },
    {
        name: "Alice Brown",
        role: "Developer",
        avatar: "/avatars/alice.jpg",
        status: "online"
    }
]

export default function DashboardPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("7d")

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
                >
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back! Here's what's happening with your business.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                            <Search className="h-4 w-4 mr-2" />
                            Search
                        </Button>
                        <Button variant="outline" size="sm">
                            <Bell className="h-4 w-4 mr-2" />
                            Notifications
                        </Button>
                        <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Settings
                        </Button>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <motion.div
                                key={stat.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium text-muted-foreground">
                                            {stat.title}
                                        </CardTitle>
                                        <Icon className={`h-4 w-4 ${stat.color}`} />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{stat.value}</div>
                                        <div className="flex items-center text-xs text-muted-foreground">
                                            {stat.changeType === "positive" ? (
                                                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
                                            ) : (
                                                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
                                            )}
                                            <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                                                {stat.change}
                                            </span>
                                            <span className="ml-1">from last month</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Chart Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Revenue Overview</CardTitle>
                                        <CardDescription>Monthly revenue for the past 12 months</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant={selectedPeriod === "7d" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setSelectedPeriod("7d")}
                                        >
                                            7D
                                        </Button>
                                        <Button
                                            variant={selectedPeriod === "30d" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setSelectedPeriod("30d")}
                                        >
                                            30D
                                        </Button>
                                        <Button
                                            variant={selectedPeriod === "90d" ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => setSelectedPeriod("90d")}
                                        >
                                            90D
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
                                    <div className="text-center space-y-4">
                                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                                        <p className="text-muted-foreground">Chart visualization would go here</p>
                                        <p className="text-sm text-muted-foreground">
                                            Integrate with Chart.js, Recharts, or similar library
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Team Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Team Members</CardTitle>
                                <CardDescription>Your team's current status</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {teamMembers.map((member, index) => (
                                    <motion.div
                                        key={member.name}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                        className="flex items-center space-x-4"
                                    >
                                        <Avatar>
                                            <AvatarImage src={member.avatar} alt={member.name} />
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1">
                                            <p className="text-sm font-medium leading-none">{member.name}</p>
                                            <p className="text-xs text-muted-foreground">{member.role}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${member.status === 'online' ? 'bg-green-500' :
                                                    member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                                                }`} />
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Recent Orders */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Orders</CardTitle>
                            <CardDescription>Your latest orders and their status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentOrders.map((order, index) => (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                                <ShoppingCart className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium">{order.customer}</p>
                                                <p className="text-sm text-muted-foreground">{order.product}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <p className="font-medium">{order.amount}</p>
                                                <p className="text-sm text-muted-foreground">{order.date}</p>
                                            </div>
                                            <Badge
                                                variant={
                                                    order.status === 'completed' ? 'default' :
                                                        order.status === 'pending' ? 'secondary' : 'outline'
                                                }
                                            >
                                                {order.status}
                                            </Badge>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-8"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common tasks and shortcuts</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                                    <BarChart3 className="h-6 w-6" />
                                    <span className="text-sm">Analytics</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                                    <Users className="h-6 w-6" />
                                    <span className="text-sm">Users</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                                    <PieChart className="h-6 w-6" />
                                    <span className="text-sm">Reports</span>
                                </Button>
                                <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                                    <LineChart className="h-6 w-6" />
                                    <span className="text-sm">Charts</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
