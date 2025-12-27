
export const dummyCategories = [
    { id: 'cat_electronics', name: 'Electronics' },
    { id: 'cat_clothing', name: 'Clothing' },
    { id: 'cat_groceries', name: 'Groceries' },
    { id: 'cat_books', name: 'Books' }
];

export const dummyProducts = [
    {
        id: 'prod_1',
        name: 'Smartphone X',
        description: 'Latest model with high-res camera and fast processor.',
        price: 699.99,
        category_id: 'cat_electronics',
        stock: 50,
        image_url: 'https://placehold.co/600x400/png',
        popular: true,
        categories: { name: 'Electronics' }
    },
    {
        id: 'prod_2',
        name: 'Wireless Headphones',
        description: 'Noise cancelling over-ear headphones.',
        price: 199.99,
        category_id: 'cat_electronics',
        stock: 100,
        image_url: 'https://placehold.co/600x400/png',
        popular: false,
        categories: { name: 'Electronics' }
    },
    {
        id: 'prod_3',
        name: 'Cotton T-Shirt',
        description: '100% organic cotton, comfortable fit.',
        price: 24.99,
        category_id: 'cat_clothing',
        stock: 200,
        image_url: 'https://placehold.co/600x400/png',
        popular: true,
        categories: { name: 'Clothing' }
    },
    {
        id: 'prod_4',
        name: 'Denim Jeans',
        description: 'Classic fit blue jeans.',
        price: 49.99,
        category_id: 'cat_clothing',
        stock: 150,
        image_url: 'https://placehold.co/600x400/png',
        popular: false,
        categories: { name: 'Clothing' }
    },
    {
        id: 'prod_5',
        name: 'Organic Rice (5kg)',
        description: 'Premium quality basmati rice.',
        price: 15.99,
        category_id: 'cat_groceries',
        stock: 500,
        image_url: 'https://placehold.co/600x400/png',
        popular: true,
        categories: { name: 'Groceries' }
    },
    {
        id: 'prod_6',
        name: 'Sci-Fi Novel',
        description: 'Best-selling science fiction adventure.',
        price: 12.99,
        category_id: 'cat_books',
        stock: 80,
        image_url: 'https://placehold.co/600x400/png',
        popular: false,
        categories: { name: 'Books' }
    }
];
