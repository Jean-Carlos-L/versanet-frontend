import Button from "@/common/components/Button";
import Select from "@/common/components/Select";
import { ContractCreate, ContractUpdate } from "@/common/models/Contract";
import { usePlansQuery } from "@/modules/plans/hooks/usePlansQuery"; // Reusa si existe
import { useCustomersQuery } from "@/modules/customers/hooks/useCustomersQuery";
import { useInventoryQuery } from "@/modules/inventory/hooks/useInventoryQuery";
import { useFiltersContracts } from "../hooks/useFiltersContracts"; // Para filtrar inventario disponible
import { useContractsCommand } from "../hooks/useContractsCommand";
import Textfield from "@/common/components/Textfield";

interface FormContractProps {
  contract: ContractCreate | ContractUpdate;
  loading?: boolean;
  onSubmit: () => void;
  onChange: (key: string, value: any) => void;
}

function FormContract({
  contract,
  loading,
  onSubmit,
  onChange,
}: FormContractProps) {
  const { customers } = useCustomersQuery();
  const { plans } = usePlansQuery();
  const { validations, errors } = useContractsCommand();
  const { filters: inventoryFilters } = useFiltersContracts(); // Filtra por status=0
  const { inventories } = useInventoryQuery({
    ...inventoryFilters,
    status: "activo",
  } as any); // Solo disponibles

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { hasErrors } = validations(contract);
    if (!hasErrors && !loading) onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <Select
        label="Cliente"
        name="customer_id"
        options={customers.map((c) => ({
          value: c.id,
          label: `${c.name} (${c.document})`,
        }))}
        value={contract.customer_id}
        onChange={(e) => handleChange(e)}
        error={errors.customer_id}
      />
      <Select
        label="Plan"
        name="plan_id"
        options={plans.map((p) => ({ value: p.id, label: p.description }))}
        value={contract.plan_id}
        onChange={(e) => handleChange(e)}
        error={errors.plan_id}
      />
      <Select
        label="Equipo"
        name="inventory_id"
        options={inventories.map((inv) => ({
          value: inv.id,
          label: inv.reference,
        }))}
        value={contract.inventory_id || ""}
        onChange={(e) => handleChange(e)}
      />
      <Textfield
        label="Fecha de inicio"
        type="date"
        name="start_date"
        value={contract.start_date}
        onChange={handleChange}
        error={errors.start_date}
        placeholder="YYYY-MM-DD"
      />
      <Textfield
        label="Fecha de fin"
        type="date"
        name="end_date"
        value={contract.end_date}
        onChange={handleChange}
        error={errors.end_date}
        placeholder="YYYY-MM-DD"
      />
      <div className="flex justify-end mt-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </form>
  );
}

export default FormContract;
