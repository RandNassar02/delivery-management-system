export type gategories =
  | 'Indoor Plants'
  | 'Outdoor Plants'
  | 'Edible Plants'
  | 'Gardening Tools';

export interface Plants {
  id: number;
  name: string;
  gategory: gategories;
  price: number;
  image: string;
  description: string;
}
