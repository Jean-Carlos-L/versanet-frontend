// Importación de fetch
import { Stats } from "@/common/models/stats";
// Instancia de getStatsService

export const statsAdapter = (data): Stats => {
  return {
    totalContracts: data.totalContracts,
    activeContracts: data.activeContracts,
    inactiveContracts: data.inactiveContracts,
    totalClients: data.totalClients,
    clientsWith30MPlan: data.clientsWith30MPlan,
    clientsWith60MPlan: data.clientsWith60MPlan,
    clientsWith90MPlan: data.clientsWith90MPlan,
  };
};
