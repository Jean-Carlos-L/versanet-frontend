import { useState, useEffect } from "react";
import { useFetch } from "@/common/hooks/useFetch";
import { User } from "@/common/models/User";
import { getUsersService } from "../services/getUsers.service";

export const useUsersQuery = () => {
  const { fetchData } = useFetch();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getUsers = async (filters?: Record<string, string>) => {
    try {
      setLoading(true);
      const response = await getUsersService(fetchData)(filters);
      setUsers(response);
    } catch (error) {
      alert(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, [refresh]);

  return {
    users,
    loading,
    refresh: () => setRefresh(!refresh),
  };
};
