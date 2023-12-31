import { ReactNode, createContext, useContext, useState } from "react";
import { NpmRegistryDto } from "../typings/npm";

type ContextData = {
  packages: NpmRegistryDto[];
  updatePackageList: (packages: NpmRegistryDto[]) => void;
  numOfResult: number | null;
  setNumOfResult: React.Dispatch<React.SetStateAction<number | null>>;
};

const AppContext = createContext<ContextData | undefined>(undefined);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [packages, setPackages] = useState<NpmRegistryDto[]>([]);
  const [numOfResult, setNumOfResult] = useState<number | null>(null);

  const updatePackageList = (packages: NpmRegistryDto[]) => {
    setPackages(packages);
  };

  return (
    <AppContext.Provider
      value={{ packages, updatePackageList, setNumOfResult, numOfResult }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): ContextData => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext hook must be used within a ContextProvider");
  }
  return context;
};

export { AppContext, AppContextProvider, useAppContext };
