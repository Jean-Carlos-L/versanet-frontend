import { Contract } from "@/common/models/Contract";

const toNumberStatus = (val: any) => {
    if (val === undefined || val === null) return 0;
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
        if (/^\d+$/.test(val)) return Number(val);
        return val.toLowerCase() === 'activo' ? 1 : 0;
    }
    return 0;
};

export const contractAdapter = (contractData: any): Contract => {
    const planPrice = contractData?.plan?.price != null ? parseFloat(String(contractData.plan.price)) : 0;
    const planStatus = toNumberStatus(contractData?.plan?.status);
    const customerStatus = toNumberStatus(contractData?.customer?.status);
    const inventoryStatus = toNumberStatus(contractData?.inventory?.status);

    return {
        id: contractData.id,
        customer_id: contractData.customer_id,
        plan_id: contractData.plan_id,
        start_date: contractData.start_date,
        end_date: contractData.end_date,
        inventory_id: contractData.inventory_id,
        status: String(contractData.status),
        customer: contractData.customer ? {
            id: contractData.customer.id,
            name: contractData.customer.name,
            document: contractData.customer.document,
            email: contractData.customer.email,
            phone: contractData.customer.phone,
            address: contractData.customer.address,
            status: customerStatus,
        } : undefined,
        plan: contractData.plan ? {
            id: contractData.plan.id,
            description: contractData.plan.description,
            price: isNaN(planPrice) ? 0 : planPrice,
            features: contractData.plan.features,
            durationMonths: contractData.plan.durationMonths,
            status: planStatus,
        } : undefined,
        inventory: contractData.inventory ? {
            id: contractData.inventory.id,
            reference: contractData.inventory.reference,
            network_address: contractData.inventory.network_address,
            type: contractData.inventory.type,
            status: inventoryStatus,
        } : undefined,
        deleted: !!(contractData.deleted || contractData.eliminado),
        createdAt: contractData.createdAt,
        updatedAt: contractData.updatedAt,
    };
};
