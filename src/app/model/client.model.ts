export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  bankName: string;
  bankAccount: string;
  address: string;
  approvalStatus: ApprovalStatus;
}
