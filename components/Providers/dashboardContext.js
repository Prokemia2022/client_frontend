import { createContext, useContext } from "react";

export const dashboardContext = createContext('Home' | null);

export function UsedashboardContext(){
    const data = useContext(dashboardContext);
    if (data === null){
        throw new Error('useDashboardContext must be used with dashboardcontext');
    }
    return data;
}