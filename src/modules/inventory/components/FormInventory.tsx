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
                    label="Tipo de Inventario"
                    name="type"
                    options={[
                        { value: "1", label: "Router" },
                        { value: "2", label: "Antena MAC" },
                    ]}
                    value={inventory?.typeInventory?.id}
                    onChange={(e) => onChange({ ...inventory, typeInventory: { id: e.target.value } })}
                    error={errors.typeInventory}
                />
                <Textfield
                    label="Referencia"
                    name="reference"
                    value={inventory?.reference}
                    placeholder="Referencia del producto"
                    onChange={handleChangeText}
                    error={errors.reference}
                />
                <Textfield
                    label="MAC"
                    name="mac"
                    value={inventory?.mac}
                    placeholder="MAC del producto"
                    onChange={handleChangeText}
                    error={errors.mac}
                />
                {
                    inventory?.typeInventory?.id === "1" ?
                        <Textfield
                            label="IP"
                            name="ip"
                            value={inventory?.ip}
                            placeholder="IP del producto"
                            onChange={handleChangeText}
                            error={errors.ip}
                        />
                        :
                        <Textfield
                            label="IP"
                            name="ip"
                            value="no aplica"
                            placeholder="IP del producto"
                            onChange={handleChangeText}
                            error={errors.ip}
                            disabled
                        />
                }
                <div className="flex justify-end gap-4 mt-4">
                    <Button type="submit">{loading ? "Guardando..." : "Guardar"}</Button>
                </div>
            </div>
        </form>
    )

}

interface FormInventoryProps {
    inventory: InventoryCreate | InventoryUpdate;
    loading?: boolean;
    onSubmit: () => void;
    onChange: (inventory: InventoryCreate | InventoryUpdate) => void;
}

export default FormInventory;
