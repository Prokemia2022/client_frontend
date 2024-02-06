import { Get_Technology_data } from "../../pages/api/technologies/route.api";

export const useTechnologyData= async(title)=>{
    let result = await Get_Technology_data(title).then((response)=>{
        return response?.data;
    }).catch((err)=>{
        throw new Error("error while fetching data")
    })
    return result;
}