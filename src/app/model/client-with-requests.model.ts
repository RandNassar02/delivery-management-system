import { Client } from './client.model';
import { Request } from './request.model';

export interface ClientWithRequests extends Client {
  requests: Request[];
}
