// src/context/UserContext.tsx
import { createContext, useContext, useState } from "react";
import type { User } from "../models/user";

const UserContext = createContext<any>(null);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);