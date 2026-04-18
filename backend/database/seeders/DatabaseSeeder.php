<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Review;
use App\Models\SiteSetting;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Category Mappings
        $categories = [
            ['name' => 'Oud', 'slug' => 'oud'],
            ['name' => 'Attar', 'slug' => 'attar'],
            ['name' => 'Signature', 'slug' => 'signature'],
            ['name' => 'Under 1500Rs', 'slug' => 'under1500'],
            ['name' => 'Tester Box', 'slug' => 'tester'],
            ['name' => 'Gift Box', 'slug' => 'giftbox'],
            ['name' => 'Main Loyalty', 'slug' => 'loyalty'],
        ];
        foreach ($categories as $cat) { Category::firstOrCreate(['slug' => $cat['slug']], $cat); }

        $products = [
            [
                'name' => 'Oud Mystique', 'type' => 'OUD', 'category' => 'oud', 'price' => 8500, 'rating' => 5,
                'image' => 'https://images.unsplash.com/photo-1590156546946-cb55d8d2315b?auto=format&fit=crop&q=80&w=400',
                'description' => 'A deeply enchanting blend of aged Cambodian Oud, intertwined with subtle hints of midnight leather and sweet saffron. Oud Mystique captivates the senses with its remarkably long-lasting sillage.'
            ],
            [
                'name' => 'Royal Agarwood', 'type' => 'OUD', 'category' => 'oud', 'price' => 10500, 'rating' => 4.9,
                'image' => 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=400',
                'description' => 'Distilled from the rarest agarwood trees, this majestic essence offers a warm, woody core accompanied by light citrus top notes.'
            ],
            [
                'name' => 'Sandalwood Rose', 'type' => 'ATTAR', 'category' => 'attar', 'price' => 3200, 'rating' => 4.8,
                'image' => 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400',
                'description' => 'The perfect marriage of velvety Taif roses and creamy Indian sandalwood. This concentrated attar unfolds beautifully on the skin.'
            ],
            [
                'name' => 'Musk Tahara', 'type' => 'ATTAR', 'category' => 'attar', 'price' => 2800, 'rating' => 4.7,
                'image' => 'https://images.unsplash.com/photo-1595532542520-21a473f32420?auto=format&fit=crop&q=80&w=400',
                'description' => 'Pure, clean, and beautifully innocent. Musk Tahara is a thick, luxurious white musk offering a soap-like freshness and powdery dry-down.'
            ],
            [
                'name' => 'Citrus Breeze', 'type' => 'UNDER 1500', 'category' => 'under1500', 'price' => 1400, 'rating' => 4.5,
                'image' => 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400',
                'description' => 'An uplifting burst of Sicilian lemon and crushed mint leaves. Citrus Breeze is your perfect summer companion.'
            ],
            [
                'name' => 'White Linen', 'type' => 'UNDER 1500', 'category' => 'under1500', 'price' => 1200, 'rating' => 4.2,
                'image' => 'https://images.unsplash.com/photo-1605369680376-795a973a4b95?auto=format&fit=crop&q=80&w=400',
                'description' => 'Minimalist and pure. White Linen captures the scent of freshly washed fabrics drying in a gentle breeze.'
            ],
            [
                'name' => 'Midnight Bloom', 'type' => 'SIGNATURE', 'category' => 'signature', 'price' => 12000, 'rating' => 4.9,
                'image' => 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=400',
                'description' => 'Our most sought-after signature blend. Midnight Bloom combines night-blooming jasmine, dark vanilla bean, and a touch of black pepper.'
            ],
            [
                'name' => 'Amber Wood', 'type' => 'SIGNATURE', 'category' => 'signature', 'price' => 14000, 'rating' => 5.0,
                'image' => 'https://images.unsplash.com/photo-1590156546946-cb55d8d2315b?auto=format&fit=crop&q=80&w=400',
                'description' => 'A deeply resinous and bold composition. Rich golden amber melts into cedarwood and smoked patchouli.'
            ],
            [
                'name' => 'Tester Collection', 'type' => 'TESTER BOX', 'category' => 'tester', 'price' => 4000, 'rating' => 4.6,
                'image' => 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400',
                'description' => 'Not sure which scent suits you best? The Tester Collection features 5 curated mini-bottles of our top sellers.'
            ],
            [
                'name' => 'Luxury Gift Set', 'type' => 'GIFT BOX', 'category' => 'giftbox', 'price' => 25000, 'rating' => 5.0,
                'image' => 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400',
                'description' => 'The ultimate gesture of appreciation. Encased in a velvety mahogany box, this set contains our three finest Extraits de Parfum.'
            ],
            [
                'name' => 'Loyalty Exclusive', 'type' => 'MAIN LOYALTY', 'category' => 'loyalty', 'price' => 8000, 'rating' => 4.7,
                'image' => 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=400',
                'description' => 'A special reserve created exclusively for our most dedicated patrons. Notes of vintage bergamot, tobacco leaf, and tonka bean swirl together.'
            ]
        ];

        foreach ($products as $p) {
            $p['slug'] = Str::slug($p['name']);
            Product::firstOrCreate(['slug' => $p['slug']], $p);
        }

        // Add verified reviews from React site
        $prod1 = Product::where('slug', 'midnight-bloom')->first();
        if($prod1) Review::firstOrCreate(['product_id' => $prod1->id], ['author'=>'Ayesha K.', 'rating'=>5, 'content'=>'The lasting power of their signature collection is unbelievable. Pure luxury.']);
        
        // Add Site Settings
        SiteSetting::firstOrCreate(['key' => 'privacy_policy'], ['type' => 'html', 'value' => '<h2>Privacy Policy</h2><p>Your data is completely secure with Lumière. We do not sell or share customer data.</p>']);
        SiteSetting::firstOrCreate(['key' => 'shipping_policy'], ['type' => 'html', 'value' => '<h2>Shipping Policy</h2><p>Free standard shipping on all orders over Rs. 5000.</p>']);
    }
}
