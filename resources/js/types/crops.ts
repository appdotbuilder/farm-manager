export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'farmer';
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
}

export interface Crop {
    id: number;
    name: string;
    type: string;
    planting_date: string;
    expected_harvest_date: string;
    field_location: string;
    status: 'planted' | 'seedling' | 'growing' | 'harvest_ready' | 'harvested';
    notes?: string;
    user_id: number;
    user?: User;
    activities?: CropActivity[];
    created_at: string;
    updated_at: string;
}

export interface CropActivity {
    id: number;
    crop_id: number;
    crop?: Crop;
    activity_date: string;
    activity_type: 'irrigation' | 'fertilization' | 'pest_control' | 'scouting' | 'weeding' | 'harvesting' | 'other';
    description: string;
    quantity?: number;
    unit?: string;
    created_at: string;
    updated_at: string;
}

export interface CropFormData {
    name: string;
    type: string;
    planting_date: string;
    expected_harvest_date: string;
    field_location: string;
    status: 'planted' | 'seedling' | 'growing' | 'harvest_ready' | 'harvested';
    notes?: string;
}

export interface CropActivityFormData {
    activity_date: string;
    activity_type: 'irrigation' | 'fertilization' | 'pest_control' | 'scouting' | 'weeding' | 'harvesting' | 'other';
    description: string;
    quantity?: number;
    unit?: string;
}

export interface DashboardStats {
    totalCrops: number;
    activeCrops: number;
    readyForHarvest: number;
    totalActivities: number;
}