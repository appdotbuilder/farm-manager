import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crop, CropActivity, DashboardStats } from '@/types/crops';

interface Props {
    stats: DashboardStats;
    recentCrops: Crop[];
    recentActivities: CropActivity[];
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentCrops, recentActivities }: Props) {
    const { auth } = usePage<{ auth: { user: { name: string; role: string } } }>().props;
    const user = auth.user;

    const getStatusBadge = (status: string) => {
        const statusConfig = {
            planted: { color: 'bg-blue-100 text-blue-800', label: '🌱 Planted' },
            seedling: { color: 'bg-yellow-100 text-yellow-800', label: '🌿 Seedling' },
            growing: { color: 'bg-green-100 text-green-800', label: '🌾 Growing' },
            harvest_ready: { color: 'bg-orange-100 text-orange-800', label: '🚜 Ready' },
            harvested: { color: 'bg-gray-100 text-gray-800', label: '✅ Harvested' },
        };
        
        return statusConfig[status as keyof typeof statusConfig] || statusConfig.planted;
    };

    const getActivityIcon = (type: string) => {
        const icons = {
            irrigation: '💧',
            fertilization: '🌱',
            pest_control: '🐛',
            scouting: '👀',
            weeding: '🌿',
            harvesting: '🚜',
            other: '📋'
        };
        return icons[type as keyof typeof icons] || '📋';
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome back, {user.name}! 👋
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {user.role === 'admin' ? 'Administrator Dashboard' : 'Farmer Dashboard'}
                        </p>
                    </div>
                    <Link href={route('crops.create')}>
                        <Button className="bg-green-600 hover:bg-green-700">
                            🌱 Add New Crop
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Crops
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-blue-600">
                                    {stats.totalCrops}
                                </span>
                                <span className="ml-2 text-2xl">🌾</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Active Crops
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-green-600">
                                    {stats.activeCrops}
                                </span>
                                <span className="ml-2 text-2xl">🌱</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Ready for Harvest
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-orange-600">
                                    {stats.readyForHarvest}
                                </span>
                                <span className="ml-2 text-2xl">🚜</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">
                                Total Activities
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-purple-600">
                                    {stats.totalActivities}
                                </span>
                                <span className="ml-2 text-2xl">📋</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Crops */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">🌾</span>
                                    Recent Crops
                                </CardTitle>
                                <Link href={route('crops.index')}>
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                            <CardDescription>
                                Your latest crop entries
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentCrops.length > 0 ? (
                                <div className="space-y-4">
                                    {recentCrops.map((crop) => (
                                        <div
                                            key={crop.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex-1">
                                                <Link 
                                                    href={route('crops.show', crop.id)}
                                                    className="font-medium text-gray-900 hover:text-green-600"
                                                >
                                                    {crop.name}
                                                </Link>
                                                <div className="text-sm text-gray-600">
                                                    {crop.type} • {crop.field_location}
                                                    {crop.user && user.role === 'admin' && (
                                                        <span> • {crop.user.name}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <Badge className={getStatusBadge(crop.status).color}>
                                                {getStatusBadge(crop.status).label}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-gray-500">
                                    <span className="text-4xl mb-2 block">🌱</span>
                                    <p>No crops yet. Start by adding your first crop!</p>
                                    <Link href={route('crops.create')} className="mt-2 inline-block">
                                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                            Add Crop
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Activities */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <span className="mr-2">📋</span>
                                Recent Activities
                            </CardTitle>
                            <CardDescription>
                                Latest farming activities
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentActivities.length > 0 ? (
                                <div className="space-y-4">
                                    {recentActivities.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="text-xl">
                                                {getActivityIcon(activity.activity_type)}
                                            </span>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-medium text-gray-900 capitalize">
                                                        {activity.activity_type.replace('_', ' ')}
                                                    </p>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(activity.activity_date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 truncate">
                                                    {activity.description}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {activity.crop?.name}
                                                    {activity.crop?.user && user.role === 'admin' && (
                                                        <span> • {activity.crop.user.name}</span>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-gray-500">
                                    <span className="text-4xl mb-2 block">📋</span>
                                    <p>No activities recorded yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <span className="mr-2">⚡</span>
                            Quick Actions
                        </CardTitle>
                        <CardDescription>
                            Common tasks to get you started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href={route('crops.create')}>
                                <Button className="w-full h-auto p-4 bg-green-600 hover:bg-green-700">
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">🌱</div>
                                        <div className="font-medium">Add New Crop</div>
                                        <div className="text-xs opacity-80">Plant a new crop</div>
                                    </div>
                                </Button>
                            </Link>
                            
                            <Link href={route('crops.index')}>
                                <Button variant="outline" className="w-full h-auto p-4">
                                    <div className="text-center">
                                        <div className="text-2xl mb-2">📊</div>
                                        <div className="font-medium">View All Crops</div>
                                        <div className="text-xs opacity-60">Manage your crops</div>
                                    </div>
                                </Button>
                            </Link>
                            
                            <Button variant="outline" className="w-full h-auto p-4" disabled>
                                <div className="text-center">
                                    <div className="text-2xl mb-2">📈</div>
                                    <div className="font-medium">View Reports</div>
                                    <div className="text-xs opacity-60">Coming soon</div>
                                </div>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}