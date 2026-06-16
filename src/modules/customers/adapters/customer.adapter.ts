import {Customer} from '@/common/models/Customer';

export const customerAdapter = (data): Customer => {
    return {
        id: data.id,
        name: data.name,
        document: data.document,
        email: data.email,
        phone: data.phone,
        address: data.address,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
}
