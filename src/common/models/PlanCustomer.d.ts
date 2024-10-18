export interface PlanCustomer {
   id: string;
   status: number;
   staticIp: string;
   mac: string;
   startDate: string;
   endDate: string;
   plan: {
      id: string;
      description: string;
      price: number;
      features: string;
   };
   customer: {
      id: string;
      name: string;
      document: string;
      email: string;
      phone: string;
      address: string;
      status: number;
   };
}
