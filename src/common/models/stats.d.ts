// models/stats.models.js

export interface Stats {
    totalContracts: number;
    activeContracts: number;
    inactiveContracts: number;
    totalClients: number;
    clientsWith30MPlan: number;
    clientsWith60MPlan: number;
    clientsWith90MPlan: number;
}
