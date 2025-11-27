import Header from "@/common/components/Header";
import { usePlanCommand } from "./hooks/usePlanCommand";
import Textfield from "@/common/components/Textfield";
import Button from "@/common/components/Button";

function PlanCreate() {
  const { plan, errors, handleChangePlan, createPlan } = usePlanCommand();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    createPlan();
  }

  return (
    <main>
      <Header title="Crear Plan" />

      <form className="w-6/12 bg-white p-4 mt-5 rounded-lg shadow-md mx-auto" onSubmit={handleSubmit}>
        <Textfield
          label="Descripción"
          name="description"
          placeholder="Descripción del plan"
          value={plan?.description || ""}
          onChange={(e) => handleChangePlan("description", e.target.value)}
          error={errors.description}
        />
        <Textfield
          label="Características"
          name="features"
          placeholder="Características del plan"
          value={plan?.features || ""}
          onChange={(e) => handleChangePlan("features", e.target.value)}
          error={errors.features}
        />
        <Textfield
          label="Duración (meses)"
          name="duration"
          type="number"
          placeholder="Duración en meses"
          value={plan?.duration?.toString() || ""}
          onChange={(e) => handleChangePlan("duration", Number(e.target.value))}
          error={errors.duration}
        />
        <Textfield
          label="Precio"
          name="price"
          type="number"
          placeholder="Precio del plan"
          value={plan?.price?.toString() || ""}
          onChange={(e) => handleChangePlan("price", Number(e.target.value))}
          error={errors.price}
        />

        <Button type="submit">Guardar</Button>
      </form>
    </main>
  );
}

export default PlanCreate;
