import React, { useState } from "react";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import { useActivityLogsQuery } from "../hooks/useActivityLogsQuery";
import Spinner from "@/common/components/Spinner";
import Textfield from "@/common/components/Textfield";
import Button from "@/common/components/Button";

const ActivityLogList: React.FC = () => {
  const { logs, fetchLogs, refresh, loading, pagination, filters, setFilters } = useActivityLogsQuery({page: 1, pageSize: 20});

  const [form, setForm] = useState({
    entity: filters.entity ?? "",
    action: filters.action ?? "",
    actor_name: filters.actor_name ?? "",
    q: filters.q ?? "",
    date_from: (filters.date_from as string) ?? "",
    date_to: (filters.date_to as string) ?? "",
  });

  const handlePrev = () => {
    if (pagination.page > 1) fetchLogs(pagination.page - 1, pagination.limit);
  };
  const handleNext = () => {
    const max = Math.ceil(pagination.total / pagination.limit);
    if (pagination.page < max) fetchLogs(pagination.page + 1, pagination.limit);
  };

  const handleChange = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const applyFilters = (e?: React.FormEvent) => {
    e?.preventDefault();
    const cleaned: any = {};
    Object.entries(form).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== "") {
        if (k === "date_from") cleaned.from = v;
        else if (k === "date_to") cleaned.to = v;
        else cleaned[k] = v;
      }
    });
    setFilters(cleaned);
    fetchLogs(1, pagination.limit, cleaned);
  };

  const clearFilters = () => {
    setForm({ entity: "", action: "", actor_name: "", q: "", date_from: "", date_to: "" });
    // Use the hook's refresh helper to request unfiltered data and reset filters
    refresh(1, pagination.limit);
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Activity Logs</h2>
      <form onSubmit={applyFilters} className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-2">
        <Textfield
          label=""
          name="entity"
          value={form.entity || ""}
          onChange={(e) => handleChange("entity", e.target.value)}
          placeholder="Entidad"
        />
        <Textfield
          label=""
          name="action"
          value={form.action || ""}
          onChange={(e) => handleChange("action", e.target.value)}
          placeholder="Acción"
        />
        <Textfield
          label=""
          name="actor_name"
          value={form.actor_name || ""}
          onChange={(e) => handleChange("actor_name", e.target.value)}
          placeholder="Nombre del Actor"
        />
        <Textfield
          label=""
          name="q"
          value={form.q || ""}
          onChange={(e) => handleChange("q", e.target.value)}
          placeholder="Búsqueda general"
        />
        <Textfield
          label=""
          name="date_from"
          type="date"
          value={form.date_from || ""}
          onChange={(e) => handleChange("date_from", e.target.value)}
          placeholder="Fecha desde"
        />
        <Textfield
          label=""
          name="date_to"
          type="date"
          value={form.date_to || ""}
          onChange={(e) => handleChange("date_to", e.target.value)}
          placeholder="Fecha hasta"
        />
        <Button type="submit">Aplicar filtros</Button>
        <Button type="button" onClick={clearFilters}>
          Limpiar filtros
        </Button>
      </form>
      <Table
        headers={["Acción", "Entidad", "Actor", "Detalles", "Fecha"]}
        data={
          logs.length ? (
            logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.entity}</TableCell>
                <TableCell>{log.actorName ?? log.actorId ?? "-"}</TableCell>
                <TableCell>{log.details ?? "-"}</TableCell>
                <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))
          ) : (
            <>
              <tr>
                <td className="px-4 py-2 text-sm text-center" colSpan={5}>
                  No hay registros
                </td>
              </tr>
            </>
          )
        }
      />

      <div className="flex items-center justify-between mt-4">
        <div>
          Página {pagination.page} • {pagination.total} registros
        </div>
        <div className="space-x-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={handlePrev}
            disabled={pagination.page <= 1}
          >
            Anterior
          </button>
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={handleNext}
            disabled={pagination.page * pagination.limit >= pagination.total}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogList;
