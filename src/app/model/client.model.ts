export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Client {
  id: string;
  userId: number;
  username: string;
  email: string;
  phone: string;
  bankName: string;
  bankAccount: string;
  address: string;
  approvalStatus: ApprovalStatus;
}
