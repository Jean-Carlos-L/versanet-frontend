import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { Permission } from "../models/Permission";
import { getPermissionsService } from "../services/getPermissions.service";

export const usePermissionsQuery = () => {
   const { fetchData } = useFetch();
   const [permissions, setPermissions] = useState<Permission[]>([]);
   const [loading, setLoading] = useState<boolean>(true);

   const fetchPermissions = async () => {
      try {
         const data = await getPermissionsService(fetchData)();
         setPermissions(data);
      } catch (error) {
         console.error("Error fetching permissions", error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchPermissions();
   }, []);

   return { permissions, fetchPermissions, loading };
}

