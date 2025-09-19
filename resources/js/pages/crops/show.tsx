import React from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crop } from '@/types/crops';

interface Props {
    crop: Crop;
    [key: string]: unknown;
}

export default function ShowCrop({ crop }: Props) {
    const { auth } = usePage<{ auth: { user: { role: string; id: number } } }>().props;
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this crop? This action cannot be undone.')) {
            router.delete(route('crops.destroy', crop.id));
        }
    };

    const canEdit = user.role === 'admin' || crop.user_id === user.id;
    const daysUntilHarvest = Math.ceil(
        (new Date(crop.expected_harvest_date).getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    );

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                            🌾 {crop.name}
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {crop.type} crop at {crop.field_location}
                            {crop.user && user.role === 'admin' && (
                                <span className="ml-2">• Managed by {crop.user.name}</span>
                            )}
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Badge className={getStatusBadge(crop.status).color + ' text-base px-3 py-1'}>
                            {getStatusBadge(crop.status).label}
                        </Badge>
                        {canEdit && (
                            <>
                                <Link href={route('crops.edit', crop.id)}>
                                    <Button variant="outline">
                                        ✏️ Edit Crop
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                >
                                    🗑️ Delete
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Crop Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Crop Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">📊</span>
                                    Crop Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Name:</span>
                                            <span className="font-medium">{crop.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Type:</span>
                                            <span className="font-medium capitalize">{crop.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Location:</span>
                                            <span className="font-medium">{crop.field_location}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Status:</span>
                                            <Badge className={getStatusBadge(crop.status).color + ' text-xs'}>
                                                {getStatusBadge(crop.status).label}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Planted:</span>
                                            <span className="font-medium">{formatDate(crop.planting_date)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Expected Harvest:</span>
                                            <span className="font-medium">{formatDate(crop.expected_harvest_date)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Days to Harvest:</span>
                                            <span className={`font-medium ${daysUntilHarvest < 0 ? 'text-red-600' : daysUntilHarvest <= 7 ? 'text-orange-600' : 'text-green-600'}`}>
                                                {daysUntilHarvest < 0 ? 'Overdue' : `${daysUntilHarvest} days`}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Created:</span>
                                            <span className="font-medium">{formatDate(crop.created_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Notes */}
                        {crop.notes && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <span className="mr-2">📝</span>
                                        Notes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-700 whitespace-pre-wrap">{crop.notes}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Activities */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center">
                                        <span className="mr-2">📋</span>
                                        Activities
                                        {crop.activities && (
                                            <span className="ml-2 text-sm text-gray-500">
                                                ({crop.activities.length})
                                            </span>
                                        )}
                                    </CardTitle>
                                    {canEdit && (
                                        <Link href={route('crop-activities.create', crop.id)}>
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                📝 Add Activity
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                                <CardDescription>
                                    All recorded activities for this crop
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {crop.activities && crop.activities.length > 0 ? (
                                    <div className="space-y-4">
                                        {crop.activities.map((activity) => (
                                            <div
                                                key={activity.id}
                                                className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <span className="text-2xl">
                                                    {getActivityIcon(activity.activity_type)}
                                                </span>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <h4 className="font-medium text-gray-900 capitalize">
                                                            {activity.activity_type.replace('_', ' ')}
                                                        </h4>
                                                        <span className="text-sm text-gray-500">
                                                            {formatDate(activity.activity_date)}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-700 mb-2">{activity.description}</p>
                                                    {activity.quantity && activity.unit && (
                                                        <p className="text-sm text-gray-600">
                                                            Quantity: {activity.quantity} {activity.unit}
                                                        </p>
                                                    )}
                                                </div>
                                                {canEdit && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to delete this activity?')) {
                                                                router.delete(route('crop-activities.destroy', activity.id));
                                                            }
                                                        }}
                                                    >
                                                        🗑️
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <span className="text-4xl mb-2 block">📋</span>
                                        <p>No activities recorded yet.</p>
                                        {canEdit && (
                                            <Link href={route('crop-activities.create', crop.id)} className="mt-2 inline-block">
                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                    Add First Activity
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {canEdit && (
                                    <>
                                        <Link href={route('crop-activities.create', crop.id)} className="block">
                                            <Button className="w-full bg-blue-600 hover:bg-blue-700">
                                                📝 Add Activity
                                            </Button>
                                        </Link>
                                        <Link href={route('crops.edit', crop.id)} className="block">
                                            <Button variant="outline" className="w-full">
                                                ✏️ Edit Crop
                                            </Button>
                                        </Link>
                                    </>
                                )}
                                <Link href={route('crops.index')} className="block">
                                    <Button variant="outline" className="w-full">
                                        🌾 All Crops
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Status Progress */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Growth Progress</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {['planted', 'seedling', 'growing', 'harvest_ready', 'harvested'].map((status) => {
                                        const config = getStatusBadge(status);
                                        const isActive = crop.status === status;
                                        const isPassed = ['planted', 'seedling', 'growing', 'harvest_ready', 'harvested'].indexOf(crop.status) > 
                                                        ['planted', 'seedling', 'growing', 'harvest_ready', 'harvested'].indexOf(status);
                                        
                                        return (
                                            <div
                                                key={status}
                                                className={`flex items-center space-x-2 p-2 rounded ${
                                                    isActive ? 'bg-blue-50 border border-blue-200' : 
                                                    isPassed ? 'bg-green-50' : 'bg-gray-50'
                                                }`}
                                            >
                                                <div className={`w-3 h-3 rounded-full ${
                                                    isActive ? 'bg-blue-500' : 
                                                    isPassed ? 'bg-green-500' : 'bg-gray-300'
                                                }`} />
                                                <span className={`text-sm ${
                                                    isActive ? 'font-medium text-blue-900' : 
                                                    isPassed ? 'text-green-700' : 'text-gray-600'
                                                }`}>
                                                    {config.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}