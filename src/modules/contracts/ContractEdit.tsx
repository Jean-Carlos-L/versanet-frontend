import { useParams } from "react-router-dom";
import { useContractsCommand } from "./hooks/useContractsCommand";
import FormContract from "./components/FormContract";
import Header from "@/common/components/Header";
import { useEffect } from "react";

function ContractUpdate() {
  const {id} = useParams<{id: string}>();
  const {contract, handleChange, getContract, updateContract, loadingAction } = useContractsCommand();

  const handleSubmit = async () => {
    if (!id) return;
    updateContract();
  }

  useEffect(() => {
    if (id) {
      getContract(id);
    }
  }, [id]);

  return (
     <main>
      <Header title="Editar Contrato" />
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

export default ContractUpdate;
