import FormInventory from "./components/FormInventory";
import { useInventoryCommand } from "./hooks/useInventoryCommand";
import Header from "@/common/components/Header";

function InventoryCreate() {
  const { inventory, errors, handleChange, createInventory } = useInventoryCommand();

  const handleSubmit = async () => {
    createInventory();
  };
  return (
    <main>
      <Header title="Crear Inventario" />
      <section className="p-5">
        <FormInventory
          data={inventory}
          onChange={handleChange}
          onSubmit={handleSubmit}
          errors={errors}
        />
      </section>
    </main>
  );
}

export default InventoryCreate;
