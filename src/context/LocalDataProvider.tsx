import { createContext, useContext, useState } from "react";

const LocalData = createContext<IWeatherAPI_LocalData | null | undefined>(
  undefined
);
const LocalDataUpdate = createContext<
  (newLocalData: IWeatherAPI_LocalData | null) => void
>(null!);

export function useLocalData() {
  return useContext(LocalData);
}

export function useLocalDataUpdate() {
  return useContext(LocalDataUpdate);
}

export default function LocalDataProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [localData, setLocalData] = useState<
    IWeatherAPI_LocalData | null | undefined
  >(undefined);

  function updateLocalData(newLocalData: IWeatherAPI_LocalData | null) {
    setLocalData(newLocalData);
  }

  return (
    <LocalData.Provider value={localData}>
      <LocalDataUpdate.Provider value={updateLocalData}>
        {children}
      </LocalDataUpdate.Provider>
    </LocalData.Provider>
  );
}
