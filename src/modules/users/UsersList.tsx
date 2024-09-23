// import Table from "@/common/components/Table";
// import { TrashIcon, PencilIcon, EyeIcon } from "@heroicons/react/20/solid";
// import { useRolesQuery } from "./hooks/useRolesQuery";
// import Spinner from "@/common/components/Spinner";
// import { generatePath, useNavigate } from "react-router-dom";
// import { ROUTES } from "@/common/routers/routes";
// import { useRolesCommand } from "./hooks/useRolesCommand";

// const HEADERS_TABLE = ["#", "Nombre", "Correo", "ROL", "Acciones"];

// function UsersList() {
//   const navigate = useNavigate();

//   const handleEdit = (id: string) => {
//     const path = generatePath(ROUTES.USERS_EDIT, { id });
//     navigate(path);
//   };

//   const handleDelete = (id: string) => {
//     if (
//       window.confirm("¿Estás seguro de eliminar este usuario?") &&
//       !loadingAction
//     ) {
//       deleteUsuario(id);
//     }
//   };

//   const handleView = (id: string) => {
//     const path = generatePath(ROUTES.USERS_VIEW, { id });
//     navigate(path);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <header className="bg-gray-100 w-11/12 p-3 rounded-md shadow-lg mb-5">
//         <h1 className="text-3xl font-semibold text-gray-700">
//           Lista de usuarios
//         </h1>
//       </header>

//       <div className="w-11/12 text-center">
//         {loading && roles.length === 0 ? (
//           <Spinner />
//         ) : (
//           <Table
//             headers={HEADERS_TABLE}
//             data={roles.map((role, index) => (
//               <tr key={role.id}>
//                 <td>{index + 1}</td>
//                 <td>{role.description}</td>
//                 <td>{role.status}</td>
//                 <td>
//                   <div className="flex gap-2">
//                     <button onClick={() => handleView(role.id)}>
//                       <EyeIcon className="h-5 w-5" />
//                     </button>
//                     <button onClick={() => handleEdit(role.id)}>
//                       <PencilIcon className="h-5 w-5" />
//                     </button>
//                     <button onClick={() => handleDelete(role.id)}>
//                       <TrashIcon className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           />
//         )}
//       </div>
//     </div>
//   );
// }
