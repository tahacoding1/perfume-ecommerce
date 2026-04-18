<?php

namespace App\Filament\Widgets;

use Filament\Widgets\ChartWidget;

class SessionsLineChart extends ChartWidget
{
    protected ?string $heading = 'Total Sessions';
    protected static ?int $sort = 4;
    protected int | string | array $columnSpan = 1;

    protected function getData(): array
    {
        return [
            'datasets' => [
                [
                    'label' => 'Sessions',
                    'data' => [50, 80, 60, 120, 90, 150, 110, 180, 140, 260, 190, 310],
                    'borderColor' => '#8b5cf6', // Indigo/Purple
                    'backgroundColor' => 'transparent',
                    'tension' => 0.4,
                ],
            ],
            'labels' => ['12 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM'],
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
