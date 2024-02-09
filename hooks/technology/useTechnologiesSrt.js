import { Get_Technologies_Srt } from "../../pages/api/technologies/route.api";

export const UseTechnologiesSrt = async()=>{
    let result = await Get_Technologies_Srt().then((response)=>{
        return response?.data;
    }).catch((err)=>{
        throw new Error("error while fetching technologies")
    })
    return result;
}