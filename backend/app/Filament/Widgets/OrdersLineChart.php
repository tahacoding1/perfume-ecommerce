<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class OrdersLineChart extends ChartWidget
{
    protected ?string $heading = 'Revenue vs Expenses (Mock)';
    protected static ?int $sort = 2;
    protected int | string | array $columnSpan = 2;

    protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Revenue',
                    'data' => [43, 65, 59, 80, 102, 125, 140, 160, 200, 210, 190, 240],
                    'borderColor' => '#8a1c3b', // Burgundy
                    'backgroundColor' => 'rgba(138, 28, 59, 0.1)',
                    'fill' => true,
                    'tension' => 0.4,
                ],
                [
                    'label' => 'Expenses',
                    'data' => [20, 45, 30, 40, 52, 60, 80, 70, 95, 110, 100, 130],
                    'borderColor' => '#3b82f6', // Info blue
                    'backgroundColor' => 'rgba(59, 130, 246, 0.1)',
                    'fill' => true,
                    'tension' => 0.4,
                ],
            ],
            'labels' => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
