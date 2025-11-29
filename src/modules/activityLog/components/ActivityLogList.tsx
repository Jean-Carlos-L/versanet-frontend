import { useState } from "react";
import Header from "@/common/components/Header";
import Spinner from "@/common/components/Spinner";
import Table, { TableRow, TableCell } from "@/common/components/Table";
import Pagination from "@/common/components/Pagination";
import Textfield from "@/common/components/Textfield";
import Modal from "@/common/components/Modal";
import { EyeIcon } from "@heroicons/react/20/solid";
import { useFilters } from "../hooks/useFilters";
import { useActivityLogsQuery } from "../hooks/useActivityLogsQuery";
import { formatDate } from "@/common/utils/formatDate";

const HEADERS_TABLE = [
	"#",
	"Acción",
	"Entidad",
	"Actor",
	"Detalles",
	"Fecha",
	"Acciones",
];

function ActivityLogList() {
	const { filters, handleChange } = useFilters();
	const {
		activityLogs,
		loading,
		page,
		setPage,
		pageSize,
		setPageSize,
		total,
		refreshData,
	} = useActivityLogsQuery(filters);

	const [selectedLog, setSelectedLog] = useState(null as any);

	return (
		<main>
			<Header title="Registro de Actividades" />
			<div className="flex flex-col items-center w-full p-5">
				<section className="w-11/12 bg-white p-4 rounded-lg shadow-md">
					<div className="flex gap-4 mb-4 justify-center flex-wrap">
						<div className="w-48">
							<Textfield
								label="Acción"
								name="action"
								value={filters.action}
								onChange={(e) => handleChange("action", e.target.value)}
								placeholder="Buscar por acción"
							/>
						</div>

						<div className="w-48">
							<Textfield
								label="Entidad"
								name="entity"
								value={filters.entity}
								onChange={(e) => handleChange("entity", e.target.value)}
								placeholder="Buscar por entidad"
							/>
						</div>

						<div className="w-48">
							<Textfield
								label="Actor"
								name="actorName"
								value={filters.actorName}
								onChange={(e) => handleChange("actorName", e.target.value)}
								placeholder="Buscar por actor"
							/>
						</div>

						<div className="w-48">
							<Textfield
								label="Desde"
								name="dateFrom"
								type="date"
								value={filters.dateFrom || ""}
								onChange={(e) => handleChange("dateFrom", e.target.value || null)}
								placeholder=""
							/>
						</div>

						<div className="w-48">
							<Textfield
								label="Hasta"
								name="dateTo"
								type="date"
								value={filters.dateTo || ""}
								onChange={(e) => handleChange("dateTo", e.target.value || null)}
								placeholder=""
							/>
						</div>
					</div>

					<div className="flex flex-col space-y-2 mb-4">
						{loading && activityLogs.length === 0 ? (
							<Spinner />
						) : (
							<Table
								headers={HEADERS_TABLE}
								data={activityLogs.map((item, index) => (
									<TableRow key={item.id}>
										<TableCell>{(page - 1) * pageSize + index + 1}</TableCell>
										<TableCell>{item.action}</TableCell>
										<TableCell>{item.entity}</TableCell>
										<TableCell>{item.actorName || item.actorId || "-"}</TableCell>
										<TableCell >{item.details || "-"}</TableCell>
										<TableCell>{formatDate({ date: item.createdAt, format: "YYYY-MM-DD" })}</TableCell>
										<TableCell>
											<div className="flex gap-3 justify-center">
												<button
													className="hover:shadow-lg hover:bg-gray-100 hover:rounded-lg p-1"
													onClick={() => setSelectedLog(item)}
													aria-label="Ver detalles"
												>
													<EyeIcon className="h-5 w-5" />
												</button>
											</div>
										</TableCell>
									</TableRow>
								))}
							/>
						)}
					</div>

					<Pagination
						totalItems={total}
						currentPage={page}
						onPageChange={(p) => setPage(p)}
						pageSize={pageSize}
					/>

					<ModalActivityLogDetails
						activityLog={selectedLog}
						isOpen={!!selectedLog}
						onClose={() => setSelectedLog(null)}
						onRefresh={refreshData}
					/>
				</section>
			</div>
		</main>
	);
}

function ModalActivityLogDetails({ activityLog, isOpen, onClose, onRefresh }) {
	if (!activityLog) return null;

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="w-full max-w-2xl">
				<div className="bg-white rounded-xl shadow-lg p-6">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Detalle de Activity Log</h3>

					<dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm">
						<div>
							<dt className="text-gray-500 font-medium">Acción</dt>
							<dd className="mt-1 text-gray-900">{activityLog.action}</dd>
						</div>

						<div>
							<dt className="text-gray-500 font-medium">Entidad</dt>
							<dd className="mt-1 text-gray-900">{activityLog.entity}</dd>
						</div>

						<div>
							<dt className="text-gray-500 font-medium">Actor</dt>
							<dd className="mt-1 text-gray-900">{activityLog.actorName || activityLog.actorId || "-"}</dd>
						</div>

						<div>
							<dt className="text-gray-500 font-medium">ID Entidad</dt>
							<dd className="mt-1 text-gray-900">{activityLog.entityId || "-"}</dd>
						</div>

						<div className="sm:col-span-2">
							<dt className="text-gray-500 font-medium">Detalles</dt>
							<dd className="mt-1 text-gray-900 whitespace-pre-wrap">{activityLog.details || "-"}</dd>
						</div>

						<div className="sm:col-span-2">
							<dt className="text-gray-500 font-medium">Metadata</dt>
							<dd className="mt-1 text-gray-900 font-mono text-xs">{activityLog.metadata ? JSON.stringify(activityLog.metadata, null, 2) : "-"}</dd>
						</div>

						<div>
							<dt className="text-gray-500 font-medium">Creado</dt>
							<dd className="mt-1 text-gray-900">{formatDate({ date: activityLog.createdAt, format: "YYYY-MM-DD" })}</dd>
						</div>

						<div>
							<dt className="text-gray-500 font-medium">Actualizado</dt>
							<dd className="mt-1 text-gray-900">{formatDate({ date: activityLog.updatedAt, format: "YYYY-MM-DD" })}</dd>
						</div>
					</dl>

					<div className="flex justify-end mt-6">
						<button
							className="btn btn-secondary mr-2"
							onClick={() => {
								onRefresh && onRefresh();
								onClose();
							}}
						>
							Cerrar
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default ActivityLogList;
