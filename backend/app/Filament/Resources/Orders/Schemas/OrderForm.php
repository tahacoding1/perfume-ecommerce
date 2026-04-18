<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('user_id')
                    ->required()
                    ->numeric(),
                TextInput::make('total_price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                \Filament\Forms\Components\Select::make('status')
                    ->options([
                        'pending' => 'Pending',
                        'processing' => 'Processing',
                        'shipped' => 'Shipped',
                        'delivered' => 'Delivered',
                        'cancelled' => 'Cancelled',
                    ])
                    ->required()
                    ->default('pending'),
                TextInput::make('tracking_number')
                    ->label('Tracking Number')
                    ->maxLength(255),
                Textarea::make('admin_notes')
                    ->label('Admin Notes')
                    ->columnSpanFull(),
                Textarea::make('shipping_address')
                    ->required()
                    ->columnSpanFull(),
                TextInput::make('payment_method')
                    ->required(),
            ]);
    }
}
