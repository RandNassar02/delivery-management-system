export interface Hussein {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  bankName: string;
  bankAccount: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
}
