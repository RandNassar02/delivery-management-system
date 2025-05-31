export type Categories =
  | 'Indoor-Plants'
  | 'Outdoor-Plants'
  | 'Edible-Plants'
  | 'Gardening-Tools';

export interface Plants {
  id: number;
  name: string;
  category: Categories;
  price: number;
  image: string;
  description: string;
}
