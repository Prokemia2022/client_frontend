import { createContext, useContext } from "react";

export const dashboardContext = createContext(null);

export function usedashboardContext(){
    const data = useContext(dashboardContext);
    if (data === null){
        return null;
    }
    return data;
}