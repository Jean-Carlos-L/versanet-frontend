import { useState } from "react";
import { useFilters } from "./hooks/useFilters";
import Spinner from "@/common/components/Spinner";
import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import Table, { TableCell, TableRow } from "@/common/components/Table";
import Pagination from "@/common/components/Pagination";
import Header from "@/common/components/Header";
import { useInventoryQuery } from "./hooks/useInventoryQuery";
import { useNumberOfInventory } from "./hooks/useNumberOfInventory";
import InventoryCreate from "./InventoryCreate"
import InventoryEdit from "./InventoryEdit";
import { useInventoryCommand } from "./hooks/useInventoryCommand";


const HEADERS_TABLE = [
    "#",
    "Referencia",
    "Tipo",
    "mac",
    "ip",
    "Estado",
];

function InventoryList() {
    const { filters, handleChange } = useFilters();
    const { inventories, loading, refresh } = useInventoryQuery(filters);
    const { numberOfInventory } = useNumberOfInventory(filters);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectInventory, setSelectInventory] = useState(null);
    const [currentInventoryId, setCurrentInventoryId] = useState<string | null>(null);
    const { deleteInventory, loadingAction } = useInventoryCommand(refresh);
    

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    const openEditModal = (inventoryId: string) => {
        setCurrentInventoryId(inventoryId);
        setIsEditModalOpen(true);
    }
    const closeEditModal = () => {
        setCurrentInventoryId(null);
        setIsEditModalOpen(false);
      };

    const handleSelectInventory = (inventory) => {
        setSelectInventory(inventory);
    };

    const handleChangePageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
        handleChange("pageSize", e.target.value);
    };

    const handleDeleteInventory = (inventoryId: string) => {
        if (
            window.confirm("¿Está seguro de eliminar este plan de cliente?") &&
            !loadingAction
          ) {
            deleteInventory(inventoryId);
          }
    };
    

    return (
        <main className="flex w-full h-full flex-col">
            <Header title="Inventario" />
            <div className="flex flex-col items-center">
                <section className="w-full flex flex-col ">
                    <header className="bg-gray-100 p-4 rounded-md shadow-md mb-5">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="flex flex-col">
                                <label
                                    htmlFor="reference"
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    Referencia
                                </label>
                                <input
                                    type="text"
                                    id="reference"
                                    name="reference"
                                    value={filters.reference}
                                    onChange={(e) => handleChange("reference", e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Buscar por referencia"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="type"
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    Tipo
                                </label>
                                <input
                                    type="text"
                                    id="typeInventory"
                                    name="typeInventory"
                                    value={filters.typeInventory}
                                    onChange={(e) => handleChange("typeInventory", e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Buscar por tipo"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="mac"
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    Mac
                                </label>
                                <input
                                    type="text"
                                    id="mac"
                                    name="mac"
                                    value={filters.mac}
                                    onChange={(e) => handleChange("mac", e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Buscar por mac"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label
                                    htmlFor="ip"
                                    className="text-sm font-medium text-gray-700 mb-1"
                                >
                                    Ip
                                </label>
                                <input
                                    type="text"
                                    id="ip"
                                    name="ip"
                                    value={filters.ip}
                                    onChange={(e) => handleChange("ip", e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Buscar por ip"
                                />
                            </div>
                        </div>
                    </header>
                    {isCreateModalOpen && (
                        <InventoryCreate
                            isOpen={isCreateModalOpen}
                            onClose={closeCreateModal}
                            onRefresh={refresh}
                        />
                    )}
                    {isEditModalOpen && currentInventoryId && (
                        <InventoryEdit
                            isOpen={isEditModalOpen}
                            onClose={closeEditModal}
                            onRefresh={refresh}
                            inventoryId={currentInventoryId}
                        />
                        )}
                </section>
                <section className="flex w-full h-full space-x-5">
                    <div className="w-full flex flex-col">
                        <div className="flex flex-col w-full text-gray-800">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <div className="flex-shrin flex-col w-9/10">
                                    <div className="flex items-center space-x-10 mb-3">
                                        <Pagination
                                            currentPage={filters.page}
                                            pageSize={filters.pageSize}
                                            totalItems={numberOfInventory}
                                            onPageChange={(page) => handleChange("page", page)}
                                        />
                                        <select
                                            onChange={handleChangePageSize}
                                            className="p-2 mb-0 rounded-md"
                                            value={filters.pageSize}
                                        >
                                            <option value="10">10</option>
                                            <option value="25">25</option>
                                            <option value="50">50</option>
                                            <option value="100">100</option>
                                        </select>
                                        <button
                                            className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md w-40"
                                            onClick={openCreateModal}
                                        >
                                            Agregar equipo
                                        </button>
                                    </div>
                                    <Table
                                        headers={HEADERS_TABLE}
                                        data={inventories.map((item, index) => (
                                            <TableRow key={item.id}
                                                onClick={() => handleSelectInventory(item)}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>{item.reference}</TableCell>
                                                <TableCell>{item.typeInventory.description}</TableCell>
                                                <TableCell>{item.mac}</TableCell>
                                                <TableCell>{item.ip === null? "No aplica" : item.ip}
                                                </TableCell>
                                                <TableCell>
                                                    {item.status === 0 ? <span className="inline-block px-3 py-1 rounded-full bg-green-500 text-red-100 font-medium">
                                                        Disponible
                                                    </span> : <span className="inline-block px-3 py-1 rounded-full bg-red-500 text-red-100 font-medium">
                                                        No disponible
                                                    </span>}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {selectInventory ? (
                        <div className="flex-shrin w-1/3">
                            <div className="flex items-center p-4 bg-gray-50 border rounded-md shadow-lg overflow-y-auto">
                                <div className="w-full">
                                    <div className="mb-6">
                                        <label className="text-sm font-medium text-gray-700">Referencia</label>
                                        <p className="text-sm font-medium text-gray-700">{selectInventory.reference}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="text-sm font-medium text-gray-700">Tipo</label>
                                        <p className="text-sm font-medium text-gray-700">{selectInventory.typeInventory.description}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="text-sm font-medium text-gray-700">MAC</label>
                                        <p className="text-sm font-medium text-gray-700">{selectInventory.mac}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="text-sm font-medium text-gray-700">IP</label>
                                        <p className="text-sm font-medium text-gray-700">{selectInventory.ip}</p>
                                    </div>
                                    <div className="mb-6">
                                        <label className="text-sm font-medium text-gray-700">Estado</label>
                                        <p className="text-sm font-medium text-gray-700">
                                            {selectInventory.status === 0 ? (
                                                <span className="inline-block px-3 py-1 rounded-full bg-green-500 text-red-100 font-medium">
                                                    Disponible
                                                </span>
                                            ) :
                                                <span className="inline-block px-3 py-1 rounded-full bg-red-500 text-red-100 font-medium">
                                                    No disponible
                                                </span>
                                            }</p>
                                    </div>
                           <div className="flex justify-end">
                           <button
                               className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md mr-5"
                                 onClick={() => handleDeleteInventory(selectInventory.id)}
                              >
                                 <TrashIcon className="h-5 w-5 mx-auto" />
                              </button>
                              <button
                                 className="bg-orange-500 text-white px-4 py-2 rounded-md shadow-md mr-5"
                                    onClick={() => openEditModal(selectInventory.id)}
                              >
                                 <PencilIcon className="h-5 w-5 mx-auto" />
                              </button>
                              <button
                                 className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
                              >
                                 Cerrar
                              </button>
                            </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </section>
            </div>
        </main>
    )
}

export default InventoryList;