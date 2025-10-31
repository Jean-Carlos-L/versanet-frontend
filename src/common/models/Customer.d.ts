export interface Customer {

    id: string;
    name: string;
    document: string;
    email: string;
    phone: string;
    address: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CustomerCreate {
    name: string;
    document: string;
    email: string;
    phone: string;
    address: string;
    status?: string;
}

export interface CustomerUpdate extends CustomerCreate {
    id: string;
}
