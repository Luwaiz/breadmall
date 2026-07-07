export const breadProducts = [
  {
    id: 'milk-bread',
    name: 'Milk Bread',
    description: 'A soft, fluffy classic loved for breakfast, tea time, and everyday comfort.',
    badge: 'Customer favorite',
    price: 2500,
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'butter-bread',
    name: 'Butter Bread',
    description: 'Rich, tender, and buttery with a gently golden crust that melts into every bite.',
    badge: 'Fresh today',
    price: 2800,
    image:
      'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'coconut-bread',
    name: 'Coconut Bread',
    description: 'A sweet, fragrant loaf with a lovely coconut finish for a premium treat.',
    badge: 'Special bake',
    price: 3000,
    image:
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'bread-rolls',
    name: 'Bread Rolls',
    description: 'Soft rolls baked for sandwiches, soups, and warm family meals.',
    badge: 'Family pack',
    price: 2200,
    image:
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'premium-pack',
    name: 'Premium Pack Bread',
    description: 'A carefully baked loaf for gatherings, gifts, and everyday indulgence.',
    badge: 'Premium pick',
    price: 3200,
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'fruit-bread',
    name: 'Fruit Bread',
    description: 'Loaded with fruit and warm spice for a wholesome, satisfying loaf.',
    badge: 'Weekend favorite',
    price: 2900,
    image:
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'cinnamon-bread',
    name: 'Cinnamon Bread',
    description: 'Soft, fragrant, and gently spiced for a cozy breakfast or tea-time treat.',
    badge: 'Morning favorite',
    price: 2700,
    image:
      'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'wheat-bread',
    name: 'Wheat Bread',
    description: 'A wholesome loaf with a hearty texture and rich everyday appeal.',
    badge: 'Healthy choice',
    price: 2600,
    image:
      'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'our-dough',
    name: 'Our Dough',
    description: 'Freshly prepared dough for family meals, baking at home, or special occasions.',
    badge: 'Freshly prepared',
    price: 1800,
    image:
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=80',
  },
]

export const defaultOrderForm = {
  name: '',
  phone: '',
  address: '',
  method: 'pickup',
  note: '',
}

export const formatCurrency = (value) => `₦${value.toLocaleString()}`
