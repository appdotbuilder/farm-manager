import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crop } from '@/types/crops';

interface Props {
    crops: {
        data: Crop[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
        meta: { current_page: number; last_page: number; total: number };
    };
    [key: string]: unknown;
}

export default function CropsIndex({ crops }: Props) {
    const { auth } = usePage<{ auth: { user: { role: string } } }>().props;
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🌾 Crop Management</h1>
                        <p className="text-gray-600 mt-1">
                            Manage all your crops in one place
                        </p>
                    </div>
                    <Link href={route('crops.create')}>
                        <Button className="bg-green-600 hover:bg-green-700">
                            🌱 Add New Crop
                        </Button>
                    </Link>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Total Crops</p>
                                    <p className="text-2xl font-bold text-blue-600">{crops.meta.total}</p>
                                </div>
                                <span className="text-2xl">🌾</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Growing</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {crops.data.filter(c => c.status === 'growing').length}
                                    </p>
                                </div>
                                <span className="text-2xl">🌱</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Ready</p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {crops.data.filter(c => c.status === 'harvest_ready').length}
                                    </p>
                                </div>
                                <span className="text-2xl">🚜</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">Harvested</p>
                                    <p className="text-2xl font-bold text-gray-600">
                                        {crops.data.filter(c => c.status === 'harvested').length}
                                    </p>
                                </div>
                                <span className="text-2xl">✅</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Crops Grid */}
                {crops.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {crops.data.map((crop) => (
                            <Card key={crop.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-lg">
                                            <Link 
                                                href={route('crops.show', crop.id)}
                                                className="text-gray-900 hover:text-green-600 transition-colors"
                                            >
                                                {crop.name}
                                            </Link>
                                        </CardTitle>
                                        <Badge className={getStatusBadge(crop.status).color}>
                                            {getStatusBadge(crop.status).label}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-gray-600">Type:</span>
                                            <p className="font-medium capitalize">{crop.type}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Location:</span>
                                            <p className="font-medium truncate">{crop.field_location}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-gray-600">Planted:</span>
                                            <p className="font-medium">{formatDate(crop.planting_date)}</p>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Harvest:</span>
                                            <p className="font-medium">{formatDate(crop.expected_harvest_date)}</p>
                                        </div>
                                    </div>

                                    {crop.user && user.role === 'admin' && (
                                        <div className="pt-2 border-t">
                                            <span className="text-gray-600 text-sm">Farmer:</span>
                                            <p className="font-medium text-sm">{crop.user.name}</p>
                                        </div>
                                    )}

                                    <div className="flex items-center space-x-2 pt-2">
                                        <Link href={route('crops.show', crop.id)} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full">
                                                👁️ View Details
                                            </Button>
                                        </Link>
                                        <Link href={route('crops.edit', crop.id)}>
                                            <Button variant="outline" size="sm">
                                                ✏️ Edit
                                            </Button>
                                        </Link>
                                        <Link href={route('crop-activities.create', crop.id)}>
                                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                📝 Activity
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-6xl mb-4">🌱</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No crops yet
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Start managing your crops by adding your first one.
                            </p>
                            <Link href={route('crops.create')}>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    🌱 Add Your First Crop
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}

                {/* Pagination */}
                {crops.meta.last_page > 1 && (
                    <div className="flex items-center justify-center space-x-2">
                        {crops.links.map((link, index) => (
                            <div key={index}>
                                {link.url ? (
                                    <Link href={link.url}>
                                        <Button
                                            variant={link.active ? "default" : "outline"}
                                            size="sm"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    </Link>
                                ) : (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}