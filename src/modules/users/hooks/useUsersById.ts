import { useFetch } from "@/common/hooks/useFetch";
import { User } from "@/common/models/User";
import { useEffect, useState } from "react";
import { getRoleByIdService } from "../services/geUsersById.service";

export const useUsersById = (id: string) => {
  const { fetchData } = useFetch();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getRoleByIdService(fetchData)(id);
        setUser(response);
      } catch (error) {
        alert(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  return { user, loading };
};
