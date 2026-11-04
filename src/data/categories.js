// Top-level marketplace taxonomy. `art` maps to a ProductArt kind used for shortcut tiles.
export const categories = [
  { slug: 'mobiles', name: 'Mobiles', art: 'phone', tint: '#E8EEF6', subs: ['Smartphones', 'Foldables', 'Feature phones', 'Cases & covers', 'Chargers'] },
  { slug: 'electronics', name: 'Electronics', art: 'headphones', tint: '#ECEAF5', subs: ['Headphones', 'Earbuds', 'Speakers', 'Smartwatches', 'Cameras'] },
  { slug: 'laptops', name: 'Laptops', art: 'laptop', tint: '#E9EDF0', subs: ['Thin & light', 'Gaming laptops', 'Business', 'Chromebooks', 'Tablets'] },
  { slug: 'tvs', name: 'TVs', art: 'tv', tint: '#E6E9EE', subs: ['OLED', 'QLED & Neo QLED', '4K LED', 'Projectors', 'Soundbars'] },
  { slug: 'gaming', name: 'Gaming', art: 'console', tint: '#E9E6F2', subs: ['Consoles', 'Controllers', 'Games', 'Gaming headsets', 'Accessories'] },
  { slug: 'fashion', name: 'Fashion', art: 'tshirt', tint: '#F3ECE6', subs: ['Men', 'Women', 'Kids', 'Ethnic wear', 'Winter wear'] },
  { slug: 'footwear', name: 'Footwear', art: 'shoe', tint: '#F1ECE4', subs: ['Running', 'Sneakers', 'Sandals', 'Formal', 'Sports'] },
  { slug: 'beauty', name: 'Beauty', art: 'serum', tint: '#F5E9E8', subs: ['Skincare', 'Makeup', 'Fragrance', 'Haircare', 'Grooming'] },
  { slug: 'home', name: 'Home', art: 'lamp', tint: '#EFEDE5', subs: ['Decor', 'Lighting', 'Bedding', 'Bath', 'Storage'] },
  { slug: 'furniture', name: 'Furniture', art: 'chair', tint: '#F0EAE2', subs: ['Office chairs', 'Sofas', 'Beds', 'Tables', 'Shelves'] },
  { slug: 'kitchen', name: 'Kitchen', art: 'cookware', tint: '#EEEBE6', subs: ['Cookware', 'Mixers', 'Kettles', 'Air fryers', 'Dinnerware'] },
  { slug: 'appliances', name: 'Appliances', art: 'fridge', tint: '#E8ECEC', subs: ['Refrigerators', 'Washing machines', 'Air conditioners', 'Microwaves', 'Vacuum cleaners'] },
  { slug: 'grocery', name: 'Grocery', art: 'coffee', tint: '#EEF1E6', subs: ['Staples', 'Beverages', 'Snacks', 'Breakfast', 'Household'] },
  { slug: 'sports', name: 'Sports', art: 'dumbbell', tint: '#E7EFEA', subs: ['Fitness', 'Cricket', 'Football', 'Cycling', 'Yoga'] },
  { slug: 'books', name: 'Books', art: 'book', tint: '#F2EDE3', subs: ['Fiction', 'Business', 'Self-help', 'Children', 'Exam prep'] },
  { slug: 'toys', name: 'Toys', art: 'blocks', tint: '#F5EEE0', subs: ['Building sets', 'Remote control', 'Board games', 'Soft toys', 'Learning'] },
  { slug: 'baby', name: 'Baby', art: 'bottle', tint: '#EAF0F3', subs: ['Diapers', 'Feeding', 'Strollers', 'Baby care', 'Clothing'] },
  { slug: 'automotive', name: 'Automotive', art: 'helmet', tint: '#E9EAEA', subs: ['Helmets', 'Car care', 'Tyres', 'Car electronics', 'Bike accessories'] },
  { slug: 'travel', name: 'Travel', art: 'suitcase', tint: '#E9EEF0', subs: ['Suitcases', 'Backpacks', 'Duffels', 'Travel accessories'] },
  { slug: 'pets', name: 'Pet Supplies', art: 'petfood', tint: '#F1EEE4', subs: ['Dog food', 'Cat food', 'Toys', 'Grooming', 'Beds'] },
]

export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]))
