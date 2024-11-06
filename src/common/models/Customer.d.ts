export interface Customer {

    id: string;
    names: string;
    cedula: string;
    email: string;
    phone: string;
    address: string;
    status: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CustomerCreate {
    names: string;
    cedula: string;
    email: string;
    phone: string;
    address: string;
    status?: number;
}

export interface CustomerUpdate extends CustomerCreate {
    id: string;
}
