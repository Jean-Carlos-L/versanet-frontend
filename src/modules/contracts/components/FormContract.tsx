import Button from "@/common/components/Button";
import Select from "@/common/components/Select";
import { ContractCreate, ContractUpdate } from "@/common/models/Contract";
import { usePlansQuery } from "@/modules/plans/hooks/usePlansQuery"; // Reusa si existe
import { useCustomersQuery } from "@/modules/customers/hooks/useCustomersQuery";
import { useInventoryQuery } from "@/modules/inventory/hooks/useInventoryQuery";
import { useFiltersContracts } from "../hooks/useFiltersContracts"; // Para filtrar inventario disponible
import { useContractsCommand } from "../hooks/useContractsCommand";

interface FormContractProps {
  contract: ContractCreate | ContractUpdate;
  loading?: boolean;
  onSubmit: () => void;
  onChange: (contract: ContractCreate | ContractUpdate) => void;
}

function FormContract({ contract, loading, onSubmit, onChange }: FormContractProps) {
  const { customers } = useCustomersQuery();
  const { plans } = usePlansQuery();
  const { validations, errors } = useContractsCommand();
  const { filters: inventoryFilters } = useFiltersContracts(); // Filtra por status=0
  const { inventories } = useInventoryQuery({ ...inventoryFilters, status: 0 } as any); // Solo disponibles

  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...contract, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    onChange({ ...contract, [name]: { id: value } });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { hasErrors } = validations(contract);
    if (!hasErrors && !loading) onSubmit();
  };

  const availableAntennas = inventories.filter(inv => inv.type === "2"); 
  const availableRouters = inventories.filter(inv => inv.type === "1"); 
  const availableOthers = inventories.filter(inv => inv.type !== "1" && inv.type !== "2");

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md max-w-lg mx-auto">
      <Select
        label="Cliente"
        name="Customer_id"
        options={customers.map(c => ({ value: c.id, label: `${c.name} (${c.document})` }))}
        value={contract.customer_id}
        onChange={e => handleSelectChange('customer_id', e.target.value)}
        error={errors.customer_id}
      />
      <Select
        label="Plan"
        name="plan_id"
        options={plans.map(p => ({ value: p.id, label: p.description }))}
        value={contract.plan_id}
        onChange={e => handleSelectChange('plan_id', e.target.value)}
        error={errors.plan_id}
      />
      <Select
        label="Antena (MAC)"
        name="equipo_id_antena"
        options={availableAntennas.map(inv => ({ value: inv.id, label: inv.network_address || inv.mac }))}
        value={contract.inventory_id || ''} // Asume selección única, o maneja múltiples si backend soporta
        onChange={e => handleSelectChange('inventory_id', e.target.value)} // Usa inventory_id genérico
      />
      <Select
        label="Router"
        name="inventory_id_router"
        options={availableRouters.map(inv => ({ value: inv.id, label: inv.reference }))}
        value={contract.inventory_id || ''}
        onChange={e => handleSelectChange('inventory_id', e.target.value)}
      />
      <Select
        label="Otros Equipos"
        name="inventory_id_other"
        options={availableOthers.map(inv => ({ value: inv.id, label: inv.reference }))}
        value={contract.inventory_id || ''}
        onChange={e => handleSelectChange('inventory_id', e.target.value)}
      />
      {/* Nota: Si backend solo permite un equipo_id, usa radio o toggle para elegir tipo, y set equipo_id accordingly */}
      <div className="flex flex-col gap-2">
        <label htmlFor="start_date">Fecha de inicio</label>
        <input
          type="date"
          id="start_date"
          name="start_date"
          value={contract.start_date}
          onChange={handleChangeText}
          className={`input input-bordered ${errors.start_date ? "input-error" : ""}`}
        />
        {errors.start_date && <span className="text-error">{errors.start_date}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="end_date">Fecha de fin</label>
        <input
          type="date"
          id="end_date"
          name="end_date"
          value={contract.end_date}
          onChange={handleChangeText}
          className={`input input-bordered ${errors.end_date ? "input-error" : ""}`}
        />
        {errors.end_date && <span className="text-error">{errors.end_date}</span>}
      </div>
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</Button>
      </div>
    </form>
  );
}

export default FormContract;
