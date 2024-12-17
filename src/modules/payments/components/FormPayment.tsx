import React, { useState } from "react";
import Button from "@/common/components/Button";
import Select from "@/common/components/Select";
import { PaymentCreate } from "@/common/models/Payment";

interface FormPaymentProps {
  payment: PaymentCreate;
  loading?: boolean;
  onSubmit: () => void;
  onChange: (payment: PaymentCreate) => void;
}

function FormPayment({
  payment,
  loading = false,
  onSubmit,
  onChange,
}: FormPaymentProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleOpenConfirmModal = (e: React.FormEvent) => {
    e.preventDefault(); // Previene el envío inmediato del formulario
    setIsConfirmModalOpen(true);
  };

  const handleConfirmSubmit = () => {
    setIsConfirmModalOpen(false);
    onSubmit();
  };

  const handleCancelModal = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <form
      onSubmit={handleOpenConfirmModal}
      className="p-6 rounded-lg shadow-md max-w-lg mx-auto"
      aria-label="Formulario de Pago"
    >
      {/* Campo: ID del Cliente */}
      <div className="mb-4">
        <label
          htmlFor="customer_id"
          className="block text-gray-700 font-bold mb-2"
        >
          ID del Cliente
        </label>
        <input
          id="customer_id"
          type="text"
          value={payment?.customer_id || ""}
          disabled
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
        />
      </div>

      {/* Campo: Método de Pago */}
      <Select
        label="Método de Pago"
        name="methodPaid"
        options={[
          { value: "Nequi", label: "Nequi" },
          { value: "Bancolombia", label: "Bancolombia" },
          { value: "Daviplata", label: "Daviplata" },
        ]}
        value={payment?.methodPaid || ""}
        onChange={(e) => onChange({ ...payment, methodPaid: e.target.value })}
      />

      {/* Campo: Fecha */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
          Fecha
        </label>
        <input
          id="date"
          type="date"
          value={payment?.date || ""}
          onChange={(e) => onChange({ ...payment, date: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Campo: Monto */}
      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Monto
        </label>
        <input
          id="amount"
          type="number"
          value={payment?.amountPaid || 0}
          disabled
          className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
        />
      </div>

      {/* Botón de Envío */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Procesando..." : "Crear Pago"}
        </Button>
      </div>

      {/* Modal de Confirmación */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirmación de Pago</h2>
            <p className="mb-6">
              ¿Estás seguro de que deseas procesar este pago?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}

export default FormPayment;
