import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';


export default function CreateCrop() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: '',
        planting_date: '',
        expected_harvest_date: '',
        field_location: '',
        status: 'planted',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('crops.store'));
    };

    const cropTypes = [
        'corn', 'wheat', 'soybeans', 'rice', 'barley', 'oats',
        'tomatoes', 'lettuce', 'carrots', 'potatoes', 'onions',
        'beans', 'peas', 'cucumbers', 'peppers', 'spinach', 'other'
    ];

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">🌱 Add New Crop</h1>
                    <p className="text-gray-600 mt-1">
                        Create a new crop entry to start tracking its progress
                    </p>
                </div>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Crop Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Crop Name *</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g., North Field Corn"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="type">Crop Type *</Label>
                                    <Select
                                        id="type"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        required
                                    >
                                        <option value="">Select crop type</option>
                                        {cropTypes.map((type) => (
                                            <option key={type} value={type} className="capitalize">
                                                {type}
                                            </option>
                                        ))}
                                    </Select>
                                    {errors.type && (
                                        <p className="text-sm text-red-600">{errors.type}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="field_location">Field Location *</Label>
                                <Input
                                    id="field_location"
                                    value={data.field_location}
                                    onChange={(e) => setData('field_location', e.target.value)}
                                    placeholder="e.g., North Field, Plot A, GPS coordinates"
                                    required
                                />
                                {errors.field_location && (
                                    <p className="text-sm text-red-600">{errors.field_location}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="planting_date">Planting Date *</Label>
                                    <Input
                                        id="planting_date"
                                        type="date"
                                        value={data.planting_date}
                                        onChange={(e) => setData('planting_date', e.target.value)}
                                        required
                                    />
                                    {errors.planting_date && (
                                        <p className="text-sm text-red-600">{errors.planting_date}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="expected_harvest_date">Expected Harvest Date *</Label>
                                    <Input
                                        id="expected_harvest_date"
                                        type="date"
                                        value={data.expected_harvest_date}
                                        onChange={(e) => setData('expected_harvest_date', e.target.value)}
                                        required
                                    />
                                    {errors.expected_harvest_date && (
                                        <p className="text-sm text-red-600">{errors.expected_harvest_date}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Initial Status</Label>
                                <Select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as 'planted' | 'seedling' | 'growing' | 'harvest_ready' | 'harvested')}
                                >
                                    <option value="planted">🌱 Planted</option>
                                    <option value="seedling">🌿 Seedling</option>
                                    <option value="growing">🌾 Growing</option>
                                    <option value="harvest_ready">🚜 Ready for Harvest</option>
                                    <option value="harvested">✅ Harvested</option>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes || ''}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Additional notes about this crop (optional)"
                                    rows={4}
                                />
                                {errors.notes && (
                                    <p className="text-sm text-red-600">{errors.notes}</p>
                                )}
                            </div>

                            <div className="flex items-center space-x-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    {processing ? '🌱 Creating...' : '🌱 Create Crop'}
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}