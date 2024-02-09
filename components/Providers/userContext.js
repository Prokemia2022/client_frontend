import { createContext, useContext } from "react";

export const userContext = createContext(null);

export function useUserContext(){
    const user = useContext(userContext);
    if (user === null){
        return null;
    }
    return user;
}