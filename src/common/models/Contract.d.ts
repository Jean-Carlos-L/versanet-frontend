export interface Contract {
  id: string;
  customer_id: string; 
  plan_id: string;
  start_date: string; 
  end_date: string;
  inventory_id: string | null; 
  status: string;
  customer?: {
    id: string;
    name: string; 
    document: string; 
    email: string;
    phone: string;
    address: string;
    status: number;
  };
  plan?: {
    id: string;
    description: string;
    price: number;
    features: string; 
    durationMonths: number;
    status: number;
  };
  inventory?: {
    id: string;
    reference: string;
    network_address: string; 
    type: string; 
    status: number;
  };
  deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
export interface ContractCreate {
  customer_id: string; 
  plan_id: string;
  start_date: string;
  end_date: string;
  inventory_id: string | null; 
  status?: string; 
}

export interface ContractUpdate extends ContractCreate {
  id: string;
}
