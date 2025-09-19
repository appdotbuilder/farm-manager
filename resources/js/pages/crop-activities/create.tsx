import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Crop } from '@/types/crops';

interface Props {
    crop: Crop;
    [key: string]: unknown;
}

export default function CreateCropActivity({ crop }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        activity_date: new Date().toISOString().split('T')[0],
        activity_type: 'irrigation',
        description: '',
        quantity: '',
        unit: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('crop-activities.store', crop.id));
    };

    const activityTypes = [
        { value: 'irrigation', label: '💧 Irrigation', description: 'Watering activities' },
        { value: 'fertilization', label: '🌱 Fertilization', description: 'Fertilizer application' },
        { value: 'pest_control', label: '🐛 Pest Control', description: 'Pesticide or pest management' },
        { value: 'scouting', label: '👀 Scouting', description: 'Field monitoring and observation' },
        { value: 'weeding', label: '🌿 Weeding', description: 'Weed control activities' },
        { value: 'harvesting', label: '🚜 Harvesting', description: 'Harvest activities' },
        { value: 'other', label: '📋 Other', description: 'Other farming activities' },
    ];

    const commonUnits = ['kg', 'lbs', 'liters', 'gallons', 'hours', 'acres', 'hectares', 'tons'];

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📝 Add Activity</h1>
                    <p className="text-gray-600 mt-1">
                        Record a new activity for <strong>{crop.name}</strong>
                    </p>
                </div>

                {/* Crop Info Card */}
                <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-medium text-green-900">{crop.name}</h3>
                                <p className="text-sm text-green-700">
                                    {crop.type} • {crop.field_location}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-green-700">Status</p>
                                <p className="font-medium text-green-900 capitalize">
                                    {crop.status.replace('_', ' ')}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Activity Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="activity_date">Activity Date *</Label>
                                    <Input
                                        id="activity_date"
                                        type="date"
                                        value={data.activity_date}
                                        onChange={(e) => setData('activity_date', e.target.value)}
                                        required
                                    />
                                    {errors.activity_date && (
                                        <p className="text-sm text-red-600">{errors.activity_date}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="activity_type">Activity Type *</Label>
                                    <Select
                                        id="activity_type"
                                        value={data.activity_type}
                                        onChange={(e) => setData('activity_type', e.target.value as 'irrigation' | 'fertilization' | 'pest_control' | 'scouting' | 'weeding' | 'harvesting' | 'other')}
                                        required
                                    >
                                        {activityTypes.map((type) => (
                                            <option key={type.value} value={type.value}>
                                                {type.label}
                                            </option>
                                        ))}
                                    </Select>
                                    {errors.activity_type && (
                                        <p className="text-sm text-red-600">{errors.activity_type}</p>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        {activityTypes.find(t => t.value === data.activity_type)?.description}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Describe the activity performed..."
                                    rows={4}
                                    required
                                />
                                {errors.description && (
                                    <p className="text-sm text-red-600">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantity (Optional)</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        step="0.01"
                                        value={data.quantity || ''}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        placeholder="e.g., 25.5"
                                    />
                                    {errors.quantity && (
                                        <p className="text-sm text-red-600">{errors.quantity}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="unit">Unit (Optional)</Label>
                                    <Select
                                        id="unit"
                                        value={data.unit || ''}
                                        onChange={(e) => setData('unit', e.target.value)}
                                    >
                                        <option value="">Select unit</option>
                                        {commonUnits.map((unit) => (
                                            <option key={unit} value={unit}>
                                                {unit}
                                            </option>
                                        ))}
                                        <option value="other">Other (specify in description)</option>
                                    </Select>
                                    {errors.unit && (
                                        <p className="text-sm text-red-600">{errors.unit}</p>
                                    )}
                                </div>
                            </div>

                            {/* Activity Type Specific Hints */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h4 className="font-medium text-blue-900 mb-2">
                                    Tips for {activityTypes.find(t => t.value === data.activity_type)?.label}
                                </h4>
                                <div className="text-sm text-blue-800">
                                    {data.activity_type === 'irrigation' && (
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Record water amount in liters or gallons</li>
                                            <li>Note irrigation method (drip, sprinkler, flood)</li>
                                            <li>Include duration if relevant</li>
                                        </ul>
                                    )}
                                    {data.activity_type === 'fertilization' && (
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Specify fertilizer type (NPK, organic, etc.)</li>
                                            <li>Record application rate in kg or lbs</li>
                                            <li>Note application method</li>
                                        </ul>
                                    )}
                                    {data.activity_type === 'pest_control' && (
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Identify target pest or disease</li>
                                            <li>Record product name and rate</li>
                                            <li>Note weather conditions</li>
                                        </ul>
                                    )}
                                    {data.activity_type === 'scouting' && (
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Note crop condition and growth stage</li>
                                            <li>Record any issues observed</li>
                                            <li>Include photos if taken</li>
                                        </ul>
                                    )}
                                    {(data.activity_type === 'weeding' || data.activity_type === 'harvesting' || data.activity_type === 'other') && (
                                        <p>Provide detailed description of the activity performed.</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    {processing ? '📝 Recording...' : '📝 Record Activity'}
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