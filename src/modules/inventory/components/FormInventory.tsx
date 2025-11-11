// En FormInventory.tsx
import Button from "@/common/components/Button";
import Textfield from "@/common/components/Textfield";
import Select from "@/common/components/Select";
import { InventoryCreate, InventoryUpdate } from "@/common/models/Inventory";
import { useInventoryCommand } from "../hooks/useInventoryCommand";

function FormInventory({ inventory, loading, onSubmit, onChange }: FormInventoryProps) {
    const { validations, errors } = useInventoryCommand();

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange({ ...inventory, [name]: value });
    };

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onChange({ 
            ...inventory, 
            tipo_equipo: value,
            // Reset campos condicionales al cambiar tipo
            direccion_red: value === "router" ? inventory.direccion_red : undefined
        });
    };

    const isRouter = inventory?.tipo_equipo === "router";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!loading) {
            const { hasErrors } = validations(inventory);
            if (!hasErrors) {
                return onSubmit();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md max-w-lg mx-auto" aria-label="Formulario de Inventario">
            <div>
                <Select
                    label="Tipo de Equipo"
                    name="tipo_equipo"
                    options={[
                        { value: "router", label: "Router" },
                        { value: "antena", label: "Antena" },
                        { value: "otros", label: "Otros" },
                    ]}
                    value={inventory?.tipo_equipo}
                    onChange={handleTypeChange}
                    error={errors.tipo_equipo}
                />
                <Textfield
                    label="Referencia"
                    name="referencia"
                    value={inventory?.referencia}
                    placeholder="Referencia del producto"
                    onChange={handleChangeText}
                    error={errors.referencia}
                />
                <Textfield
                    label="MAC"
                    name="mac"
                    value={inventory?.mac}
                    placeholder="MAC del producto"
                    onChange={handleChangeText}
                    error={errors.mac}
                />
                <Textfield
                    label="Dirección Red (IP)"
                    name="direccion_red"
                    value={isRouter ? (inventory?.direccion_red || '') : "no aplica"}
                    placeholder={isRouter ? "IP del producto" : ""}
                    onChange={handleChangeText}
                    error={errors.direccion_red}
                    disabled={!isRouter}
                />
                <Textfield
                    label="Cantidad"
                    name="cantidad"
                    type="number"
                    value={String(Math.max(Number(inventory?.cantidad ?? 1), 1))}
                    placeholder="Cantidad de items"
                    onChange={handleChangeText}
                    error={errors.cantidad}
                />
                <Select
                    label="Estado"
                    name="estado"
                    options={[
                        { value: "activo", label: "Activo" },
                        { value: "inactivo", label: "Inactivo" },
                    ]}
                    value={inventory?.estado}
                    onChange={handleChangeText}
                    error={errors.estado}
                />
                <div className="flex justify-end gap-4 mt-4">
                    <Button type="submit">{loading ? "Guardando..." : "Guardar"}</Button>
                </div>
            </div>
        </form>
    );
}

interface FormInventoryProps {
    inventory: InventoryCreate | InventoryUpdate;
    loading?: boolean;
    onSubmit: () => void;
    onChange: (inventory: InventoryCreate | InventoryUpdate) => void;
}

export default FormInventory;
