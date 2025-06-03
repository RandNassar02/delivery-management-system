export interface Driver {
  id: number;
  name: string;
  licenseNumber: string;
  phoneNumber: string;
  email?: string;
  vehicleId?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}


