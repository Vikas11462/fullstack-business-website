
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf8');
    envConfig.split('\n').forEach((line) => {
        const [key, value] = line.split('=');
        if (key && value) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedData() {
    console.log('Starting seed process...');

    // 1. Categories
    const categories = [
        { name: 'Electronics' },
        { name: 'Clothing' },
        { name: 'Groceries' },
        { name: 'Books' }
    ];

    console.log('Seeding categories...');
    const { data: insertedCategories, error: catError } = await supabase
        .from('categories')
        .upsert(categories, { onConflict: 'name' })
        .select();

    if (catError) {
        console.error('Error seeding categories:', catError);
        return;
    }

    console.log(`Seeded ${insertedCategories.length} categories.`);

    // Map category names to IDs
    const categoryMap = {};
    insertedCategories.forEach((cat) => {
        categoryMap[cat.name] = cat.id;
    });

    // 2. Products
    const products = [
        {
            name: 'Smartphone X',
            description: 'Latest model with high-res camera and fast processor.',
            price: 699.99,
            category_id: categoryMap['Electronics'],
            stock: 50,
            image_url: 'https://placehold.co/600x400/png',
            popular: true
        },
        {
            name: 'Wireless Headphones',
            description: 'Noise cancelling over-ear headphones.',
            price: 199.99,
            category_id: categoryMap['Electronics'],
            stock: 100,
            image_url: 'https://placehold.co/600x400/png',
            popular: false
        },
        {
            name: 'Cotton T-Shirt',
            description: '100% organic cotton, comfortable fit.',
            price: 24.99,
            category_id: categoryMap['Clothing'],
            stock: 200,
            image_url: 'https://placehold.co/600x400/png',
            popular: true
        },
        {
            name: 'Denim Jeans',
            description: 'Classic fit blue jeans.',
            price: 49.99,
            category_id: categoryMap['Clothing'],
            stock: 150,
            image_url: 'https://placehold.co/600x400/png',
            popular: false
        },
        {
            name: 'Organic Rice (5kg)',
            description: 'Premium quality basmati rice.',
            price: 15.99,
            category_id: categoryMap['Groceries'],
            stock: 500,
            image_url: 'https://placehold.co/600x400/png',
            popular: true
        },
        {
            name: 'Sci-Fi Novel',
            description: 'Best-selling science fiction adventure.',
            price: 12.99,
            category_id: categoryMap['Books'],
            stock: 80,
            image_url: 'https://placehold.co/600x400/png',
            popular: false
        }
    ];

    console.log('Seeding products...');

    for (const product of products) {
        const { data: existing } = await supabase
            .from('products')
            .select('id')
            .eq('name', product.name)
            .single();

        if (!existing) {
            const { error: prodError } = await supabase
                .from('products')
                .insert([product]);

            if (prodError) {
                console.error(`Error inserting ${product.name}:`, prodError.message);
            } else {
                console.log(`Inserted ${product.name}`);
            }
        } else {
            console.log(`Skipping ${product.name} (already exists)`);
        }
    }

    console.log('Seeding completed.');
}

seedData();
