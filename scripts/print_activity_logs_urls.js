// Script para generar URLs de ejemplo para /activity-logs
// Reproduce la lógica de mapeo de filtros que usamos en getActivityLogs.service.ts

function buildActivityLogsUrl({ filters = {}, page, pageSize } = {}) {
  const params = {};
  if (page !== undefined && page !== null) params.page = page;
  if (pageSize !== undefined && pageSize !== null) params.limit = pageSize;

  if (filters) {
    if (filters.entity) params.entity = filters.entity;
    if (filters.action) params.action = filters.action;
    if (filters.actorName) params.actor_name = filters.actorName;
    if (filters.actorId) params.actor_id = filters.actorId;
    if (filters.q) params.q = filters.q;
    if (filters.dateFrom) params.from = filters.dateFrom;
    if (filters.dateTo) params.to = filters.dateTo;
  }

  const searchParams = new URLSearchParams(
    Object.entries(params)
      .filter(([, v]) => v !== undefined && v !== null && v !== "")
      .map(([k, v]) => [k, v.toString()])
  ).toString();

  return `/activity-logs?${searchParams}`;
}

const examples = [
  { filters: {}, page: 1, pageSize: 10 },
  { filters: { action: "create" }, page: 2, pageSize: 20 },
  { filters: { entity: "invoice", actorName: "Juan" }, page: 1, pageSize: 15 },
  { filters: { dateFrom: "2025-11-01", dateTo: "2025-11-29" }, page: 1, pageSize: 50 },
  { filters: { q: "error servidor" }, page: 3, pageSize: 25 },
];

console.log("URLs de ejemplo para /activity-logs (según el mapeo del servicio):\n");
for (const ex of examples) {
  console.log(buildActivityLogsUrl(ex));
}

console.log('\nNota: en la app real, la petición se hace usando el fetchData que antepone el BASE_URL.');
