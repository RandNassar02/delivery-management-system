import { Plants } from './plant.model';

export type DeliveryStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled';
export type PaymentStatus = 'paid' | 'unpaid';

export interface DeliveryRequest {
  id: number;
  deliveryDetails: string;
  date: string;
  customerId: number;
  deliveryStatus: DeliveryStatus;
  driverId: number;
  paymentStatus: PaymentStatus;
  paymentAmount: number;
  plant: Plants[];
}
