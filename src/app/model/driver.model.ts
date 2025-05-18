export type VehicleType = 'Car' | 'Motorcycle';

export interface Driver {
  id: number;
  name: string;
  vehicleType: VehicleType;
  modelName: string;
}
