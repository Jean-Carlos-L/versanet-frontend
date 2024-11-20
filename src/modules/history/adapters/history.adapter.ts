import { History } from "@/common/models/History";

export const HistoryAdapter = (history: History) => {
  return {
    id: history.id_historial,
    entity: history.entidad,
    message: history.mensaje,
    date: history.fecha_notificacion,
  };
};
