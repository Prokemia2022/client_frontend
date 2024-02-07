import { createContext, useContext } from "react";

export const dashboardContext = createContext(undefined);

export function UsedashboardContext(){
    const data = useContext(dashboardContext);
    if (data === undefined){
        throw new Error('useDashboardContext must be used with dashboardcontext');
    }
    return data;
}