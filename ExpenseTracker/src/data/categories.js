export const CATEGORIES = [
  {
    id: 'alimentacion',
    name: 'Alimentación',
    color: '#27AE60',
    icon: 'cart-outline',
  },
  {
    id: 'transporte',
    name: 'Transporte',
    color: '#E67E22',
    icon: 'car-outline',
  },
  {
    id: 'servicios',
    name: 'Servicios',
    color: '#2980B9',
    icon: 'wifi-outline',
  },
  {
    id: 'entretenimiento',
    name: 'Entretenimiento',
    color: '#8E44AD',
    icon: 'film-outline',
  },
  {
    id: 'otros',
    name: 'Otros',
    color: '#7F8C8D',
    icon: 'pricetag-outline',
  },
];

export function getCategoryByName(categoryName) {
  return (
    CATEGORIES.find(
      (cat) => cat.name.toLowerCase() === String(categoryName || '').toLowerCase()
    ) || CATEGORIES[CATEGORIES.length - 1]
  );
}
