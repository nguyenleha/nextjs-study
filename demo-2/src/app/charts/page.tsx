"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    BarChart3,
    PieChart,
    LineChart,
    TrendingUp,
    TrendingDown,
    Activity,
    Target,
    Zap
} from "lucide-react"

const chartData = {
    revenue: [
        { month: "Jan", value: 4000, growth: 12 },
        { month: "Feb", value: 3000, growth: -8 },
        { month: "Mar", value: 5000, growth: 25 },
        { month: "Apr", value: 4500, growth: 15 },
        { month: "May", value: 6000, growth: 33 },
        { month: "Jun", value: 5500, growth: 22 }
    ],
    users: [
        { category: "Desktop", value: 45, color: "bg-blue-500" },
        { category: "Mobile", value: 35, color: "bg-green-500" },
        { category: "Tablet", value: 20, color: "bg-purple-500" }
    ],
    performance: [
        { metric: "Page Load", value: 95, target: 90 },
        { metric: "API Response", value: 88, target: 95 },
        { metric: "Uptime", value: 99.9, target: 99.5 },
        { metric: "Error Rate", value: 0.1, target: 0.5 }
    ]
}

export default function ChartsPage() {
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
                        Data Visualization
                        <span className="text-primary"> Charts</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Interactive charts and data visualization components.
                        Perfect for dashboards and analytics applications.
                    </p>
                </motion.div>

                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mb-8"
                >
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="h-6 w-6" />
                                        Revenue Trend
                                    </CardTitle>
                                    <CardDescription>Monthly revenue over the past 6 months</CardDescription>
                                </div>
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <TrendingUp className="h-3 w-3" />
                                    +18.5% vs last period
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
                                <div className="text-center space-y-4">
                                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto" />
                                    <div>
                                        <p className="text-muted-foreground font-medium">Bar Chart Component</p>
                                        <p className="text-sm text-muted-foreground">
                                            Integrate with Recharts, Chart.js, or D3.js
                                        </p>
                                    </div>
                                    <div className="flex justify-center gap-2">
                                        {chartData.revenue.map((item, index) => (
                                            <div key={item.month} className="text-center">
                                                <div className="text-xs text-muted-foreground mb-1">{item.month}</div>
                                                <div
                                                    className="w-8 bg-primary rounded-t"
                                                    style={{ height: `${(item.value / 6000) * 100}px` }}
                                                />
                                                <div className="text-xs font-medium mt-1">${item.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Pie Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChart className="h-6 w-6" />
                                    User Devices
                                </CardTitle>
                                <CardDescription>Distribution of users by device type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                                    <div className="text-center space-y-4">
                                        <PieChart className="h-12 w-12 text-muted-foreground mx-auto" />
                                        <p className="text-muted-foreground font-medium">Pie Chart Component</p>
                                        <div className="flex justify-center gap-4">
                                            {chartData.users.map((item) => (
                                                <div key={item.category} className="text-center">
                                                    <div className={`w-4 h-4 ${item.color} rounded-full mx-auto mb-1`} />
                                                    <div className="text-xs text-muted-foreground">{item.category}</div>
                                                    <div className="text-sm font-medium">{item.value}%</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Line Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <LineChart className="h-6 w-6" />
                                    Performance Metrics
                                </CardTitle>
                                <CardDescription>Key performance indicators over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-64 flex items-center justify-center bg-muted/50 rounded-lg">
                                    <div className="text-center space-y-4">
                                        <LineChart className="h-12 w-12 text-muted-foreground mx-auto" />
                                        <p className="text-muted-foreground font-medium">Line Chart Component</p>
                                        <p className="text-sm text-muted-foreground">
                                            Perfect for time-series data
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>

                {/* Performance Metrics */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-8"
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-6 w-6" />
                                Performance Dashboard
                            </CardTitle>
                            <CardDescription>Real-time performance metrics and KPIs</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {chartData.performance.map((metric, index) => (
                                    <motion.div
                                        key={metric.metric}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                                        className="text-center space-y-2"
                                    >
                                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                            <Target className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="font-medium">{metric.metric}</h3>
                                        <div className="text-2xl font-bold text-primary">
                                            {metric.value}{metric.metric === 'Uptime' ? '%' : metric.metric === 'Error Rate' ? '%' : ''}
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Target: {metric.target}{metric.metric === 'Uptime' ? '%' : metric.metric === 'Error Rate' ? '%' : ''}
                                        </div>
                                        <div className={`text-xs font-medium ${metric.value >= metric.target ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {metric.value >= metric.target ? '✓ Above Target' : '⚠ Below Target'}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Chart Library Recommendations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Zap className="h-6 w-6" />
                                Recommended Chart Libraries
                            </CardTitle>
                            <CardDescription>
                                Popular and well-maintained charting libraries for React
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <h4 className="font-semibold text-lg">Recharts</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Composable charting library built on React and D3
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">React</Badge>
                                        <Badge variant="secondary">D3</Badge>
                                        <Badge variant="secondary">Responsive</Badge>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                        Learn More
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-semibold text-lg">Chart.js</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Simple yet flexible charting for designers and developers
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">Vanilla JS</Badge>
                                        <Badge variant="secondary">Canvas</Badge>
                                        <Badge variant="secondary">Lightweight</Badge>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                        Learn More
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="font-semibold text-lg">D3.js</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Powerful data visualization library with complete control
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">Advanced</Badge>
                                        <Badge variant="secondary">Customizable</Badge>
                                        <Badge variant="secondary">SVG</Badge>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
