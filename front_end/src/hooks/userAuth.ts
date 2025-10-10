import { useUser } from "../context/userContext";
import { userApi } from "../api/userApi";

export function useAuth() {
    const { user, setUser } = useUser();
  
    async function loadUser() {
      const data = await userApi.getCurrentUser();
      setUser(data);
    }
  
    return { user, loadUser };
};