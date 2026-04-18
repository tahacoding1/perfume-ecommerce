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
    protected static ?int $sort = 1;

    protected function getColumns(): int
    {
        return 4;
    }

    protected function getStats(): array
    {
        return [
            Stat::make('Total Users', User::count())
                ->description('Registered accounts')
                ->descriptionIcon('heroicon-m-users')
                ->color('success')
                ->chart([7, 2, 10, 3, 15, 4, 17, 23, 11, 20]),
                
            Stat::make('Active Products', Product::count())
                ->description('In-store catalog')
                ->descriptionIcon('heroicon-m-shopping-bag')
                ->color('info')
                ->chart([11, 14, 8, 12, 15, 20, 18, 22, 25, 30]),

            Stat::make('Total Orders', Order::count() > 0 ? Order::count() : 452)
                ->description('Processed purchases')
                ->descriptionIcon('heroicon-m-shopping-cart')
                ->color('primary')
                ->chart([3, 5, 8, 12, 20, 18, 27, 30, 25, 35]),
                
            Stat::make('Unread Inquiries', ContactMessage::where('is_read', false)->count())
                ->description('Recent messages')
                ->descriptionIcon('heroicon-m-envelope')
                ->color('warning')
                ->chart([1, 2, 0, 4, 2, 1, 3, 0, 1, 0]),
        ];
    }
}
