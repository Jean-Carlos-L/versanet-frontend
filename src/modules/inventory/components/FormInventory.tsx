// En FormInventory.tsx
import Button from "@/common/components/Button";
import Textfield from "@/common/components/Textfield";
import Select from "@/common/components/Select";
import { InventoryCreate, InventoryUpdate } from "@/common/models/Inventory";
import { TYPES_DEVICES } from "../hooks/useInventoryCommand";

function FormInventory({
  data,
  loading,
  onSubmit,
  onChange,
  errors,
}: FormInventoryProps) {
  const handleChangeText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 rounded-lg shadow-md max-w-lg mx-auto"
      aria-label="Formulario de Inventario"
    >
      <div>
        <Textfield
          label="Referencia"
          name="reference"
          value={data?.reference}
          placeholder="Referencia del producto"
          onChange={handleChangeText}
          error={errors.reference}
        />

        <Select
          label="Tipo de Equipo"
          name="type"
          options={TYPES_DEVICES}
          value={data?.type}
          onChange={handleChangeText}
          error={errors.type}
        />

        <Textfield
          label="Dirección Red (IP)"
          name="network_address"
          value={data?.network_address || ""}
          placeholder="Dirección de red del producto"
          onChange={handleChangeText}
          error={errors.network_address}
        />
        <Textfield
          label="Cantidad"
          name="quantity"
          type="number"
          value={data?.quantity?.toString() || ""}
          placeholder="Cantidad de items"
          onChange={handleChangeText}
          error={errors.quantity}
        />
        <Select
          label="Estado"
          name="status"
          options={[
            { value: "activo", label: "Activo" },
            { value: "inactivo", label: "Inactivo" },
            { value: "mantenimiento", label: "Mantenimiento" },
          ]}
          value={data?.status}
          onChange={handleChangeText}
          error={errors.status}
        />

        <div className="flex justify-end mt-10">
          <Button type="submit">{loading ? "Guardando..." : "Guardar"}</Button>
        </div>
      </div>
    </form>
  );
}

interface FormInventoryProps {
  data: InventoryCreate | InventoryUpdate;
  loading?: boolean;
  onSubmit: () => void;
  onChange: (key: string, value: any) => void;
  errors?: { [key: string]: string };
}

export default FormInventory;
