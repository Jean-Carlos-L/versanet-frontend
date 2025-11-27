import FormContract from "./components/FormContract";
import { useContractsCommand } from "./hooks/useContractsCommand";
import Header from "@/common/components/Header";

function ContractCreate() {
  const { contract, handleChange, createContract, loadingAction } =
    useContractsCommand();

  const handleSubmit = async () => {
    createContract();
  };

  return (
    <main>
      <Header title="Crear Contrato" />
      <section className="p-5">
        <FormContract
          contract={contract}
          onChange={handleChange}
          onSubmit={handleSubmit}
          loading={loadingAction}
        />
      </section>
    </main>
  );
}

export default ContractCreate;
