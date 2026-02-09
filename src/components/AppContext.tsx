import { createContext, useEffect, useState } from "react";
import { getAllLocalStorage } from "../services/storage";

interface IUser {
  id: string;
  name: string;
  email: string;
}

interface IAppContext {
  user: IUser | null;
  isLoggedIn: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AppContext = createContext({} as IAppContext);

export const AppContextProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storage = getAllLocalStorage();

    if (storage) {
      const parsed = JSON.parse(storage);
      setIsLoggedIn(parsed.login);
      setUser(parsed.user ?? null);
    }
  }, []);

  return <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>{children}</AppContext.Provider>;
};
