import Swal, { SweetAlertIcon } from "sweetalert2";

export const useConfirmation = () => {
  const showConfirmation = ({
    message,
    title,
    icon,
  }: {
    message: string;
    title?: string;
    icon?: SweetAlertIcon;
  }) => {
    return Swal.fire({
      title: title || "¿Estás seguro?",
      text: message,
      icon: icon || "info",
      showCancelButton: true,
      confirmButtonColor: "#1f2937",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });
  };

  return showConfirmation;
};
