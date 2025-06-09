export interface Payment {
  amount: number;
  method: string;
  date: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  payments?: Payment[];
}
