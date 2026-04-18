<?php

namespace App\Filament\Widgets;

use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\ContactMessage;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::count())
                ->description('Registered accounts')
                ->descriptionIcon('heroicon-m-users')
                ->color('success')
                ->chart([7, 2, 10, 3, 15, 4, 17]),
                
            Stat::make('Active Products', Product::count())
                ->description('In-store catalog')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('primary')
                ->chart([11, 11, 11, 11, 11, 11, 11]),
                
            Stat::make('Unread Inquiries', ContactMessage::where('is_read', false)->count())
                ->description('Recent messages')
                ->descriptionIcon('heroicon-m-envelope')
                ->color('warning'),
        ];
    }
}
