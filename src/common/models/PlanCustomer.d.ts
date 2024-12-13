export interface PlanCustomer {
   id: string;
   status: number;
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
   inventoryMac: {
      id: string;
      reference: string;
      mac: string;
      ip: string;
      type: string;
      status: number;
   }
   inventoryRouter: {
      id: string;
      reference: string;
      mac: string;
      ip: string;
      type: string;
      status: number;
   }
}

export interface PlanCustomerCreate {
   status: number;
   startDate: string;
   endDate: string;
   plan: {
      id: string;
   };
   customer: {
      id: string;
   };
   inventoryMac:{
      id: string;
   }
   inventoryRouter:{
      id: string;
   }
}

export interface PlanCustomerUpdate extends PlanCustomerCreate {
   id: string;
}