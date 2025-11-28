import { useEffect } from "react";
import FormInventory from "./components/FormInventory";
import { useInventoryCommand } from "./hooks/useInventoryCommand";
import { useParams } from "react-router-dom";
import Header from "@/common/components/Header";

function InventoryUpdate() {
  const { id } = useParams<{ id: string }>();
  const { inventory, updateInventory, getInventory, handleChange, errors } =
    useInventoryCommand();

  const handleSubmit = () => {
    updateInventory();
  };

  useEffect(() => {
    if (id) {
      getInventory(id);
    }
  }, [id]);

  return (
    <main>
      <Header title="Editar Inventario" />
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

export default InventoryUpdate;
