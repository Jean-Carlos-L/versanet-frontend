import {Customer} from '@/common/models/Customer';

export const customerAdapter = (data): Customer => {
    return {
        id: data.id,
        names: data.names,
        cedula: data.cedula,
        email: data.email,
        phone: data.phone,
        address: data.address,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
}
