import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
            {/* Header */}
            <header className="container mx-auto px-4 py-6">
                <nav className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">🌾</span>
                        </div>
                        <h1 className="text-2xl font-bold text-green-800">CropManager</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/login">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link href="/register">
                            <Button className="bg-green-600 hover:bg-green-700">Get Started</Button>
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-4 py-12">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 mb-6">
                        🌱 Smart Crop Management
                        <br />
                        <span className="text-green-600">For Modern Farmers</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Take control of your farming operations with our comprehensive crop management system. 
                        Track planting, monitor growth, record activities, and optimize your harvest yields.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                        <Link href="/register">
                            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                                🚀 Start Managing Crops
                            </Button>
                        </Link>
                        <Link href="/login">
                            <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                                Login to Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <Card className="border-2 border-green-100 hover:border-green-300 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span className="text-2xl">📊</span>
                                <span>Crop Management</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Add, update, and track all your crops with detailed information including planting dates, 
                                harvest schedules, field locations, and current status.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span className="text-2xl">📝</span>
                                <span>Activity Tracking</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Record all farming activities including irrigation, fertilization, pest control, 
                                and scouting observations with dates and quantities.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span className="text-2xl">📈</span>
                                <span>Status Updates</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Monitor crop progress through different growth stages from planting to harvest 
                                with real-time status updates and visual indicators.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-orange-100 hover:border-orange-300 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span className="text-2xl">📋</span>
                                <span>Smart Reporting</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Generate comprehensive reports on crop performance, activity logs, 
                                and yield trends to optimize your farming strategies.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-red-100 hover:border-red-300 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span className="text-2xl">👥</span>
                                <span>Role Management</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Support for both administrators and farmers with appropriate access levels 
                                and permissions for managing crops and viewing reports.
                            </CardDescription>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-teal-100 hover:border-teal-300 transition-colors">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <span className="text-2xl">🎯</span>
                                <span>Easy to Use</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription className="text-base">
                                Intuitive dashboard with clean navigation, responsive design, 
                                and user-friendly forms for efficient farm management.
                            </CardDescription>
                        </CardContent>
                    </Card>
                </div>

                {/* Demo Section */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
                    <h3 className="text-3xl font-bold text-center mb-8 text-gray-900">
                        🎯 Perfect for Every Farm Size
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold text-green-700 flex items-center">
                                <span className="mr-2">👨‍🌾</span>
                                For Farmers
                            </h4>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Manage your assigned crops
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Track daily activities and progress
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Update crop status in real-time
                                </li>
                                <li className="flex items-center">
                                    <span className="text-green-500 mr-2">✓</span>
                                    View personalized reports
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-xl font-semibold text-blue-700 flex items-center">
                                <span className="mr-2">👨‍💼</span>
                                For Administrators
                            </h4>
                            <ul className="space-y-2 text-gray-600">
                                <li className="flex items-center">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    Full access to all farm operations
                                </li>
                                <li className="flex items-center">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    Manage users and permissions
                                </li>
                                <li className="flex items-center">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    Comprehensive reporting dashboard
                                </li>
                                <li className="flex items-center">
                                    <span className="text-blue-500 mr-2">✓</span>
                                    Monitor all crops and activities
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-12 text-white">
                    <h3 className="text-3xl font-bold mb-4">
                        Ready to Transform Your Farming? 🚜
                    </h3>
                    <p className="text-xl mb-8 opacity-90">
                        Join thousands of farmers already using CropManager to optimize their operations
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link href="/register">
                            <Button size="lg" variant="secondary" className="text-lg px-8 py-3 bg-white text-green-600 hover:bg-gray-100">
                                🌟 Create Free Account
                            </Button>
                        </Link>
                        <div className="flex items-center space-x-2 text-green-100">
                            <Badge variant="secondary" className="bg-green-500 text-white">
                                💯 Free Forever
                            </Badge>
                            <Badge variant="secondary" className="bg-green-500 text-white">
                                ⚡ No Setup Fee
                            </Badge>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
                <p>&copy; 2024 CropManager. Built for modern agricultural management.</p>
            </footer>
        </div>
    );
}