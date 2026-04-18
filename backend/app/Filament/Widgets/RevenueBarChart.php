<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class RevenueBarChart extends ChartWidget
{
    protected ?string $heading = 'Total Profit';
    protected static ?int $sort = 3;
    protected int | string | array $columnSpan = 1;

    protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Profit ($)',
                    'data' => [25, 45, 60, 30, 80, 50, 90, 70, 110, 95, 130, 144], 
                    'backgroundColor' => '#10b981', // Emerald/Green
                    'borderRadius' => 4,
                ],
            ],
            'labels' => ['12 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
