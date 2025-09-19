import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { auth } = usePage<{ auth: { user: { name: string; role: string } } }>().props;
    const user = auth?.user;

    const navigation = [
        { name: '🏠 Dashboard', href: route('dashboard') },
        { name: '🌾 Crops', href: route('crops.index') },
    ];

    if (!user) {
        return <div className="min-h-screen bg-gray-100">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center">
                                <Link href={route('dashboard')} className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">🌾</span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-900">CropManager</span>
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-gray-700">
                                Welcome, <strong>{user.name}</strong>
                                {user.role === 'admin' && (
                                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        Admin
                                    </span>
                                )}
                            </div>
                            <Link href={route('logout')} method="post" as="button">
                                <Button variant="outline" size="sm">
                                    Logout
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <div className="sm:hidden bg-white border-b shadow-sm">
                <div className="pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}